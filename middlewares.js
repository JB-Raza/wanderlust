const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const { listingSchema, reviewSchema } = require("./schema.js")
const ExpressError = require("./utils/ExpressError.js")

// is logged in user
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // saves the path which user tried to access
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "Login required")
        return res.redirect("/login")
        }
    next()
}
// redirect URL saving
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

// is listing owner
module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params
    let listing = await Listing.findById(id)

    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to make changes to this listing")
        return res.redirect(`/listings/${id}`)
    }
    next()
}

// is review author
module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId } = req.params
    let review = await Review.findById(reviewId)

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to make changes to this Review")
        return res.redirect(`/listings/${id}`)
    }
    next()
}

// listing validation
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map((elem) => elem.message).join(",")
        throw new ExpressError(400, errMsg)
    } else return next()
}

// review validation middleware
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map((elem) => elem.message).join(',')
        throw new ExpressError(400, errMsg)
    } else return next()
}

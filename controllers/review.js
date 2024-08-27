const Listing = require("../models/listing.js")
const Review = require("../models/review.js")

module.exports.createReview = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
    let newReview = new Review(req.body.review)

    newReview.author = req.user._id
    req.flash("success", "review added")
    listing.reviews.push(newReview)

    await newReview.save()
    await listing.save()
    res.redirect(`/listings/${listing._id}`)
}
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params
    req.flash("success", "review deleted")

    await Review.findByIdAndDelete(reviewId)
    await Listing.findByIdAndUpdate(id, {$pull: { reviews: reviewId}})
    res.redirect(`/listings/${id}`)
    
}
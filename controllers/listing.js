const Listing = require("../models/listing")
const ExpressError = require("../utils/ExpressError.js")

// index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find().populate("owner")
    res.render('listings/index.ejs', { allListings })
}
// create listing form (get)
module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs')
}

// create listing (post)
module.exports.createListing = async (req, res) => {

    if (!req.body.listing) throw new ExpressError(400, "Send valid listing data")  // this will check for data coming from form. if no data sent, it will return bad req error and message will be displayed on screen.

    // let { title, imageLink, price, location, country, description } = req.body
    // let listing = {
    //     title, imageLink, price, location, country, description
    // }
    let listing = req.body.listing // short hand for above code to get form data 

    const url = req.file.path;
    const filename = req.file.filename;
    let newListing = new Listing(listing)
    newListing.image = { url, filename }
    newListing.owner = req.user._id;
    
    await newListing.save()
    req.flash("success", "Listing added successfully")
    res.redirect('/listings')
}

// get category listing route
module.exports.categoryListing = async(req, res) => {
    try {
        let {category} = req.params
        let allListings = await Listing.find({ category })
        // res.redirect("/listings", { allListings })
        res.render("listings/index.ejs", {allListings})
        // res.render("./listings/filter.ejs", { allListings })
    } catch(err){
        console.log(err)
    }
}

// search result route
module.exports.searchResult = async(req, res) => {
    try{
        let { searchTerm } = req.query
        const searchWords = searchTerm.split(" ").filter(word => word.length > 0)

        // Creating a search query for each word
        const searchQueries = searchWords.map(word => ({
            $or: [
                {title : { $regex: word, $options: "i"}},
                {location : { $regex: word, $options: "i"}},
                {country: { $regex: word, $options: "i"}},
            ]
        }))
        // combining all words to ensure all words are matched
        const query = {$and: searchQueries}
        
        let allListings = await Listing.find(query)
        res.render("listings/index.ejs", {allListings})
        
    }catch(err){
        console.log(err)
d    }
}

// show page route (get)
module.exports.showListing = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner")
    if (!listing) {
        req.flash("error", "listing not found")
        return res.redirect("/listings")
    }
    res.render('listings/show.ejs', { listing })
}

// update form page route (get)
module.exports.renderUpdateForm = async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
    if (!listing) {
        req.flash("error", "listing not found")
        res.redirect("/listings")
    }
    let originalImgUrl = listing.image.url
    originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_250")
    res.render('listings/editListing.ejs', { listing, originalImgUrl })
}

// update listing route (post)
module.exports.updateListing = async (req, res) => {
    if (!req.body.listing) throw new ExpressError(400, "Send valid listing data")
    let { id } = req.params
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    if (typeof req.file !== "undefined") {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename }
        await listing.save()
    }
    req.flash("success", "Listing edited")
    res.redirect(`/listings`)

}

// delete route (delete)
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    req.flash("success", "Listing deleted successfully")
    await Listing.findByIdAndDelete(id)
    res.redirect('/listings');
}
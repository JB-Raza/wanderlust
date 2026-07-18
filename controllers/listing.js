const Listing = require("../models/listing")
const ExpressError = require("../utils/ExpressError.js")

module.exports.index = async (req, res) => {
    const allListings = await Listing.find().populate("owner")
    res.render('listings/index.ejs', { allListings })
}

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs')
}

module.exports.createListing = async (req, res) => {
    if (!req.body.listing) throw new ExpressError(400, "Send valid listing data")
    let listing = req.body.listing
    const url = req.file.path
    const filename = req.file.filename
    let newListing = new Listing(listing)
    newListing.image = { url, filename }
    newListing.owner = req.user._id
    
    await newListing.save()
    req.flash("success", "Listing added successfully")
    res.redirect('/listings')
}

module.exports.categoryListing = async (req, res) => {
    try {
        let { category } = req.params
        let allListings = await Listing.find({ category })
        res.render("listings/index.ejs", { allListings })
    } catch (err) {
        req.flash("error", "Unable to filter listings")
        res.redirect("/listings")
    }
}

module.exports.searchResult = async (req, res) => {
    try {
        let { searchTerm } = req.query
        if (!searchTerm || !searchTerm.trim()) {
            return res.redirect("/listings")
        }
        const searchWords = searchTerm.trim().split(/\s+/).filter(word => word.length > 0)
        const searchQueries = searchWords.map(word => ({
            $or: [
                { title: { $regex: word, $options: "i" } },
                { location: { $regex: word, $options: "i" } },
                { country: { $regex: word, $options: "i" } },
            ]
        }))
        const query = searchQueries.length ? { $and: searchQueries } : {}
        let allListings = await Listing.find(query)
        res.render("listings/index.ejs", { allListings })
    } catch (err) {
        req.flash("error", "Search failed")
        res.redirect("/listings")
    }
}

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

module.exports.updateListing = async (req, res) => {
    if (!req.body.listing) throw new ExpressError(400, "Send valid listing data")
    let { id } = req.params
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    if (typeof req.file !== "undefined") {
        const url = req.file.path
        const filename = req.file.filename
        listing.image = { url, filename }
        await listing.save()
    }
    req.flash("success", "Listing edited")
    res.redirect(`/listings`)
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params
    req.flash("success", "Listing deleted successfully")
    await Listing.findByIdAndDelete(id)
    res.redirect('/listings')
}

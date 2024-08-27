let express = require('express')
const router = express.Router({ mergeParams: true })
const wrapAsync = require("../utils/wrapAsync.js")
// const listing = require("../models/listing.js")
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js")
const listingController = require("../controllers/listing.js")
const multer = require("multer")
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })


router.route("/")
.get(listingController.index) // index route
.post( upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing)) // new listing post route

// search result query
router.get("/search", listingController.searchResult)


// new listing page route
router.get('/new', isLoggedIn, listingController.renderNewForm)

router.route("/:id")
.get(wrapAsync(listingController.showListing)) // show listing
.put(isLoggedIn, isOwner, upload.single("listing[image]"), wrapAsync(listingController.updateListing)) // update route (put)

.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)) // delete route

// update route page
router.get('/:id/edit', isLoggedIn, isOwner,  wrapAsync(listingController.renderUpdateForm))
// filter category route
router.get("/filter/:category", listingController.categoryListing)


module.exports = router


// we can create different routes that takes same callback function but for that we have to make that function work in such a way that it accepts data from both routes and apply a condition so that it could know what data it gets and then provide result accordingly.
        // example:     
            // for the functionality of filters, we can send request to different routes that use same callback functions and that function will provide results accordingly.
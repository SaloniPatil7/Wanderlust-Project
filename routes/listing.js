const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");//listing schema
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn } = require("../middleware.js");
const { isOwner, isValidateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');//multer
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });//multer


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'),
        wrapAsync(listingController.createListing)
    );



//new
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .patch(isLoggedIn, isOwner, upload.single('listing[image]', isValidateListing),
        wrapAsync(listingController.updateListing));



//edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)
);

//DELETE
router.get("/:id/delete", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.get("/listings/search", wrapAsync(listingController.searchListing));


module.exports = router;









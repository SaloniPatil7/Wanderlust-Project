const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js")
const CustomError = require("../utils/CustomError.js")

const Review = require("../models/review.js");//review schema

const Listing = require("../models/listing.js");
const { isValidateReview } = require("../middleware.js")
const reviewController = require("../controllers/review.js");


//create
router.post("/", isValidateReview, wrapAsync(reviewController.createReview));

//delete review rote
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview))

module.exports = router;
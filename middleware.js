const CustomError = require("./utils/CustomError.js")
const { listingSchema } = require("./schema.js");//validate schema
const { reviewSchema } = require("./schema.js");//validate schema 
const Listing = require("./models/listing.js");



module.exports.isValidateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new CustomError(400, error)
    } else {
        next();
    }
};

module.exports.isValidateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new CustomError(400, error)
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.user);

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You Must Be Logged In To Create Listing!")
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}




module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "Only Owner have permission to this!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
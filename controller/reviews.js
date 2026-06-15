const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

/* ==========================
   CREATE REVIEW
========================== */

module.exports.createReview =
async (req, res) => {

    const { id } =
    req.params;

    const listing =
    await Listing.findById(id);

    if (!listing) {

        req.flash(
            "error",
            "Listing not found!"
        );

        return res.redirect(
            "/listings"
        );

    }

    const newReview =
    new Review(req.body.review);

    newReview.author =
    req.user._id;

    listing.reviews.push(
        newReview
    );

    await newReview.save();
    await listing.save();

    req.flash(
        "success",
        "Review Added Successfully!"
    );

    res.redirect(
        `/listings/${listing._id}`
    );

};

/* ==========================
   DELETE REVIEW
========================== */

module.exports.destroyReview =
async (req, res) => {

    const {
        id,
        reviewId
    } = req.params;

    await Listing.findByIdAndUpdate(
        id,
        {
            $pull: {
                reviews: reviewId
            }
        })
    }
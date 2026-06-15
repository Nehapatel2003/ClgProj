const express = require("express");

const router =
express.Router({
    mergeParams: true
});

const wrapAsync =
require("../utils/wrapAsync.js");

const {
    validateReviews,
    isLoggedIn,
    isReviewAuthor
} = require("../middleware.js");

const reviewsController =
require("../controller/reviews.js");

/* ==========================
   CREATE REVIEW
========================== */

router.post(
    "/",
    isLoggedIn,
    validateReviews,
    wrapAsync(
        reviewsController.createReview
    )
);

/* ==========================
   DELETE REVIEW
========================== */

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(
        reviewsController.destroyReview
    )
);

module.exports = router;
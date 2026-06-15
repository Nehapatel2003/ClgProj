const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

const {
  isLoggedIn,
  isowner,
  validateListing,
} = require("../middleware.js");

const listingController = require("../controller/listing.js");

const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

/* ==================================
   INDEX + CREATE
================================== */

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

/* ==================================
   NEW LISTING FORM
================================== */

router.get(
  "/new",
  isLoggedIn,
  listingController.renderNewForm
);

/* ==================================
   SEARCH LISTINGS
================================== */

router.get(
  "/search",
  wrapAsync(async (req, res) => {
    const { query } = req.query;

    const allListing = await Listing.find({
      $or: [
        {
          title: {
            $regex: query,
            $options: "i",
          },
        },
        {
          location: {
            $regex: query,
            $options: "i",
          },
        },
        {
          country: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.render("listings/index", { allListing });
  })
);

/* ==================================
   SHOW + UPDATE + DELETE
================================== */

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isowner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isowner,
    wrapAsync(listingController.destroyListing)
  );

/* ==================================
   EDIT FORM
================================== */

router.get(
  "/:id/edit",
  isLoggedIn,
  isowner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
const Listing = require("../models/listing");

/* ===========================
   ALL LISTINGS
=========================== */

module.exports.index = async (req, res) => {

    const allListing =
    await Listing.find({});

    res.render(
        "listings/index.ejs",
        { allListing }
    );

};

/* ===========================
   NEW FORM
=========================== */

module.exports.renderNewForm = (req, res) => {

    res.render(
        "listings/new.ejs"
    );

};

/* ===========================
   CREATE LISTING
=========================== */

module.exports.createListing =
async (req, res) => {

    if (!req.file) {

        req.flash(
            "error",
            "Please upload an image!"
        );

        return res.redirect(
            "/listings/new"
        );

    }

    const url =
    req.file.path;

    const filename =
    req.file.filename;

    const newListing =
    new Listing(req.body.listing);

    newListing.owner =
    req.user._id;

    newListing.image = {
        url,
        filename
    };

    await newListing.save();

    req.flash(
        "success",
        "New Listing Created Successfully!"
    );

    res.redirect(
        "/listings"
    );

};

/* ===========================
   SHOW LISTING
=========================== */

module.exports.showListing =
async (req, res) => {

    const { id } =
    req.params;

    const listing =
    await Listing.findById(id)

    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    })

    .populate("owner");

    if (!listing) {

        req.flash(
            "error",
            "Listing not found!"
        );

        return res.redirect(
            "/listings"
        );

    }

    res.render(
        "listings/show.ejs",
        { listing }
    );

};

/* ===========================
   EDIT FORM
=========================== */

module.exports.renderEditForm =
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

    let originalImageURL =
    listing.image?.url;

    if (
        originalImageURL &&
        originalImageURL.includes("/upload")
    ) {

        originalImageURL =
        originalImageURL.replace(
            "/upload",
            "/upload/w_300"
        );

    }

    res.render(
        "listings/edit.ejs",
        {
            listing,
            originalImageURL
        }
    );

};

/* ===========================
   UPDATE LISTING
=========================== */

module.exports.updateListing =
async (req, res) => {

    const { id } =
    req.params;

    let listing =
    await Listing.findByIdAndUpdate(
        id,
        {
            ...req.body.listing
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (req.file) {

        const url =
        req.file.path;

        const filename =
        req.file.filename;

        listing.image = {
            url,
            filename
        };

        await listing.save();

    }

    req.flash(
        "success",
        "Listing Updated Successfully!"
    );

    res.redirect(
        `/listings/${id}`
    );

};

/* ===========================
   DELETE LISTING
=========================== */

module.exports.destroyListing =
async (req, res) => {

    const { id } =
    req.params;

    await Listing.findByIdAndDelete(
        id
    );

    req.flash(
        "success",
        "Listing Deleted Successfully!"
    );

    res.redirect(
        "/listings"
    );

};
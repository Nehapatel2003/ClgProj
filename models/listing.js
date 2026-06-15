const mongoose = require("mongoose");

const Review = require("./reviews.js");

const Schema = mongoose.Schema;

/* =====================================
LISTING SCHEMA
===================================== */

const listingSchema = new Schema({

```
title: {
    type: String,
    required: true,
    trim: true
},

description: {
    type: String,
    required: true
},

image: {

    url: {
        type: String,

        default:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },

    filename: {
        type: String,
        default: "defaultListing"
    }

},

price: {
    type: Number,
    required: true,
    min: 0
},

location: {
    type: String,
    required: true
},

country: {
    type: String,
    required: true
},

lat: {
    type: Number,
    default: 23.2599
},

lng: {
    type: Number,
    default: 77.4126
},

/* =========================
   CATEGORY
========================= */

category: {

    type: String,

    enum: [

        "Trending",
        "Rooms",
        "Cities",
        "Mountains",
        "Castles",
        "Pools",
        "Camping",
        "Farms",
        "Arctic",
        "Domes",
        "Boats"

    ],

    default: "Trending"

},

/* =========================
   FEATURED LISTING
========================= */

featured: {

    type: Boolean,

    default: false

},

/* =========================
   WISHLIST
========================= */

wishlist: [

    {

        type: Schema.Types.ObjectId,

        ref: "User"

    }

],

/* =========================
   REVIEWS
========================= */

reviews: [

    {

        type: Schema.Types.ObjectId,

        ref: "Review"

    }

],

/* =========================
   OWNER
========================= */

owner: {

    type: Schema.Types.ObjectId,

    ref: "User"

}
```

},

{
timestamps: true
});

/* =====================================
DELETE REVIEWS WHEN LISTING DELETED
===================================== */

listingSchema.post(
"findOneAndDelete",

```
async (listing) => {

    if(listing){

        await Review.deleteMany({

            _id: {
                $in: listing.reviews
            }

        });

    }

}
```

);

/* =====================================
MODEL
===================================== */

const Listing =
mongoose.model(
"Listing",
listingSchema
);

module.exports = Listing;

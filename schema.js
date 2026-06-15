const Joi = require("joi");

/* ==========================
   LISTING VALIDATION
========================== */

module.exports.listingSchema = Joi.object({

    listing: Joi.object({

        title: Joi.string()
            .required(),

        description: Joi.string()
            .required(),

        location: Joi.string()
            .required(),

        country: Joi.string()
            .required(),

        price: Joi.number()
            .min(0)
            .required(),

        category: Joi.string()
            .valid(
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
            )
            .required(),

        image: Joi.string()
            .allow("", null)

    }).required()

});

/* ==========================
   REVIEW VALIDATION
========================== */

module.exports.reviewSchema = Joi.object({

    review: Joi.object({

        comment: Joi.string()
            .required(),

        rating: Joi.number()
            .min(1)
            .max(5)
            .required()

    }).required()

});
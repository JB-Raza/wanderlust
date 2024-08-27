const joi = require("joi")

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string(),   // not required for user
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required(),
        image: joi.string().allow("", null), // for single image
        // images: joi.array().items(joi.string().allow("", null)),
        category: joi.string(),

    }).required()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required()
})
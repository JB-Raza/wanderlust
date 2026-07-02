const joi = require("joi")

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().trim().required(),
        description: joi.string().allow("", null),
        location: joi.string().trim().required(),
        country: joi.string().trim().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow("", null),
        category: joi.string().valid('Adventure', 'Valley', 'Farm', 'Mansion', 'Pool', 'Camping', 'Hiking', 'Arctic').allow("", null),
    }).required()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().trim().required(),
    }).required()
})

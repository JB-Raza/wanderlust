let mongoose = require('mongoose')
let Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require('joi');

// const imageSchema = new Schema({
//     url: {
//         type: String,
//         default: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//     },
//     filename: String,
// })

const listingSchema = new Schema({
    title: {
        type: String,
    },
    image: {
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        filename: String,
    }, // for single image
    
    // for multiple images
    // images: [ imageSchema ],
    price: Number,
    location: String,
    country: String,
    description: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String,
        enum: ['Adventure', 'Valley', 'Farm', 'Mansion', 'Pool', 'Camping', 'Hiking', 'Arctic']
    },
})

listingSchema.post("findOneAndDelete", async (listing) => {
    await Review.deleteMany({ _id: { $in: listing.reviews } })
})

const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing
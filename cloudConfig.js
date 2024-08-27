const cloudinary = require("cloudinary").v2  // the v2 is necessary to use to specify the version
const { CloudinaryStorage } = require("multer-storage-cloudinary")
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async( req, file ) => {
    // const uniqueName = Date.now() + "-" + file.originalname // generates a unique filename
    let format;

    // dont use an array of formats as it will give an error
    switch(file.mimetype){
        case "image/jpeg":
            format = "jpeg";
            break;
        case "image/png":
            format = "png";
            break;
        case "image/webp":
            format = "webp";
            break;
            default:
                format = "jpg"
    }
    return{
        folder: "wanderlust_dev",
        format: format,
        // public_id: uniqueName,
    }
  },
})


module.exports = {
    storage,
    cloudinary,
}
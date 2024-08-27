const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    }
    // the username and password field along with its hashed and salted form will automatically be added after we use passport-local-mongoose
})
//adds hashed, salted, username,password fields in the schema
userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema)
module.exports = User

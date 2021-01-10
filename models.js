const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 

    photo: {
        type: String
    },

    birthdate: {
        type: String
    }
})

const User = mongoose.model("User", userSchema)

exports.User = User
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    role:{
        type: String,
        default:"0"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)
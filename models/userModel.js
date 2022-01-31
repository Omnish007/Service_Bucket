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

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: "0"
    },

    serviceProfile: [
        {
            type: mongoose.Types.ObjectId,
            ref: "serviceProfile"
        }
    ],

    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order"
        }
    ],

    dp:{
        type:String,
        default:"https://images.unsplash.com/photo-1610878180933-123728745d22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuYWRhJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)
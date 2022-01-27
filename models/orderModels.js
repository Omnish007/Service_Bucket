const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    user: [
        {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
    ],

    service: String,

    subService: String,

    price: String,

    image: {
        type: String,
    },

    description: {
        type: String,
    },

    address: String,

    state: String,
 
    pinCode: String,
 
    dist: String



}, {
    timestamps: true
})

module.exports = mongoose.model("order", orderSchema)
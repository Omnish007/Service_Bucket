const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },

        employee: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },

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

        dist: String,

        status: {
            type: String,
            default: "0",
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("order", orderSchema);

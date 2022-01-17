const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    
    name: String,

    image: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("service", serviceSchema)
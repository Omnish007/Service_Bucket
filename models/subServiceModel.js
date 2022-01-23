const mongoose = require("mongoose")

const subServiceSchema = new mongoose.Schema({
    
    sname: String,

    simage: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("subService", subServiceSchema)
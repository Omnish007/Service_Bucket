const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    
    name: String,

    image: {
        type: String,
        required: true
    },

    subService:[
        {
            type:mongoose.Types.ObjectId,
            ref:"subService"
        },
    ]

}, {
    timestamps: true
})

module.exports = mongoose.model("service", serviceSchema)
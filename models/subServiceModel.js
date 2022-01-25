const mongoose = require("mongoose")

const subServiceSchema = new mongoose.Schema({

    service: [
        {
            type:mongoose.Types.ObjectId,
            ref:"service"
        }
    ],
    
    sname: String,

    
    simage: {
        type: String,
        required: true
    },

    price: String,

    
    
}, {
    timestamps: true
})

module.exports = mongoose.model("subService", subServiceSchema)
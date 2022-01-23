const mongoose = require("mongoose")

const serviceProfileSchema = new mongoose.Schema({

    user: {type:mongoose.Types.ObjectId, ref:"user"},

    serviceName: {type:mongoose.Types.ObjectId, ref:"service"},

    status:{
        type:String,
        default:"0"
    }


}, {
    timestamps: true
})

module.exports = mongoose.model("serviceProfile", serviceProfileSchema)
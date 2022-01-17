const User = require("../models/userModel")

const adminAuth = async (req, res, next) => {

    try {
        const user = await User.findOne({_id:req.user.id})

        if(user.role !== "1"){
            return res.status(400).json({msg: "Not Allowed"})
        }
        next()

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = adminAuth
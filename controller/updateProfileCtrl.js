const Users = require("../models/userModel")


const updateProfile = {
    updateProfile: async (req, res) => {
        try {

            const { name, phone } = req.body
            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                name, phone,
            })

            res.status(200).json({
                success: "Updated Successfully"
            })

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },

    updateDP: async (req, res) => {
        try {
            
            const {url} = req.body
            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                dp:url
            })

            res.status(200).json({
                success: "Updated Successfully"
            })

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = updateProfile
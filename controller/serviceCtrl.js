const Service = require("../models/serviceModel")


const serviceCtrl = {

    createService: async (req, res) => {
        try {

            const { name, image } = req.body

            if (image.length === 0)
                return res.status(400).json({ msg: "Please add image photo" })

            const newService = new Service({
                name, image })

            await newService.save()

            res.json({
                msg: "Service Created",
                newService: {
                    ...newService._doc,
                    user: req.user
                }
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = serviceCtrl
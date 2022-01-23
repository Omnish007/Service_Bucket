const Service = require("../models/serviceModel")


const serviceCtrl = {

    getServices: async (req, res) => {
        try {

            const services = await Service.find()

            res.json({
                msg: "Getting Services",
                services: services,
                user: req.user
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    createService: async (req, res) => {
        try {

            const { name, image, sname, simage } = req.body

            if (image.length === 0)
                return res.status(400).json({ msg: "Please add image photo" })

            const newService = new Service({
                name, image, sname, simage })

            console.log(newService)

            await newService.save()

            res.json({
                msg: "Service Created",
                newService: {
                    ...newService._doc,
                },
                user: req.user
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    deleteService: async (req, res) => {
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
                },
                user: req.user
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

module.exports = serviceCtrl
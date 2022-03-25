const Service = require("../models/serviceModel");
const SubService = require("../models/subServiceModel");

const serviceCtrl = {
    getServices: async (req, res) => {
        try {
            const services = await Service.find().populate("subService");

            res.json({
                msg: "Getting Services",
                services: services,
                user: req.user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    createService: async (req, res) => {
        try {
            const { name, image } = req.body;

            const serviceName = await Service.findOne({ name });

            if (serviceName) {
                return res.status(400).json({ msg: "Service Already exists" });
            }

            if (image.length === 0)
                return res.status(400).json({ msg: "Please add image" });

            const newService = new Service({
                name,
                image,
            });

            await newService.save();

            res.json({
                msg: "Service Created",
                newService: {
                    ...newService._doc,
                },
                user: req.user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    deleteService: async (req, res) => {
        try {
            const { id } = req.body;

            await Service.findOneAndDelete({ _id: id });

            await SubService.deleteMany({ service: id });

            await res.json({
                msg: "Service Deleted",
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = serviceCtrl;

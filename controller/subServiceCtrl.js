const SubService = require("../models/subServiceModel");
const Service = require("../models/serviceModel");

const subServiceCtrl = {
    getSubServices: async (req, res) => {
        try {
            const subServices = await SubService.find().populate("service");

            res.json({
                msg: "Getting Sub Services",
                subServices: subServices,
                user: req.user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    createSubService: async (req, res) => {
        try {
            const { service, sname, simage, price } = req.body;

            const serviceId = await Service.findOne({ name: service });

            const newSubService = new SubService({
                service: serviceId._id,
                sname,
                simage,
                price,
            });

            await Service.findOneAndUpdate(
                { name: service },
                {
                    $push: { subService: newSubService._id },
                },
            );

            await newSubService.save();

            // await Service.findOneAndUpdate(
            //     { _id: service },
            //     {
            //         $push: {
            //             subService: newSubService._id,
            //         },
            //     },
            // );

            res.json({
                msg: "Sub Service Created",
                newSubService: {
                    ...newSubService._doc,
                },
                user: req.user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    deleteSubService: async (req, res) => {
        try {
            const { name, image } = req.body;

            if (image.length === 0)
                return res.status(400).json({ msg: "Please add image photo" });

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
};

module.exports = subServiceCtrl;

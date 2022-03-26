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

    getSubService: async (req, res) => {
        try {
            const id = req.params.id;
            const subServices = await SubService.findOne({ _id: id }).populate(
                "service",
            );

            res.json({
                msg: "Getting Sub Service",
                subServices: subServices,
                sName: subServices.service.name,
                user: req.user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    createSubService: async (req, res) => {
        try {
            const { serviceName, name, image, price } = req.body;

            const serviceId = await Service.findOne({ name: serviceName });

            const newSubService = new SubService({
                service: serviceId._id,
                sName: serviceName,
                sname: name,
                simage: image,
                price,
            });

            await Service.findOneAndUpdate(
                { name: serviceName },
                {
                    $push: { subService: newSubService._id },
                },
            );

            await newSubService.save();

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
            console.log(req.body);
            const { _id, service } = req.body;

            await Service.findOneAndUpdate(
                { _id: service._id },
                {
                    $pull: {
                        subService: _id,
                    },
                },
            );

            await SubService.findOneAndDelete({ _id: _id });

            res.json({
                msg: "SubService Deleted",
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = subServiceCtrl;

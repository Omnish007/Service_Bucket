const Users = require("../models/userModel");

const employeeCtrl = {
    getEmployees: async (req, res) => {
        try {
            const employees = await Users.find({ role: "2" }).select(
                "-password",
            );

            res.json({
                msg: "Getting Employees",
                employees: employees,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    addEmployee: async (req, res) => {
        try {
            const { name, email } = req.body;

            if (image.length === 0)
                return res.status(400).json({ msg: "Please add image" });

            const newService = new Service({
                name,
                image,
            });
            console.log(newService);

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

    deleteEmployee: async (req, res) => {
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

module.exports = employeeCtrl;

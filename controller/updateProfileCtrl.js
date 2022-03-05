const Users = require("../models/userModel");
const Employee = require("../models/employeeModel");

const updateProfile = {
    updateProfile: async (req, res) => {
        try {
            const { name, phone } = req.body.formData;
            const { role } = req.body.auth.user;

            if (role === "0") {
                await Users.findByIdAndUpdate(
                    { _id: req.user._id },
                    {
                        name,
                        phone,
                    },
                );
            }
            if (role === "2") {
                await Employee.findByIdAndUpdate(
                    { _id: req.user._id },
                    {
                        name,
                        phone,
                    },
                );
            }

            res.status(200).json({
                success: "Updated Successfully",
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    updateDP: async (req, res) => {
        try {
            const { url, user } = req.body;

            if (user.role === "0") {
                await Users.findByIdAndUpdate(
                    { _id: req.user.id },
                    {
                        dp: url,
                    },
                );
            }

            if (user.role === "2") {
                await Employee.findByIdAndUpdate(
                    { _id: req.user.id },
                    {
                        dp: url,
                    },
                );
            }

            res.status(200).json({
                success: "Updated Successfully",
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = updateProfile;

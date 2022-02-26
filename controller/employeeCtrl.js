const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            const { name, email, phone, password, mastery } = req.body;

            //if emai is already exist
            const employee_email = await Users.findOne({ email });
            if (employee_email)
                return res
                    .status(400)
                    .json({ msg: "This email is already exist" });

            //if password character is lessthen 6
            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password Must be atleast 6 characters" });

            if (phone.length !== 10)
                return res.status(400).json({ msg: "Invalid Phone No." });

            //hash the password
            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                name,
                email,
                phone,
                role: "2",
                password: passwordHash,
                mastery,
            });

            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshsToken({ id: newUser._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000, //30 days
            });

            await newUser.save();

            res.json({
                msg: "Register",
                access_token,
                user: {
                    ...newUser._doc,
                    password: "",
                },
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

    gentrateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please Login" });

            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, result) => {
                    if (err)
                        return res.status(400).json({ msg: "Please Login" });

                    const user = await Users.findById(result.id).select(
                        "-password",
                    );

                    if (!user)
                        return res
                            .status(400)
                            .json({ msg: "This user is not exist" });

                    const access_token = createAccessToken({ id: result.id });

                    res.json({
                        access_token,
                        user: {
                            ...user._doc,
                            password: "",
                        },
                    });
                },
            );
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

const createRefreshsToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = employeeCtrl;

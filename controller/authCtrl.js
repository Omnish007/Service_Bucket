const Users = require("../models/userModel");
const Employee = require("../models/employeeModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, phone, password } = req.body;

            //if emai is already exist
            const user_email = await Users.findOne({ email });
            if (user_email)
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
                password: passwordHash,
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
                msg: "Register Successfully",
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

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            const employee = await Employee.findOne({ email });
            let access_token;
            let refresh_token;

            if (!user && !employee)
                return res
                    .status(400)
                    .json({ msg: "This email does not exist" });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    return res
                        .status(400)
                        .json({ msg: "Password is incorrect" });
                access_token = createAccessToken({ id: user._id });
                refresh_token = createRefreshsToken({ id: user._id });
            }

            if (employee) {
                const isMatch = await bcrypt.compare(
                    password,
                    employee.password,
                );
                if (!isMatch)
                    return res
                        .status(400)
                        .json({ msg: "Password is incorrect" });

                access_token = createAccessToken({ id: employee._id });
                refresh_token = createRefreshsToken({ id: employee._id });
            }

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 7 * 24 * 60 * 60 * 1000, //30 days
            });

            if (employee) {
                res.json({
                    msg: "Login Success",
                    access_token,
                    user: {
                        ...employee._doc,
                        password: "",
                    },
                });
            }
            if (user) {
                res.json({
                    msg: "Login Success",
                    access_token,
                    user: {
                        ...user._doc,
                        password: "",
                    },
                });
            }
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
            return res.json({ msg: "Logged Out!" });
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
                    const employee = await Employee.findById(result.id).select(
                        "-password",
                    );

                    if (!user && !employee)
                        return res
                            .status(400)
                            .json({ msg: "This user is not exist" });

                    const access_token = createAccessToken({ id: result.id });

                    if (user) {
                        res.json({
                            access_token,
                            user: {
                                ...user?._doc,
                                password: "",
                            },
                        });
                    }

                    if (employee) {
                        res.json({
                            access_token,
                            user: {
                                ...employee?._doc,
                                password: "",
                            },
                        });
                    }
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

module.exports = authCtrl;

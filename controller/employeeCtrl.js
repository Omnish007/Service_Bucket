const Users = require("../models/userModel");
const Order = require("../models/orderModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
    getEmployee: async (req, res) => {
        try {
            const { id } = req.body;
            const employee = await Users.findOne({ _id: id }).select(
                "-password",
            );

            res.json({
                msg: "Getting Employee",
                employee: employee,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    addEmployee: async (req, res) => {
        try {
            const { name, email, phone, password, mastery, available } =
                req.body;

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

            if (available !== "0" && available !== "1")
                return res
                    .status(400)
                    .json({ msg: "Please Select Available Status" });

            //hash the password
            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                name,
                email,
                phone,
                role: "2",
                password: passwordHash,
                mastery,
                available,
            });

            await newUser.save();

            res.json({
                msg: "Register",
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

    sendCredential: async (req, res) => {
        try {
            const { email, password } = req.body;

            const transporte = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: "servicebucket999@gmail.com",
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            let mailOptions = {
                from: "servicebucket999@gmail.com",
                to: email,
                subject: "Credential for join Service Bucket",
                html: `  <div style="display: flex;justify-content: center;align-items: center;">
                <div style="margin:auto;min-width:580px;width: 30%;font-family: Helvetica;border: 10px solid green;padding: 50px;">
                    <h2 style=" text-align: center;color: teal; text-decoration: none; ">
                        Hello ${email}
                    </h2>
                    <h2 style="text-align: center;">Welcome To Service Bucket</h2>
                    <hr>
                    <h3 style="text-align: center;">Email: <strong>${email}</strong></h3>
                    <h3 style="color: red ;text-align: center;">Password: <strong>${password}</strong></h3>
                    <p style="text-align: center;color:#adad07;font-weight:700">Warning: Please Don't Share your credentials with anyone</p>
                </div>`,
            };

            transporte.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).json({ msg: err.message });
                } else {
                    return res
                        .status(200)
                        .json({ msg: "Mail Sended Successfully" });
                }
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    addOrder: async (req, res) => {
        try {
            const { ele, employee } = req.body;

            const employeeData = await Users.findOne({
                email: employee,
            });

            const order = await Order.findById({ _id: ele._id }).populate(
                "user",
            );

            await Order.findByIdAndUpdate(
                { _id: ele._id },
                {
                    $set: {
                        employee: employeeData._id,
                    },
                },
            ).populate("user");
            await Users.findByIdAndUpdate(
                { _id: employeeData._id },
                {
                    $push: {
                        orders: ele._id,
                    },
                    $set: {
                        available: "0",
                    },
                },
            );

            res.status(201).json({
                msg: "Employee is Successfuly Selected",
                employee: order._doc,
            });
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

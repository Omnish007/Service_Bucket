const Employee = require("../models/employeeModel");
const Order = require("../models/orderModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { CLIENT_URL } = process.env;

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

    registerEmployee: async (req, res) => {
        try {
            const { name, email, phone, password, mastery } = req.body;
            //if email is already exist
            const employee_email = await Employee.findOne({ email });
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
            const available = "1";
            const newEmployee = {
                name,
                email,
                phone,
                role: "2",
                password: passwordHash,
                mastery: [],
                available,
            };

            const activation_token = createActivationToken(newEmployee);
            const url = `${CLIENT_URL}/employee/activate/${activation_token}`;

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
                subject: "Email activation to join Service Bucket",
                html: `<div style="max-width: 700px; margin: auto; border: 10px solid rgb(47, 153, 47); padding: 50px 20px;">
                        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Service Bucket</h2>
                        <p>Congratulations You're almost set to start using SERVICE BUCKET
                            Just click the button below to validate your email address
                        </p>
                        <div style="text-align: center;">
                            <a href="http://${url}" style="background: green; text-decoration: none; padding: 10px 20px; color:white;">Activate Email</a>
                        </div>
                        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                        <a href="http://${url}">${url}</a>
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

    loginEmployee: async (req, res) => {
        try {
            const { email, password } = req.body;

            const employee = await Employee.findOne({ email });

            if (!employee)
                return res
                    .status(400)
                    .json({ msg: "This email does not exist" });

            const isMatch = await bcrypt.compare(password, employee.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect" });

            const access_token = createAccessToken({ id: employee._id });
            const refresh_token = createRefreshsToken({ id: employee._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 24 * 60 * 60 * 1000, //1 day
            });

            res.json({
                msg: "Login Success",
                access_token,
                user: {
                    ...employee._doc,
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

                    const user = await Employee.findById(result.id).select(
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

    activateEmployeeAccount: async (req, res) => {
        try {
            const { activation_token } = req.body;
            const employee = jwt.verify(
                activation_token,
                process.env.ACTIVATION_TOKEN_SECRET,
            );

            const { name, email, phone, password, mastery, available, role } =
                employee;

            const check = await Employee.findOne({ email });
            if (check)
                return res
                    .status(400)
                    .json({ msg: "this email is already exists" });

            const newEmployee = new Employee({
                name,
                email,
                phone,
                role,
                password,
                mastery,
                available,
            });

            await newEmployee.save();

            res.json({ msg: "Account has been activated!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
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
            );
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

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "5m",
    });
};

module.exports = employeeCtrl;

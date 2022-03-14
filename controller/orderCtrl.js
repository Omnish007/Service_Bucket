const Order = require("../models/orderModels");
const User = require("../models/userModel");
const SubService = require("../models/subServiceModel");

const orderCtrl = {
    getOrders: async (req, res) => {
        try {
            let order;

            if (req.user.role !== "2") {
                order = await Order.find({ user: req.user._id });
            } else if (req.user.role === "2") {
                const user = await User.findById({ _id: req.user._id });

                if (user.orders.length > 0) {
                    order = await User.findById({ _id: req.user._id }).populate(
                        "orders",
                    );
                }
            }

            res.json({
                msg: "Getting Orders",
                nOfOrders: order.length,
                order: [order],
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate("user subService");

            res.json({
                msg: "Getting All Orders",
                orders: orders,
                user: req.user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    createOrder: async (req, res) => {
        try {
            const userID = req.user._id;
            const { sName, sname, price, address, state, pinCode, dist, date } =
                req.body;

            const subService = await SubService.find({ sname: sname });
            const subServiceImg = await subService[0].simage;

            const newOrder = new Order({
                user: userID,
                service: sName,
                subService: sname,
                image: subServiceImg,
                price,
                address,
                state,
                pinCode,
                dist,
                date,
            });

            await newOrder.save();

            await User.findOneAndUpdate(
                { _id: userID },
                {
                    $push: {
                        orders: newOrder._doc._id,
                    },
                },
            );

            res.json({
                msg: "Order Successfully Created",
                newOrder: {
                    ...newOrder._doc,
                },
                user: req.user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const id = req.params.id;

            await Order.findOneAndDelete({ _id: id });

            const user = await User.findOneAndUpdate(
                { orders: id },
                {
                    $pull: { orders: id },
                },
            );

            res.json({
                msg: "Order Deleted Successfully",
                user,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = orderCtrl;

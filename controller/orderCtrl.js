const Order = require("../models/orderModels")
const User = require("../models/userModel")



const orderCtrl = {

    // getOrders: async (req, res) => {
    //     try {

    //         const order = await Order.find().populate("user")

    //         res.json({
    //             msg: "Getting Orders",
    //             order,
    //         })

    //     } catch (error) {
    //         return res.status(500).json({ msg: error.message })
    //     }
    // },

    // getOrder: async (req, res) => {
    //     try {

    //         const order = await Order.find().populate("subService")

    //         res.json({
    //             msg: "Getting Services",
    //             services: services,
    //             user: req.user
    //         })

    //     } catch (error) {
    //         return res.status(500).json({ msg: error.message })
    //     }
    // },

    createOrder: async (req, res) => {
        try {

            const userID = req.user._id
            const { sName, sname, price, address, state, pinCode, dist } = req.body

            const newOrder = new Order({
                user: userID, service: sName, subService: sname, price, address, state, pinCode, dist
            })


            await newOrder.save()

            await User.findOneAndUpdate({ _id: userID }, {
                $push: {
                    order: newOrder._doc._id
                }

            })

            res.json({
                msg: "Service Created",
                newOrder: {
                    ...newOrder._doc,
                },
                user: req.user
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    // deleteOrder: async (req, res) => {
    //     try {

    //         const { name, image } = req.body

    //         if (image.length === 0)
    //             return res.status(400).json({ msg: "Please add image photo" })

    //         const newService = new Service({
    //             name, image })

    //         await newService.save()

    //         res.json({
    //             msg: "Service Created",
    //             newService: {
    //                 ...newService._doc,
    //             },
    //             user: req.user
    //         })

    //     } catch (error) {
    //         return res.status(500).json({ msg: error.message })
    //     }
    // }
}

module.exports = orderCtrl
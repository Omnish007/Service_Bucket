const router = require("express").Router()
const orderCtrl = require("../controller/orderCtrl")
const auth = require("../middleware/auth")

router.get("/getOrders", auth, orderCtrl.getOrders)
// router.get("/getOrder", orderCtrl.getOrder)

router.post("/createorder", auth, orderCtrl.createOrder)

// router.patch("/updateService", authCtrl.updateOrder)

// router.delete("/deleteOrder", orderCtrl.deleteOrder)

module.exports = router
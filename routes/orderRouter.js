const router = require("express").Router();
const orderCtrl = require("../controller/orderCtrl");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

router.get("/getOrders", auth, orderCtrl.getOrders);

router.get("/getAllOrders", auth, adminAuth, orderCtrl.getAllOrders);

router.post("/createOrder", auth, orderCtrl.createOrder);

// router.patch("/updateService", authCtrl.updateOrder)

router.delete("/deleteOrder/:id", orderCtrl.deleteOrder);

module.exports = router;

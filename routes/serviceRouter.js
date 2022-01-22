const router = require("express").Router()
const serviceCtrl = require("../controller/serviceCtrl")
const adminAuth = require("../middleware/adminAuth")
const auth = require("../middleware/auth")

router.get("/getServices", serviceCtrl.getServices)

router.post("/createService", auth , adminAuth, serviceCtrl.createService)

// router.patch("/updateService", authCtrl.updateService)

router.delete("/deleteService", serviceCtrl.deleteService)

module.exports = router
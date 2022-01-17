const router = require("express").Router()
const serviceCtrl = require("../controller/serviceCtrl")
const adminAuth = require("../middleware/adminAuth")
const auth = require("../middleware/auth")

// router.post("/getService", auth , adminAuth, authCtrl.getService)

router.post("/createService", auth , adminAuth, serviceCtrl.createService)

// router.patch("/updateService", authCtrl.updateService)

// router.delete("/deleteService", authCtrl.deleteService)

module.exports = router
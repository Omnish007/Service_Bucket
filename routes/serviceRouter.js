const router = require("express").Router()
const serviceCtrl = require("../controller/serviceCtrl")
const adminAuth = require("../middleware/adminAuth")
const auth = require("../middleware/auth")

router.get("/getServices",auth, adminAuth, serviceCtrl.getServices)

router.post("/createService", auth , adminAuth, serviceCtrl.createService)

// router.patch("/updateService", authCtrl.updateService)

// router.delete("/deleteService", authCtrl.deleteService)

module.exports = router
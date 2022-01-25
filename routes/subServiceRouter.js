const router = require("express").Router()
const subsServiceCtrl = require("../controller/subServiceCtrl")
const adminAuth = require("../middleware/adminAuth")
const auth = require("../middleware/auth")

router.get("/getSubServices", subsServiceCtrl.getSubServices)

router.get("/getSubService/:id", subsServiceCtrl.getSubService)

router.post("/createSubService", auth , adminAuth, subsServiceCtrl.createSubService)

// router.patch("/updateService", authCtrl.updateService)

router.delete("/deleteSubService", subsServiceCtrl.deleteSubService)

module.exports = router
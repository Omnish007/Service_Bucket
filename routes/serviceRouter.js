const router = require("express").Router();
const serviceCtrl = require("../controller/serviceCtrl");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

router.get("/getServices", serviceCtrl.getServices);

router.post("/createService", auth, adminAuth, serviceCtrl.createService);

router.post("/deleteService", auth, adminAuth, serviceCtrl.deleteService);

module.exports = router;

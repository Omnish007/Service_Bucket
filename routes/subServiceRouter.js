const router = require("express").Router();
const subsServiceCtrl = require("../controller/subServiceCtrl");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

router.get("/getSubServices", subsServiceCtrl.getSubServices);

router.post(
    "/createSubService",
    auth,
    adminAuth,
    subsServiceCtrl.createSubService,
);

router.delete("/deleteSubService", subsServiceCtrl.deleteSubService);

module.exports = router;

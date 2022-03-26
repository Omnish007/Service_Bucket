const router = require("express").Router();
const subsServiceCtrl = require("../controller/subServiceCtrl");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

router.get("/getSubService/:id", subsServiceCtrl.getSubService);

router.get("/getSubServices", subsServiceCtrl.getSubServices);

router.post(
    "/createSubService",
    auth,
    adminAuth,
    subsServiceCtrl.createSubService,
);

router.post("/deleteSubService", subsServiceCtrl.deleteSubService);

module.exports = router;

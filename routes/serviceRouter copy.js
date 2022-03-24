const router = require("express").Router();
const subServiceCtrl = require("../controller/subServiceCtrl");
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

router.get("/getSubServices", subServiceCtrl.getSubServices);

router.post(
    "/createSubService",
    auth,
    adminAuth,
    subServiceCtrl.createSubService,
);

router.post(
    "/deleteSubService",
    auth,
    adminAuth,
    subServiceCtrl.deleteSubService,
);

module.exports = router;

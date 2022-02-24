const employeeCtrl = require("../controller/employeeCtrl");
const router = require("express").Router();
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

router.get("/getEmployees", auth, adminAuth, employeeCtrl.getEmployees);

router.post("/addEmployee", auth, adminAuth, employeeCtrl.addEmployee);

router.delete("/removeEmployee/:id", employeeCtrl.deleteEmployee);

module.exports = router;

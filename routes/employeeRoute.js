const employeeCtrl = require("../controller/employeeCtrl");
const router = require("express").Router();
const adminAuth = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

router.get("/getEmployees", auth, adminAuth, employeeCtrl.getEmployees);

router.post("/registerEmployee", employeeCtrl.registerEmployee);

router.post("/loginEmployee", employeeCtrl.loginEmployee);

router.post("/activateEmployeeAccount", employeeCtrl.activateEmployeeAccount);

router.post("/addOrder", auth, adminAuth, employeeCtrl.addOrder);

router.post("/refresh_token", employeeCtrl.gentrateAccessToken);

router.delete("/removeEmployee/:id", employeeCtrl.deleteEmployee);

module.exports = router;

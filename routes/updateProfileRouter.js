const router = require("express").Router()
const auth = require("../middleware/auth")
const updateProfileCtrl = require("../controller/updateProfileCtrl")



router.patch("/updateProfile",auth, updateProfileCtrl.updateProfile )
router.patch("/updateDp",auth, updateProfileCtrl.updateDP)


module.exports = router
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const adminUserCtrl = require("../controllers/adminUser");

router.get(":entity/users",auth ,adminUserCtrl.getUsers);
router.get(":entity/user/:id", auth, adminUserCtrl.getUser);
router.put(":entity/user/:id", auth, adminUserCtrl.modifyUser);
router.delete(":entity/user/:id", auth, adminUserCtrl.deleteUser);
router.post(":entity/user", auth, adminUserCtrl.addUser);

module.exports = router;
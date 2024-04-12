const express = require("express");
const router = express.Router();
const {
	loginController,
	signupController,
	getAllManagers,
	updateManagerController,
} = require("../controller/userController");

router.route("/signup").post(signupController);
router.route("/login").post(loginController);
router.route("/managers").get(getAllManagers);
router.route("/managers").post(updateManagerController);

module.exports = router;

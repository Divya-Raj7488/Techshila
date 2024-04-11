const express = require('express')
const router = express.Router()
const { loginController,signupController} = require('../controller/userController')
const getAllMedicines = require("../controller/medicine")

router.route('/signup').post(signupController)
router.route('/login').post(loginController)
router.route('/get-all-medicines').post(loginController)

module.exports = router
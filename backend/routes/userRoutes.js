const express = require('express')
const router = express.Router()
const verifyjwt = require('../middleware/verifyJwt')
const { loginController,signupController} = require('../controller/userController')

router.route('/signup').post(signupController)
router.route('/login').post(loginController)
module.exports = router
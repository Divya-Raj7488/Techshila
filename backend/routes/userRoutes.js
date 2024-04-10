const express = require('express')
const router = express.Router()
const verifyjwt = require('../middleware/verifyJwt')
const { loginController,signupController,getOrders } = require('../controller/userController')

router.route('/signup').post(signupController)
router.route('/login').post(loginController)
router.route('/orders').get(verifyjwt, getOrders)
module.exports = router
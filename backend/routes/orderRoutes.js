const express = require("express");
const router = express.Router();
const verifyjwt = require("../middleware/verifyJwt");
const {
	getOrders,
	createOrders,
	getOrdersByUserId,
} = require("../controller/orderController");

router.route("/orders").get(verifyjwt, getOrders);
router.route("/").post(createOrders);
router.route("/:userId").get(getOrdersByUserId);

module.exports = router;

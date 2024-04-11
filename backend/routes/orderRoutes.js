const express = require("express");
const router = express.Router();
const verifyjwt = require("../middleware/verifyJwt")
const { getOrders, createOrders } = require("../controller/orderController");

router.route("/orders").get(verifyjwt, getOrders);
router.route("/place-order").post(verifyjwt,createOrders);

module.exports = router;

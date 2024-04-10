const express = require("express");
const router = express.Router();
const verifyjwt = require("../middleware/verifyJwt")
const { getOrders, recieveOrders } = require("../controller/orderController");

router.route("/orders").get(verifyjwt, getOrders);
router.route("/place-order").post(verifyjwt,recieveOrders);
module.exports = router;

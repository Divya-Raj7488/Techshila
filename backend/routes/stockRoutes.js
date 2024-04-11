const express = require("express");
const router = express.Router();
const stockController = require("../controller/stockController");

router.post("/summary", stockController.calculateTotalPrice);
router.post("/", stockController.createStocks);

module.exports = router;

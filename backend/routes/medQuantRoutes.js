const express = require("express");
const router = express.Router();
const medQuantController = require("../controller/medQuantController");

router.post("/", medQuantController.addMedicine);

module.exports = router;

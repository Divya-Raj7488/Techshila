const express = require("express");
const router = express.Router();
const medicineController = require("../controller/medicineController");

router.get("/", medicineController.getAllMedicines);
router.post("/", medicineController.addMedicine);

module.exports = router;

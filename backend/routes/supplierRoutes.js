const express = require("express");
const router = express.Router();
const supplierController = require("../controller/supplierController");

router.get("/", supplierController.getAllSuppliers);
router.post("/add", supplierController.addSupplier);

module.exports = router;

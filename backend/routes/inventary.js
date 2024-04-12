const express = require("express");
const router = express.Router();
const verifyjwt = require("../middleware/verifyJwt");
const {
	addInventory,
	updateMedicines,
	getStore,
	assignManagerToInventory,
	assignMedicinesToInventory,
} = require("../controller/inventryController");

router.route("/").post(addInventory);
router.route("/").put(assignManagerToInventory);
// router.route("/").get(verifyjwt, getStore);
router.route("/get").post(getStore);
router.route("/add-medicines").put(verifyjwt, updateMedicines);
router.route("/medicines").put(assignMedicinesToInventory);
module.exports = router;

const express = require("express");
const router = express.Router();
const verifyjwt = require("../middleware/verifyJwt");
const {
	addInventory,
	updateMedicines,
	getStore,
	updateAssignment,
} = require("../controller/inventryController");

router.route("/").post(addInventory);
router.route("/").put(updateAssignment);
// router.route("/").get(verifyjwt, getStore);
router.route("/get").post(getStore);
router.route("/add-medicines").put(verifyjwt, updateMedicines);
module.exports = router;

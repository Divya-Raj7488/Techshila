const express = require("express");
const router = express.Router();
const verifyjwt = require("../middleware/verifyJwt");
const {
  addInventory,
  updateMedicines,
  getStore
} = require("../controller/inventryController");

router.route("/new-store").post(addInventory);
router.route("/").get(verifyjwt, getStore);
router.route("/add-medicines").put(verifyjwt, updateMedicines);
module.exports = router;

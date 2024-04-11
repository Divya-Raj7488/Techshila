const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
  },
  medType: {
    type: String,
    enum: ["tablet", "injection", "syrup"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
});

const medicineModel = mongoose.model("Medicine", medicineSchema);
module.exports = medicineModel;

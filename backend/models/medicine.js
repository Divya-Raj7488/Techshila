const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
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
	inventories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Inventory",
		},
	],
});

const medicineModel = mongoose.model("Medicine", medicineSchema);
module.exports = medicineModel;

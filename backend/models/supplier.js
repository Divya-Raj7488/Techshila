const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
	},
	joiningDate: {
		type: Date,
		default: Date.now,
	},
	medicines: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Medicine",
		},
	],
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;

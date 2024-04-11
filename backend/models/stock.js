const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: "User",
	},
	stockOrderDetails: [
		{
			supplierID: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Supplier",
				required: true,
			},
			medicineID: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Medicine",
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
	orderStatus: {
		type: String,
		enum: ["pending", "confirmed", "shipped", "delivered"],
		required: true,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
});

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;

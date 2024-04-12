const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		orderDetails: [
			{
				medicineId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Medicine",
				},
				inventoryId: {
					type: String,
					required: true,
				},
				medicineName: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
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
	},
	{
		timestamps: true,
	}
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;

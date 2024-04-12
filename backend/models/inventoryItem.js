const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
	medicine: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Medicine",
		required: true,
	},
	inventory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Inventory",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;

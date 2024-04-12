const InventoryItem = require("../models/inventoryItem");
const mongoose = require("mongoose");

const addMedicine = async (req, res) => {
	try {
		const { medicineId, inventoryId, quantity } = req.body;

		const newItem = new InventoryItem({
			medicine: medicineId,
			inventory: inventoryId,
			quantity: quantity,
		});
		await newItem.save();

		return res
			.status(201)
			.json({ message: "Inventory item added successfully" });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "Failed to add inventory item" });
	}
};

module.exports = { addMedicine };

const InventoryItem = require("../models/inventoryItem");
const medicineModel = require("../models/medicine");

const getAllMedicines = async (req, res) => {
	try {
		const medicines = await medicineModel.find({}).populate("inventories");
		res.status(200).json({
			medicines: medicines,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch medicines" });
	}
};

const addMedicine = async (req, res) => {
	const { name, type, price, expiryDate } = req.body;

	try {
		const newMedicine = new medicineModel({
			name,
			type,
			price,
			expiryDate,
		});
		await newMedicine.save();

		res.status(201).json({
			message: "Medicine added successfully",
			medicine: newMedicine,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to add medicine" });
	}
};

const getMedicinesByInventoryId = async (req, res) => {
	const { inventoryId } = req.params;

	try {
		const medicines = await medicineModel.find({
			inventories: inventoryId,
		});

		const medQuant = [];

		for (const medicine of medicines) {
			const inventoryItem = await InventoryItem.findOne({
				inventory: inventoryId,
				medicine: medicine._id,
			});
			if (inventoryItem) {
				const updatedMedicine = {
					...medicine.toObject(),
					quantity: inventoryItem.quantity,
				};
				medQuant.push(updatedMedicine);
			} else {
				const updatedMedicine = {
					...medicine.toObject(),
					quantity: 0,
				};
				medQuant.push(updatedMedicine);
			}
		}

		res.status(200).json({ medicines: medQuant });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch medicines" });
	}
};

module.exports = { getAllMedicines, addMedicine, getMedicinesByInventoryId };

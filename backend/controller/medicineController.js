const medicineModel = require("../models/medicine");

const getAllMedicines = async (req, res) => {
	try {
		const medicines = await medicineModel.find({});
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

module.exports = { getAllMedicines, addMedicine };

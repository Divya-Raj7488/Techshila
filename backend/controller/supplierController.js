const Supplier = require("../models/supplier");

const getAllSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.find();
		res.json(suppliers);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch suppliers" });
	}
};

const addSupplier = async (req, res) => {
	const { name, email, phone } = req.body;

	try {
		const newSupplier = new Supplier({
			name,
			email,
			phone,
		});

		await newSupplier.save();

		res.status(201).json({
			message: "Supplier added successfully",
			supplier: newSupplier,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to add supplier" });
	}
};

module.exports = { addSupplier, getAllSuppliers };

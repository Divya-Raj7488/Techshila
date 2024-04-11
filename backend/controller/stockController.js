const Stock = require("../models/stock");
const Medicine = require("../models/medicine");
const Supplier = require("../models/supplier");

const createStocks = async (req, res) => {
	const { stocksData, userId, totalAmount } = req.body;

	try {
		const newStock = new Stock({
			userId: userId,
			stockOrderDetails: stocksData.map((item) => ({
				supplierID: item.supplierId,
				medicineID: item.medicineId,
				quantity: item.quantity,
			})),
			orderStatus: "pending",
			totalAmount: totalAmount,
		});

		await newStock.save();

		res.status(201).json({
			message: "Order created successfully",
			stock: newStock,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to create order" });
	}
};

const calculateTotalPrice = async (req, res) => {
	const { stocks } = req.body;
	let totalPrice = 0;
	let orderedMedicines = [];
	try {
		for (const stock of stocks) {
			const { medicineId, supplierId, quantity } = stock;

			const medicine = await Medicine.findById(medicineId);
			if (!medicine) {
				return res.status(400).json({
					message: `Medicine with ID ${medicineId} not found`,
				});
			}

			const supplier = await Supplier.findById(supplierId);
			if (!supplier) {
				return res.status(400).json({
					message: `Supplier with ID ${supplierId} not found`,
				});
			}

			totalPrice += medicine.price * quantity;
			orderedMedicines.push({
				name: medicine.name,
				type: medicine.type,
				price: medicine.price,
				totalAmount: medicine.price * quantity,
				quantity: quantity,
				supplierName: supplier.name,
			});
		}

		res.json({ totalPrice, orderedMedicines });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { calculateTotalPrice, createStocks };

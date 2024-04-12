const Inventory = require("../models/inventory");
const Medicine = require("../models/medicine");
const InventoryItem = require("../models/inventoryItem");

const User = require("../models/user");

const getStore = async (req, res) => {
	const { email } = req.body;

	try {
		let medData;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		if (user.role !== "user") {
			medData = await Inventory.find().populate("medicines");
			const updatedMedicines = [];
			for (const inventory of medData) {
				for (const medicine of inventory.medicines) {
					const inventoryItem = await InventoryItem.findOne({
						medicine: medicine._id,
						inventory: inventory._id,
					});

					if (inventoryItem) {
						const updatedMedicine = {
							...medicine.toObject(),
							quantity: inventoryItem.quantity,
						};
						updatedMedicines.push(updatedMedicine);
					}
				}
			}
			medData = updatedMedicines;
		}
		let storeData;

		if (user.role === "ceo" || user.role === "manager") {
			if (user.role === "ceo") {
				storeData = await Inventory.find().populate("manager");
			} else {
				storeData = await Inventory.find({
					manager: user._id,
				});
			}
			return res.status(200).json({
				message: "Here is your store",
				stores: storeData,
				medicines: medData,
			});
		} else {
			return res.status(401).json({ message: "Unauthorized" });
		}
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "Some error occurred. Please try again" });
	}
};

const addInventory = async (req, res) => {
	const { inventoryName, managerId, address, medicines } = req.body;

	try {
		// Create a new inventory
		const newInventory = new Inventory({
			inventoryName: inventoryName,
			manager: managerId,
			address: address,
			medicines: medicines,
		});

		// Save the new inventory
		await newInventory.save();

		// Update the inventoryIds of the medicines
		for (const medicineId of medicines) {
			await Medicine.findByIdAndUpdate(medicineId, {
				$push: { inventories: newInventory._id },
			});
		}

		res.status(201).json({
			message: "Inventory created successfully",
			inventory: newInventory,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to create inventory" });
	}
};

const updateAssignment = async (req, res) => {
	const { managerId, inventoryId } = req.body;

	try {
		const updatedInventory = await Inventory.findByIdAndUpdate(
			inventoryId,
			{ $push: { manager: managerId } },
			{ new: true }
		);

		if (!updatedInventory) {
			return res.status(404).json({ message: "Inventory not found" });
		}

		return res.status(200).json({
			message: "Assignment updated",
			inventory: updatedInventory,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Failed to update assignment" });
	}
};

const updateMedicines = async (req, res) => {
	const { medicines } = req.body;
	const { email } = req.user;
	for (const med of medicines) {
		const { medicineName, medicineType, Quantity, price } = med;
		if (!medicineName || !medicineType || !Quantity || !price) {
			return res
				.status(400)
				.json({ message: "all the field are necessary for medicine" });
		}
	}

	try {
		let inventory = await Inventory.findOne({ manager: email });
		if (!inventory) {
			return res
				.status(400)
				.json({ message: "No inventary for this manager" });
		}
		for (const med of medicines) {
			inventory.medicines.push(med);
		}
		await inventory.save();
		return res.status(200).json({ message: "store created successfully" });
	} catch (e) {
		console.log(e);
		return res
			.status(500)
			.json({ message: "some error occured. please try again" });
	}
};

module.exports = { addInventory, updateMedicines, getStore, updateAssignment };

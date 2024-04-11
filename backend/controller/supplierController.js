const Supplier = require("../models/supplier");
const mongoose = require("mongoose");
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("medicines");
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch suppliers" });
  }
};
const addSupplier = async (req, res) => {
  const { name, email, phone, medicines } = req.body;
  try {
    const newSupplier = new Supplier({
      name,
      email,
      phone,
      medicines: medicines.map(
        (medicineId) => new mongoose.Types.ObjectId(medicineId)
      ),
    });

    await newSupplier.save();

    res.status(201).json({
      message: "Supplier added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add supplier" });
  }
};

module.exports = { addSupplier, getAllSuppliers };

const InventoryModel = require("../models/inventory");

const getStore = async (req, res) => {
  const { email } = req.user;
  if (!email) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const storeData = await InventoryModel.find({ manager: email });
    return res
      .status(200)
      .json({ message: "here is your store", stores: storeData });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "some error occured. please try again" });
  }
};
const addInventory = async (req, res) => {
  const { inventoryName, email, address, medicines } = req.body;
  const [{ houseName, locality, city, state, country, pincode }] = address;
  if (
    !inventoryName ||
    !email ||
    !address ||
    !medicines ||
    !Array.isArray(address) ||
    !Array.isArray(medicines) ||
    !houseName ||
    !locality ||
    !city ||
    !state ||
    !country ||
    !pincode
  ) {
    return res.status(401).json({ message: "all fields are required" });
  }

  for (const med of medicines) {
    const { medicineName, medicineType, Quantity, price } = med;
    if (!medicineName || !medicineType || !Quantity || !price) {
      return res
        .status(400)
        .json({ message: "all the field are necessary for medicine" });
    }
  }
  const medArray = medicines.map((medicine, index) => ({
    medId: index + 1,
    medicineName: medicine.medicineName,
    medicineType: medicine.medicineType,
    Quantity: medicine.Quantity,
    price: medicine.price,
  }));
  try {
    await InventoryModel.create({
      inventoryName: inventoryName,
      manager: email,
      address: [
        {
          houseName: houseName,
          locality: locality,
          city: city,
          state: state,
          country: country,
          pincode: pincode,
        },
      ],
      medicines: medArray,
    });
    return res.status(200).json({ message: "store created successfully" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "some error occured. please try again" });
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
    let inventory = await InventoryModel.findOne({ manager: email });
    if (!inventory) {
        return res.status(400).json({ message: "No inventary for this manager" });
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

module.exports = { addInventory, updateMedicines, getStore };

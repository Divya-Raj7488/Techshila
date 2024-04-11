const medicineModel = require("../models/medicine");

const getAllMedicines = async () => {
  const medicines = await medicineModel.find({});
  return res
    .status(200)
    .json({ messages: "here is your medicines", medicines: medicines });
};
module.exports = getAllMedicines
const InventoryModel = require("../models/inventory");
const supplierModel = require("../models/supplier");

const getAllstore = async (req, res) => {
  try {
    const allStores = await InventoryModel.find({});
    return res
      .status(200)
      .json({ message: "this data is only for ceo", stores: allStores });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "some error occured. please try again" });
  }
};
const getAllSupplier = async (req, res) => {
  try {
    const allSupplier = await InventoryModel.supplierModel({});
    return res
      .status(200)
      .json({ message: "this data is only for ceo", stores: allSupplier });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "some error occured. please try again" });
  }
};

const createNewSupplier = async (req, res) => {
  const {name , email , phone, joiningDate, medicines}= req.body

  
};
module.exports = { getAllstore, getAllSupplier };

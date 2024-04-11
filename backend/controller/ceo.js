const InventoryModel = require("../models/inventory");

const getAllstore = async () => {
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
  module.exports = { getAllstore };
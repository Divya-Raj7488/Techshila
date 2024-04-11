const orderModel = require("../models/order");

const getOrders = (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const orderHistory = orderModel.find({ _id: _id });
  return res.status(200).json({
    message: "here is your orders",
    orders: orderHistory,
  });
};

const createOrders = async (req, res) => {
  const { _id } = req.user;
  const { inventoryId, orderDetails, orderStatus } = req.body;
  if (
    !_id ||
    !inventoryId ||
    !orderDetails ||
    !Array.isArray(orderDetails) ||
    !orderStatus
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  for (const orderItem of orderDetails) {
    const { medicineNo, medicineId, medicineName, Quantity, price } = orderItem;
    if (!medicineNo || !medicineId || !medicineName || !Quantity || !price) {
      return res
        .status(400)
        .json({ message: "orderDetails must contain all required fields" });
    }
  }

  const orderDetailsArray = orderDetails.map(
    ({ medicineNo, medicineId, medicineName, Quantity, price }) => ({
      medicineNo: medicineNo,
      medicineId: medicineId,
      medicineName: medicineName,
      Quantity: Quantity,
      price: price,
    })
  );

  try {
    await orderModel.create({
      userId: _id,
      inventoryId: inventoryId,
      orderDetails: orderDetailsArray,
      orderStatus: orderStatus,
    });
    return res.status(200).json({ message: "order placed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "unable to process your request. please try again" });
  }
};

module.exports = { getOrders, createOrders};

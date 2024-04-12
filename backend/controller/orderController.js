const Order = require("../models/order");

const getOrders = (req, res) => {
	const { _id } = req.user;
	if (!_id) {
		return res.status(401).json({ message: "unauthorized" });
	}
	const orderHistory = Order.find({ _id: _id });
	return res.status(200).json({
		message: "here is your orders",
		orders: orderHistory,
	});
};

const createOrders = async (req, res) => {
	try {
		const { userId } = req.body;
		const orderDetails = req.body.order.map((item) => ({
			medicineId: item.medicineId,
			inventoryId: item.inventoryId,
			medicineName: item.name,
			quantity: item.quantity,
			price: item.price,
		}));

		const newOrder = new Order({
			userId,
			orderDetails,
			orderStatus: "pending",
		});

		const orderId = newOrder._id;

		const savedOrder = await newOrder.save();
		console.log("Order created");
		res.status(201).json({
			orderId: orderId,
			message: "Order added successfully",
			order: savedOrder,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to add order" });
	}
};

module.exports = { getOrders, createOrders };

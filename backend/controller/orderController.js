const Order = require("../models/order");

const getOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch orders" });
	}
};

const getOrdersByUserId = async (req, res) => {
	const userId = req.params.userId;
	try {
		const orders = await Order.find({ userId });
		res.status(200).json(orders);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch orders" });
	}
};

const getOrderDetailsByInventoryId = async (req, res) => {
	const inventoryId = req.params.inventoryId;
	try {
		const orders = await Order.find({
			orderDetails: { $elemMatch: { inventoryId: inventoryId } },
		});
		res.status(200).json({ orders });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch orders" });
	}
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

module.exports = {
	getOrders,
	getOrdersByUserId,
	createOrders,
	getOrderDetailsByInventoryId,
};

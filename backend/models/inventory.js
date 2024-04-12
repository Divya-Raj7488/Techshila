const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
	inventoryName: {
    managerId: {
  		type: String,
  		required: true,
    },
	},
	manager: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
  // location: {
  //   type: Point,
  //   coordinates: [
  //     {
  //       longitude: {
  //         type: String,
  //         required: true,
  //       },
  //       latitude: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  // },
	address: [
		{
			houseName: {
				type: String,
				required: true,
			},
			locality: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
				enum: [
					"Andaman and Nicobar Islands",
					"Andhra Pradesh",
					"Arunachal Pradesh",
					"Assam",
					"Bihar",
					"Chandigarh",
					"Chhattisgarh",
					"Dadra and Nagar Haveli and Daman and Diu",
					"Delhi",
					"Goa",
					"Gujarat",
					"Haryana",
					"Himachal Pradesh",
					"Jammu and Kashmir",
					"Jharkhand",
					"Karnataka",
					"Kerala",
					"Ladakh",
					"Lakshadweep",
					"Madhya Pradesh",
					"Maharashtra",
					"Manipur",
					"Meghalaya",
					"Mizoram",
					"Nagaland",
					"Odisha",
					"Puducherry",
					"Punjab",
					"Rajasthan",
					"Sikkim",
					"Tamil Nadu",
					"Telangana",
					"Tripura",
					"Uttar Pradesh",
					"Uttarakhand",
					"West Bengal",
				],
			},
			country: {
				type: String,
				default: "India",
			},
			pincode: {
				type: Number,
				required: true,
			},
		},
	],
	medicines: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Medicine",
		},
	],
	todaysRevenue: {
		type: Number,
		default: 0,
	},
	currentMonthRevenue: {
		type: Number,
		default: 0,
	},
});

const InventoryModel = mongoose.model("Inventory", InventorySchema);
module.exports = InventoryModel;

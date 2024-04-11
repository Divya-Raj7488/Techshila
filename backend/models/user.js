const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["user", "ceo", "manager"],
		required: true,
	},
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
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

export const suppliers = [
	{
		ID: 1,
		name: "Supplier 1",
		email: "supplier1@example.com",
		phone: "1234567890",
		joiningDate: "2022-04-05",
		medicines: [
			{
				ID: 1,
				name: "Medicine A",
				type: "Tablet",
				price: 10,
				expiryDate: "2023-01-01",
			},
			{
				ID: 2,
				name: "Medicine B",
				type: "Capsule",
				price: 15,
				expiryDate: "2023-02-01",
			},
		],
	},
	{
		ID: 2,
		name: "Supplier 2",
		email: "supplier2@example.com",
		phone: "9876543210",
		joiningDate: "2022-04-10",
		medicines: [
			{
				ID: 3,
				name: "Medicine C",
				type: "Injection",
				price: 20,
				expiryDate: "2023-03-01",
			},
			{
				ID: 4,
				name: "Medicine D",
				type: "Syrup",
				price: 25,
				expiryDate: "2023-04-01",
			},
		],
	},
];
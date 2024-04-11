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

export const medicines = [
	{
		ID: 1,
		sID: 1,
		supplierName: "ABC Pharmaceuticals",
		name: "Paracetamol",
		type: "Tablet",
		quantity: 100,
		expiryDate: "2024-06-30",
		price: "$10.00",
	},
	{
		ID: 2,
		sID: 1,
		supplierName: "XYZ Healthcare",
		name: "Ibuprofen",
		type: "Capsule",
		quantity: 50,
		expiryDate: "2024-08-15",
		price: "$15.50",
	},
];

export const data = [
	{ heading: "Medicine Sales", content: "8820" },
	{ heading: "Medicine List", content: "8" },
	{ heading: "Expired Drugs", content: "1" },
	{ heading: "Amount Payable", content: "450" },
	{ heading: "Transaction Today", content: "0" },
	{ heading: "No. of Orders in current Month", content: "40" },
	// Add more objects as needed
];

export const inventories = [
	{
		ID: 1,
		name: "Inventory 1",
		location: "Location 1",
		medicinesAvailable: medicines,
		revenueCurrentMonth: "$5000.00",
		revenueCurrentDay: "$200.00",
		managers: [
			{
				ID: 1,
				name: "Manager 1",
				email: "manager1@example.com",
				phone: "123-456-7890",
				department: "Pharmacy",
				onLeaveToday: true,
				leaves: 4,
				workDays: 88,
				gender: "male",
				joiningDate: "2022-04-05",
			},
			{
				ID: 2,
				name: "Manager 2",
				email: "manager2@example.com",
				phone: "234-567-8901",
				department: "Logistics",
				onLeaveToday: false,
				leaves: 4,
				workDays: 88,
				gender: "male",
				joiningDate: "2022-04-05",
			},
		],
	},
	{
		ID: 2,
		name: "Inventory 2",
		location: "Location 2",
		medicinesAvailable: medicines,
		revenueCurrentMonth: "$7000.00",
		revenueCurrentDay: "$300.00",
		managers: [
			{
				ID: 3,
				name: "Manager 3",
				email: "manager3@example.com",
				phone: "345-678-9012",
				department: "Operations",
				onLeaveToday: false,
				leaves: 4,
				workDays: 88,
				gender: "male",
				joiningDate: "2022-04-05",
			},
		],
	},
	// Add more dummy data as needed
];

export const managers = [
	{
		ID: 1,
		name: "Manager 1",
		email: "manager1@example.com",
		phone: "123-456-7890",
		department: "Pharmacy",
		onLeaveToday: true,
		leaves: 4,
		workDays: 88,
		gender: "male",
		joiningDate: "2022-04-05",
	},
	{
		ID: 2,
		name: "Manager 2",
		email: "manager2@example.com",
		phone: "234-567-8901",
		department: "Logistics",
		onLeaveToday: false,
		leaves: 4,
		workDays: 88,
		gender: "male",
		joiningDate: "2022-04-05",
	},
	{
		ID: 3,
		name: "Manager 3",
		email: "manager1@example.com",
		phone: "123-456-7890",
		department: "Pharmacy",
		onLeaveToday: false,
		leaves: 4,
		workDays: 88,
		gender: "male",
		joiningDate: "2022-04-05",
	},
	{
		ID: 4,
		name: "Manager 4",
		email: "manager2@example.com",
		phone: "234-567-8901",
		department: "Logistics",
		onLeaveToday: false,
		leaves: 4,
		workDays: 88,
		gender: "male",
		joiningDate: "2022-04-05",
	},
];

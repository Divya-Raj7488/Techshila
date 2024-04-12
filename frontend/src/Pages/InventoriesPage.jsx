import React, { useEffect, useState } from "react";
import useGetUser from "../utils/useGetUser";

import {
	Button,
	Dialog,
	DialogActions,
	Chip,
	DialogContent,
	DialogTitle,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Box,
	Typography,
	TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getManagers } from "../Slices/managerSlice";
import {
	createInventory,
	getInventories,
	updateManagerToInventory,
} from "../Slices/inventorySlice";
import InventoryTable from "../Components/Inventory/InventoryTable";
import { getMedicines, resetMedicine } from "../Slices/medicineSlice";

const IndianStates = [
	"Andhra Pradesh",
	"Arunachal Pradesh",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttar Pradesh",
	"Uttarakhand",
	"West Bengal",
];
const InventoriesPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getManagers());
		// dispatch(getInventories());
	}, []);

	const [open, setOpen] = useState(false);
	const [selectedManagers, setSelectedManagers] = useState([]);
	const [selectedMedicines, setSelectedMedicines] = useState([]);
	const [inventoryName, setInventoryName] = useState("");
	const [address, setAddress] = useState({
		houseName: "",
		locality: "",
		city: "",
		state: "",
		pincode: "",
		coordinates: {
			latitude: 0.0,
			longitude: 0.0,
		},
		country: "",
	});

	const handleCoordinateChange = (key, value) => {
		setAddress({
			...address,
			coordinates: {
				...address.coordinates,
				[key]: value,
			},
		});
	};

	const handleClickOpen = () => {
		dispatch(getMedicines());
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		dispatch(resetMedicine());
	};

	const handleSave = () => {
		// const data = {
		// 	managerId: selectedManagers,
		// 	inventoryId: selectedInventory,
		// };
		// dispatch(updateManagerToInventory(data));
		const inventoryData = {
			inventoryName: inventoryName,
			managerIds: selectedManagers,
			address: address,
			medicines: selectedMedicines,
		};
		console.log(inventoryData);
		dispatch(createInventory(inventoryData)).then(() => {
			dispatch(getInventories());
		});
		handleClose();
	};

	const inventories = useSelector((state) => state.inventory.inventorysList);
	const managers = useSelector((state) => state.manager.managersList);
	useGetUser();
	const getManagerName = (managerId) => {
		const manager = managers.find((manager) => manager._id === managerId);
		return manager ? manager.fullName : "";
	};

	const getMedicineName = (medicineId) => {
		const medicine = medicines.find(
			(medicine) => medicine._id === medicineId
		);
		return medicine ? medicine.name : "";
	};

	const medicines = useSelector((state) => state.medicine.medicinesList);
	const user = useSelector((state) => state.user.userLoggedIn);
	const role = user?.role;
	useEffect(() => {
		if (role === "user") window.location.href = "/login";
	}, [role]);

	useEffect(() => {
		dispatch(getManagers());
		// if (user?.email) dispatch(getInventories({ email: user?.email }));
	}, [user]);

	return (
		<Box
			ml={40}
			mt={2}
			mr={10}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Inventories
			</Typography>
			<div>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClickOpen}
				>
					Add Inventory
				</Button>
				<Dialog maxWidth="md" open={open} onClose={handleClose}>
					<DialogTitle>Add an Inventory</DialogTitle>
					<DialogContent>
						<TextField
							label="Inventory Name"
							value={inventoryName}
							onChange={(e) => setInventoryName(e.target.value)}
							fullWidth
							margin="normal"
							sx={{ mt: 2 }}
						/>
						<FormControl fullWidth sx={{ mt: 2 }}>
							<InputLabel>Manager</InputLabel>
							<Select
								multiple
								value={selectedManagers}
								label="Manager"
								onChange={(e) =>
									setSelectedManagers(e.target.value)
								}
								renderValue={(selected) => (
									<div>
										{selected.map((value) => (
											<Chip
												key={value}
												label={getManagerName(value)}
											/>
										))}
									</div>
								)}
							>
								{managers?.map((manager) => (
									<MenuItem
										key={manager._id}
										value={manager._id}
									>
										{manager.fullName}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<Box sx={{ mt: 2 }}>
							<Typography variant="subtitle1">Address</Typography>
							<TextField
								label="House Name"
								value={address.houseName}
								onChange={(e) =>
									setAddress({
										...address,
										houseName: e.target.value,
									})
								}
								fullWidth
								margin="normal"
							/>
							<TextField
								label="Locality"
								value={address.locality}
								onChange={(e) =>
									setAddress({
										...address,
										locality: e.target.value,
									})
								}
								fullWidth
								margin="normal"
							/>
							<TextField
								label="City"
								value={address.city}
								onChange={(e) =>
									setAddress({
										...address,
										city: e.target.value,
									})
								}
								fullWidth
								margin="normal"
							/>

							<TextField
								label="Location Coordinate Longitude"
								value={address.coordinates.longitude}
								onChange={(e) =>
									handleCoordinateChange(
										"longitude",
										e.target.value
									)
								}
								fullWidth
								margin="normal"
							/>
							<TextField
								label="Location Coordinate Latitude"
								value={address.coordinates.latitude}
								onChange={(e) =>
									handleCoordinateChange(
										"latitude",
										e.target.value
									)
								}
								fullWidth
								margin="normal"
							/>

							<FormControl fullWidth sx={{ mt: 2 }}>
								<InputLabel>State</InputLabel>
								<Select
									value={address.state}
									label="State"
									onChange={(e) =>
										setAddress({
											...address,
											state: e.target.value,
										})
									}
								>
									{IndianStates.map((state) => (
										<MenuItem key={state} value={state}>
											{state}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<TextField
								label="Country"
								value={address.country}
								onChange={(e) =>
									setAddress({
										...address,
										country: e.target.value,
									})
								}
								fullWidth
								margin="normal"
							/>
							<TextField
								label="Pincode"
								value={address.pincode}
								onChange={(e) =>
									setAddress({
										...address,
										pincode: e.target.value,
									})
								}
								fullWidth
								margin="normal"
							/>
						</Box>
						<FormControl fullWidth sx={{ mt: 2 }}>
							<InputLabel>Medicine</InputLabel>
							<Select
								multiple
								value={selectedMedicines}
								label="Medicine"
								onChange={(e) =>
									setSelectedMedicines(e.target.value)
								}
								renderValue={(selected) => (
									<div>
										{selected.map((value) => (
											<Chip
												key={value}
												label={getMedicineName(value)}
											/>
										))}
									</div>
								)}
							>
								{medicines?.map((medicine) => (
									<MenuItem
										key={medicine._id}
										value={medicine._id}
									>
										{medicine.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleSave} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			<InventoryTable />
		</Box>
	);
};

export default InventoriesPage;

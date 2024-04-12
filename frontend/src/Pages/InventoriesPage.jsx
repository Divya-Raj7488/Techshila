import React, { useEffect, useState } from "react";
import useGetUser from "../utils/useGetUser";

import {
	Button,
	Dialog,
	DialogActions,
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
	updateManager,
} from "../Slices/inventorySlice";
import InventoryTable from "../Components/Inventory/InventoryTable";

const InventoriesPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getManagers());
		dispatch(getInventories());
	}, []);

	const [open, setOpen] = useState(false);
	const [selectedManager, setSelectedManager] = useState();
	const [selectedInventory, setSelectedInventory] = useState();
	const [address, setAddress] = useState({
		houseName: "",
		locality: "",
		city: "",
		state: "India",
		pincode: "",
	});
	const [medicineName, setMedicineName] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	

	const handleSave = () => {
		const data = {
			managerId: selectedManager,
			inventoryId: selectedInventory,
		};
		dispatch(updateManager(data));
		handleClose();
	};
	const inventories = useSelector((state) => state.inventory.inventorysList);
	const managers = useSelector((state) => state.manager.managersList);
	useGetUser();
	const user = useSelector((state) => state.user.userLoggedIn);
	const role = user?.role;
	useEffect(() => {
		if (role === "user") window.location.href = "/login";
	}, [role]);

	useEffect(() => {
		dispatch(getManagers());
		if (user?.email) dispatch(getInventories({ email: user?.email }));
	}, [user]);

	return (
		<Box
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
						<FormControl fullWidth sx={{ mt: 2 }}>
							<InputLabel>Manager</InputLabel>
							<Select
								value={selectedManager}
								label="Manager"
								onChange={(e) =>
									setSelectedManager(e.target.value)
								}
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
						<FormControl fullWidth sx={{ mt: 2 }}>
							<InputLabel>Inventory</InputLabel>
							<Select
								value={selectedInventory}
								label="Inventory"
								onChange={(e) =>
									setSelectedInventory(e.target.value)
								}
							>
								{inventories?.map((inventory) => (
									<MenuItem
										key={inventory._id}
										value={inventory._id}
									>
										{inventory.inventoryName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Box sx={{ mt: 2 }}>
							<Typography variant="subtitle1">
								Address
							</Typography>
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
								label="State"
								value={address.state}
								onChange={(e) =>
									setAddress({
										...address,
										state: e.target.value,
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
						<TextField
							label="Medicine Name"
							value={medicineName}
							onChange={(e) => setMedicineName(e.target.value)}
							fullWidth
							margin="normal"
							sx={{ mt: 2 }}
						/>
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
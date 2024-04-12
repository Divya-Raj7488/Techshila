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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [selectedManager, setSelectedManager] = useState();
	const [selectedInventory, setSelectedInventory] = useState();

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
					<DialogTitle>Add a Inventory</DialogTitle>
					<Box sx={{ px: 4, py: 3, width: "400px" }}>
						<FormControl fullWidth>
							<InputLabel>Manager</InputLabel>
							<Select
								value={selectedManager}
								label="Manager"
								onChange={(e) => {
									setSelectedManager(e.target.value);
								}}
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
						<FormControl fullWidth style={{ marginTop: "20px" }}>
							<InputLabel>Inventory</InputLabel>
							<Select
								value={selectedInventory}
								label="Inventory"
								onChange={(e) => {
									setSelectedInventory(e.target.value);
								}}
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
					</Box>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleSave}>Save</Button>
					</DialogActions>
				</Dialog>
			</div>
			<InventoryTable />
		</Box>
	);
};

export default InventoriesPage;

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AppBar,
	Box,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { resetInventory, setDialogOpen } from "../../Slices/inventorySlice";
import ManagerCard from "./ManagerCard";
import StockTable from "../Suppliers/StockTable";
import CurrentOrdersTable from "../StoreManager/orderTable";
import { getMedicine } from "../../Slices/medicineSlice";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direcxtion="up" ref={ref} {...props} />;
});

const InventoryDialog = () => {
	const dispatch = useDispatch();
	const open = useSelector((state) => state.inventory.open);
	const inventory = useSelector((state) => state.inventory.selectedInventory);
	const managers = inventory?.manager;
	const inventoryMedicines = useSelector(
		(state) => state.medicine.selectedMedicine
	);
	const paramRef = useRef();

	const handleClose = () => {
		console.log("$$$$$$$$");
		dispatch(setDialogOpen());
		dispatch(resetInventory());
	};

	useEffect(() => {
		if (inventory?._id) dispatch(getMedicine(inventory?._id));
	}, [inventory]);

	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography
						fontFamily={"Poppins"}
						sx={{ ml: 2, flex: 1 }}
						variant="h6"
						component="div"
					>
						{inventory?.inventoryName}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box p={2}>
				<Typography fontFamily={"Poppins"} variant="h6">
					Store Managers
				</Typography>
				<Box
					ref={paramRef}
					sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}
				>
					{managers?.map((param, id) => (
						<ManagerCard key={id} manager={param} />
					))}
				</Box>
			</Box>
			<Box p={2}>
				<Typography fontFamily={"Poppins"} variant="h6">
					Medicines
				</Typography>
			</Box>
			<Box p={2}>
				<StockTable medicines={inventoryMedicines} />

				<Typography p={3} variant="h4" fontFamily={"Poppins"}>
					Current Orders
				</Typography>

				{/* Render the OrderTable component */}
				<CurrentOrdersTable inventoryId={inventory?._id} />
			</Box>
		</Dialog>
	);
};

export default InventoryDialog;

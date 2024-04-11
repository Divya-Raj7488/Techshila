import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AppBar,
	Box,
	Button,
	Collapse,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { setDialogOpen } from "../../Slices/inventorySlice";
import ManagerCard from "./ManagerCard";
import { managers } from "../../dummy";
import StockTable from "../Suppliers/StockTable";

const InventoryDialog = () => {
	const dispatch = useDispatch();
	const open = useSelector((state) => state.inventory.open);
	// const managers = useSelector((state) => state.manager.managersList);
	// const inventory = useSelector((state) => state.inventory.selectedInventory);
	const inventory = useSelector((state) => state.inventory.selectedInventory);
	const paramRef = useRef();

	const handleClose = () => {
		dispatch(setDialogOpen());
	};

	const Transition = forwardRef(function Transition(props, ref) {
		return <Slide direcxtion="up" ref={ref} {...props} />;
	});

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
						{inventory?.name}
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
				<StockTable />
			</Box>
		</Dialog>
	);
};

export default InventoryDialog;

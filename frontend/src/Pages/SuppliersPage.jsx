import React, { useEffect, useState } from "react";
import SupplierTable from "../Components/Suppliers/SupplierTable";
import {useSelector} from 'react-redux'

import {
	Button,
	Dialog,
	DialogTitle,
	Typography,
	DialogActions,
	Box,
} from "@mui/material";
import AddSupplier from "./AddSupplierPage";
import useGetUser from "../utils/useGetUser";
const SuppliersPage = () => {
	const postOrder = () => {
		alert("Order sent!");
	};

	const [open, setOpen] = useState(false);
	const [selectedManager, setSelectedManager] = useState();
	const [selectedInventory, setSelectedInventory] = useState();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleSave = () => {
		handleClose();
	};
	//for hiding from user.
	const [showSendOrderButton, setShowSendOrderButton] = useState(true); // State to control the visibility of the "Send Order" button
  
useGetUser()
	const user = useSelector((state) => state.user.userLoggedIn)
	const role = user?.role
	useEffect(() => {
		if(role === 'user')
		window.location.href = '/user';
	},[role]);

    useEffect(() => {
		
    

    // Logic to hide the "Send Order" button if the user role is CEO
    const showSendOrderButton = role !== 'ceo';
    setShowSendOrderButton(showSendOrderButton);
	},[role]);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Suppliers
			</Typography>
			<Button
				variant="contained"
				sx={{ m: 2, marginLeft: "auto" }}
				onClick={handleClickOpen}
			>
				Add Suppliers
			</Button>
			<Dialog maxWidth="md" open={open} onClose={handleClose}>
				<DialogTitle>Add a Supplier</DialogTitle>
				<AddSupplier />
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
			<SupplierTable />
			<Button
				variant="contained"
				sx={{ m: 2, marginLeft: "auto" }}
				onClick={postOrder}
				style={{ display: showSendOrderButton ? 'block' : 'none' }}
			>
				Send Order
			</Button>
		</Box>
	);
};

export default SuppliersPage;

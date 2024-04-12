import React, { useEffect, useState } from "react";
import SupplierTable from "../Components/Suppliers/SupplierTable";

import { Button, Dialog, DialogTitle, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AddSupplier from "./AddSupplierPage";
import useGetUser from "../utils/useGetUser";

import { getSummary } from "../Slices/cartSlice";
import OrderSummaryDialog from "../Components/Cart/OrderSummaryDialog";
import { setOrderDialog } from "../Slices/cartSlice";

const SuppliersPage = () => {
	const dispatch = useDispatch();
	useGetUser();
	const items = useSelector((state) => state.cart.items);

	const sendOrder = () => {
		if (items && items.length > 0) {
			dispatch(getSummary({ stocks: items })).then(() =>
				dispatch(setOrderDialog(true))
			);
		}
	};

	const [open, setOpen] = useState(false);
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

	useGetUser();
	const user = useSelector((state) => state.user.userLoggedIn);
	const role = user?.role;
	useEffect(() => {
		if (role === "user") window.location.href = "/user";
	}, [role]);

	useEffect(() => {
		// Logic to hide the "Send Order" button if the user role is CEO
		const showSendOrderButton = role !== "ceo";
		setShowSendOrderButton(showSendOrderButton);
	}, [role]);

	return (
		<Box ml={40} mt={2} mr={10}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Suppliers
			</Typography>
			{/* <Button
				variant="contained"
				sx={{ m: 2, marginLeft: "auto" }}
				onClick={handleClickOpen}
			>
				Add Suppliers
			</Button> */}
			<Dialog maxWidth="md" open={open} onClose={handleClose}>
				<DialogTitle>Add a Supplier</DialogTitle>
				<AddSupplier />
			</Dialog>
			<SupplierTable />
			{items && items.length > 0 && (
				<Button
					variant="contained"
					sx={{ m: 2, marginLeft: "auto" }}
					onClick={sendOrder}
				>
					Send Order
				</Button>
			)}
			<OrderSummaryDialog />
		</Box>
	);
};

export default SuppliersPage;

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AppBar,
	Box,
	Button,
	Collapse,
	IconButton,
	Dialog,
	Slide,
	Typography,
	Toolbar,
	Card,
	CardContent,
	Grid,
	Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { createOrder, setOrderDialog } from "../../Slices/cartSlice";
import useGetUser from "../../utils/useGetUser";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direcxtion="up" ref={ref} {...props} />;
});

const OrderSummaryDialog = () => {
	useGetUser();
	const dispatch = useDispatch();
	const open = useSelector((state) => state.cart.open);
	const items = useSelector((state) => state.cart.items);
	const userId = useSelector((state) => state.user?.userLoggedIn?._id);
	const totalAmount = useSelector((state) => state.cart.totalPrice);
	const handleClose = () => {
		dispatch(setOrderDialog());
	};

	const confirmOrder = () => {
		dispatch(
			createOrder({
				stocksData: items,
				userId: userId,
				totalAmount: totalAmount,
			})
		).then(() => dispatch(setOrderDialog()));
	};

	const orderedItems = useSelector((state) => state.cart.summary);
	const amount = useSelector((state) => state.cart.totalPrice);
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
						Order Summary
					</Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<Typography variant="h4" gutterBottom>
					Bill Summary
				</Typography>
				<Grid container spacing={2}>
					{orderedItems.map((item, index) => (
						<Grid item xs={12} key={index}>
							<Card>
								<CardContent>
									<Typography variant="h6">
										{item.name}
									</Typography>
									<Typography variant="body1">
										Type: {item.type}
									</Typography>
									<Typography variant="body1">
										Price: ${item.price}
									</Typography>
									<Typography variant="body1">
										Quantity: {item.quantity}
									</Typography>
									<Typography variant="body1">
										Total Amount: ${item.totalAmount}
									</Typography>
									<Typography variant="body1">
										Supplier: {item.supplierName}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
				<Typography
					variant="h5"
					gutterBottom
					style={{ marginTop: "1rem" }}
				>
					Total Price: Rs. {amount}
				</Typography>
				<Button variant="contained" onClick={confirmOrder}>
					Confirm Order
				</Button>
			</Container>
		</Dialog>
	);
};

export default OrderSummaryDialog;

import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@mui/material";
import StepperDialog from "../StoreManager/Stepper";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryOrders } from "../../Slices/orderSlice";
import useGetUser from "../../utils/useGetUser";
import { getInventory } from "../../Slices/inventorySlice";
import OrderSummary from "../OrderStatus/orderstatus";

const CurrentOrdersTable = () => {
	useGetUser();
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null); // To store the selected order
	const dispatch = useDispatch();
	const inventory = useSelector((state) => state.inventory.selectedInventory);
	const user = useSelector((state) => state.user.userLoggedIn);

	useEffect(() => {
		if (user?.email) dispatch(getInventory({ email: user.email }));
	}, [user]);

	useEffect(() => {
		console.log(inventory);
		if (inventory?._id) dispatch(getInventoryOrders(inventory?._id));
	}, [inventory]);

	const orders = useSelector((state) => state.order.ordersList) || [];
	const handleClickRow = (order) => {
		setSelectedOrder(order);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	return (
		<div>
			<OrderSummary />
			{/* <TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Order id</TableCell>
							<TableCell>Customer Name</TableCell>
							<TableCell>Medicine Type</TableCell>
							<TableCell>Order Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders?.map((order) => (
							<TableRow
								key={order.id}
								onClick={() => handleClickRow(order)}
								style={{ cursor: "pointer" }}
							>
								<TableCell>{order.id}</TableCell>
								<TableCell>{order.customerName}</TableCell>
								<TableCell>{order.medicineType}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color={
											order.status === "pending"
												? "secondary"
												: "primary"
										}
									>
										{order.status}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer> */}

			{/* Dialog for displaying details */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>Track Order</DialogTitle>
				<DialogContent>
					<StepperDialog />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default CurrentOrdersTable;

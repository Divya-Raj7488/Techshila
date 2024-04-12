import React, { useState } from "react";
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

const CurrentOrdersTable = ({ inventoryId }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null); // To store the selected order
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getInventoryOrders(inventoryId));
	}, []);

	const orders = useSelector((state) => state.order.ordersList);

	const handleClickRow = (order) => {
		setSelectedOrder(order);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	return (
		<div>
			<TableContainer>
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
						{orders.map((order) => (
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
			</TableContainer>

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

import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	Tabs,
	Tab,
	Collapse,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { getUsersOrders } from "../../Slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import useGetUser from "../../utils/useGetUser";

const calculateTotalPrice = (medicines) => {
	let amount = 0;
	medicines?.map(
		(medicine) => (amount += medicine.quantity * medicine.price)
	);
	return amount;
};

const OrderSummary = () => {
	useGetUser();
	const user = useSelector((state) => state.user.userLoggedIn);
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.order.ordersList);

	const orderCurrent = orders?.filter(
		(order) => order.orderStatus !== "delivered"
	);
	const orderPast = orders?.filter(
		(order) => order.orderStatus === "delivered"
	);
	useEffect(() => {
		if (user?._id) dispatch(getUsersOrders(user._id));
	}, [user, dispatch]);

	const [selectedTab, setSelectedTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	const getOrderData = () => {
		return selectedTab === 0 ? orderCurrent : orderPast;
	};

	const [openRow, setOpenRow] = useState(null);

	return (
		<Box>
			<Tabs
				value={selectedTab}
				onChange={handleTabChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Current Order" />
				<Tab label="Past Order" />
			</Tabs>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell>Order Id</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Items Ordered</TableCell>
							<TableCell>Total Price</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{getOrderData()?.map((order) => (
							<React.Fragment key={order._id}>
								<TableRow
									onClick={() =>
										setOpenRow(
											openRow === order._id
												? null
												: order._id
										)
									}
								>
									<TableCell>{order._id}</TableCell>
									<TableCell>{order?.createdAt}</TableCell>
									<TableCell>{order.orderStatus}</TableCell>
									<TableCell>
										{order.orderDetails?.length}
									</TableCell>
									<TableCell>
										{calculateTotalPrice(
											order?.orderDetails
										)}
									</TableCell>
								</TableRow>
								<Collapse
									in={openRow === order._id}
									timeout="auto"
									unmountOnExit
								>
									<TableRow>
										<TableCell colSpan={16}>
											<List>
												{order.orderDetails?.map(
													(item) => (
														<ListItem
															key={item._id}
														>
															<ListItemText
																primary={
																	item.medicineName
																}
																secondary={`Quantity: ${item.quantity}, Price: ${item.price}`}
															/>
														</ListItem>
													)
												)}
											</List>
										</TableCell>
									</TableRow>
								</Collapse>
							</React.Fragment>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default OrderSummary;

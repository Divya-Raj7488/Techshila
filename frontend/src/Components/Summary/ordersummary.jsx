import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	Card,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	TextField,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { useSelector } from "react-redux";

const calculateTotalPrice = (medicines) => {
	let amount = 0;
	medicines?.map(
		(medicine) => (amount += medicine.quantity * medicine.price)
	);
	return amount;
};

const OrderSummary = () => {
	const navigate = useNavigate();

	const order = useSelector((state) => state.order.selectedOrder);
	const orderSummary = order?.orderDetails;
	console.log(orderSummary);
	const status = order?.orderStatus;
	// Calculate total amount
	const totalAmount = calculateTotalPrice(orderSummary);

	const [open, setOpen] = useState(false);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		contactNumber: "",
		address: "",
		cardNumber: "",
		expiryMonth: "",
		expiryYear: "",
		cvv: "",
		bank: "",
	});
	const [orderPlaced, setOrderPlaced] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handlePaymentMethodSelect = (method) => {
		setSelectedPaymentMethod(method);
	};

	const handleOk = () => {
		console.log("Redirecting...");
		setOrderPlaced(false);
		navigate("/orderstatus");
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = () => {
		// Handle form submission here
		console.log("Form submitted:", formData);
		setOpen(false);
		setOrderPlaced(true);
	};

	return (
		<Box ml={40} mt={2} mr={10}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "100vh",
				position: "relative",
				backgroundColor: "#f5f5f5",
				padding: "20px",
			}}
		>
			<Card
				elevation={3}
				sx={{ backgroundColor: "#fff", width: "100%", maxWidth: 900 }}
			>
				<CardContent sx={{ padding: 3 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ fontFamily: "Poppins", marginBottom: 2 }}
					>
						Order Summary
					</Typography>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Order ID
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Medicine Name
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Status
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Inventory
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Quantity
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Amount
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orderSummary?.map((order) => (
									<TableRow key={order._id}>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											{order._id}
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											{order.medicineName}
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											{status}
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											{order.inventoryId}
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											{order.quantity}
										</TableCell>
										<TableCell
											sx={{ fontFamily: "Poppins" }}
										>
											${order.price}
										</TableCell>
									</TableRow>
								))}
								<TableRow>
									<TableCell colSpan={5}>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											Total Amount
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											sx={{
												fontWeight: "bold",
												fontFamily: "Poppins",
											}}
										>
											${totalAmount}
										</Typography>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
			<Box mt={2} width="100%" display="flex" justifyContent="center">
				<Button
					variant="contained"
					color="primary"
					size="large"
					sx={{ width: "100%", maxWidth: 900 }}
					onClick={handleClickOpen}
				>
					Select Payment Method
				</Button>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Select Payment Method</DialogTitle>
				<DialogContent
					sx={{ backgroundColor: "#f5f5f5", paddingBottom: "20px" }}
				>
					<DialogContentText>
						Choose your preferred payment method and proceed with
						the payment.
					</DialogContentText>
					<List>
						<ListItem
							button
							onClick={() =>
								handlePaymentMethodSelect("Credit Card")
							}
							sx={{ backgroundColor: "#fff" }}
						>
							<ListItemIcon>
								<CreditCardIcon />
							</ListItemIcon>
							<ListItemText primary="Credit Card" />
						</ListItem>
						<ListItem
							button
							onClick={() =>
								handlePaymentMethodSelect("Debit Card")
							}
							sx={{ backgroundColor: "#fff" }}
						>
							<ListItemIcon>
								<CreditCardOutlinedIcon />
							</ListItemIcon>
							<ListItemText primary="Debit Card" />
						</ListItem>
						<ListItem
							button
							onClick={() =>
								handlePaymentMethodSelect("Net Banking")
							}
							sx={{ backgroundColor: "#fff" }}
						>
							<ListItemIcon>
								<AccountBalanceIcon />
							</ListItemIcon>
							<ListItemText primary="Net Banking" />
						</ListItem>
					</List>
					{selectedPaymentMethod === "Credit Card" && (
						<>
							<Typography
								variant="h6"
								gutterBottom
								sx={{ mt: 2 }}
							>
								PayU - Card Payment
							</Typography>
							<TextField
								name="cardNumber"
								label="Card Number"
								variant="outlined"
								fullWidth
								margin="normal"
								value={formData.cardNumber}
								onChange={handleInputChange}
							/>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<TextField
										name="expiryMonth"
										label="Expiry Month"
										variant="outlined"
										fullWidth
										margin="normal"
										value={formData.expiryMonth}
										onChange={handleInputChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name="expiryYear"
										label="Expiry Year"
										variant="outlined"
										fullWidth
										margin="normal"
										value={formData.expiryYear}
										onChange={handleInputChange}
									/>
								</Grid>
							</Grid>
							<TextField
								name="cvv"
								label="CVV"
								variant="outlined"
								fullWidth
								margin="normal"
								value={formData.cvv}
								onChange={handleInputChange}
							/>
						</>
					)}
					{(selectedPaymentMethod === "Debit Card" ||
						selectedPaymentMethod === "Net Banking") && (
						<FormControl fullWidth margin="normal">
							<InputLabel>Bank</InputLabel>
							<Select
								value={formData.bank}
								onChange={handleInputChange}
								name="bank"
								variant="outlined"
							>
								<MenuItem value="ICICI">ICICI Bank</MenuItem>
								<MenuItem value="HDFC">HDFC Bank</MenuItem>
								<MenuItem value="SBI">
									State Bank of India
								</MenuItem>
								<MenuItem value="AXIS">Axis Bank</MenuItem>
							</Select>
						</FormControl>
					)}
					<Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
						General Information (for PayU)
					</Typography>
					<TextField
						name="fullName"
						label="Full Name"
						variant="outlined"
						fullWidth
						margin="normal"
						value={formData.fullName}
						onChange={handleInputChange}
					/>
					<TextField
						name="email"
						label="Email"
						variant="outlined"
						fullWidth
						margin="normal"
						value={formData.email}
						onChange={handleInputChange}
					/>
					<TextField
						name="contactNumber"
						label="Contact Number"
						variant="outlined"
						fullWidth
						margin="normal"
						value={formData.contactNumber}
						onChange={handleInputChange}
					/>
					<TextField
						name="address"
						label="Address"
						variant="outlined"
						fullWidth
						margin="normal"
						value={formData.address}
						onChange={handleInputChange}
					/>
				</DialogContent>
				<DialogActions sx={{ backgroundColor: "#f5f5f5" }}>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleFormSubmit} color="primary">
						Confirm Payment
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={orderPlaced} onClose={handleOk}>
				<DialogTitle>Order Placed</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Your order has been successfully placed!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleOk} color="primary">
						OK
					</Button>
				</DialogActions>
			</Dialog>
			{/* {redirect && <Redirect to="/" />} */}
		</Box>
	);
};
export default OrderSummary;

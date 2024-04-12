import React, { Fragment, useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	TextField,
	Snackbar,
	Button,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StockRow from "./StockRow";
import { closeSnackbar } from "../../Slices/cartSlice";

const FilteredTable = ({ filteredStocks }) => {
	const handleSnackbarClose = () => {
		dispatch(closeSnackbar());
	};
	const snackbarOpen = useSelector((state) => state.cart.snackbarOpen);
	const snackbarMsg = useSelector((state) => state.cart.snackbarMsg);
	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Supplier
							</TableCell>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Medicine
							</TableCell>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Type
							</TableCell>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Quantity
							</TableCell>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Expiry Date
							</TableCell>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Price
							</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredStocks?.map((med) => (
							<StockRow key={med.ID} med={med} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				message={snackbarMsg}
			/>
		</>
	);
};

const StockTable = ({ medicines }) => {
	const dispatch = useDispatch();
	const fetchedList = useSelector((state) => state.stock);

	const presentMedicines = medicines.filter(
		(medicine) => medicine.quantity > 0
	);
	const expiredMedicines = medicines.filter(
		(medicine) => new Date(medicine.expiryDate) < new Date()
	);
	const outOfStockMedicines = medicines.filter(
		(medicine) => medicine.quantity === 0
	);

	useEffect(() => {
		if (!medicines) {
			dispatch(getStocks());
		}
	}, [fetchedList]);

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const filteredStocks = medicines?.filter((stock) =>
		stock.name.toLowerCase().includes(searchTerm)
	);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box>
			<Box>
				<TextField
					fullWidth
					label="Search by Medicine Name"
					variant="outlined"
					onChange={handleSearchChange}
				/>
			</Box>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Present Medicines" />
				<Tab label="Expired Medicines" />
				<Tab label="Out of Stock Medicines" />
			</Tabs>
			<Typography component="div" hidden={value !== 0}>
				<FilteredTable filteredStocks={presentMedicines} />
			</Typography>
			<Typography component="div" hidden={value !== 1}>
				<FilteredTable filteredStocks={expiredMedicines} />
			</Typography>
			<Typography component="div" hidden={value !== 2}>
				<FilteredTable filteredStocks={outOfStockMedicines} />
			</Typography>
			<Button
				variant="contained"
				sx={{ m: 2, marginLeft: "auto" }}
				// onClick={ postOrder}
			>
				Send Order
			</Button>
		</Box>
	);
};

export default StockTable;

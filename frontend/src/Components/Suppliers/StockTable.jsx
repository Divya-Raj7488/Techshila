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
	Dialog,
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import StockRow from "./StockRow";
import { closeSnackbar } from "../../Slices/cartSlice";
import { getStocks } from "../../Slices/stockSlice";
import { getMedicines } from "../../Slices/medicineSlice";
import useGetManagerInventory from "../../utils/useGetManagerInventory";
import { updateMedicineToInventory } from "../../Slices/inventorySlice";

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
							<StockRow key={med?._id} med={med} />
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
	const user = useSelector((state) => state.user.userLoggedIn);
	const dispatch = useDispatch();
	if (user.role === "manager") {
		useGetManagerInventory();
	}

	const presentMedicines = medicines?.filter(
		(medicine) => medicine.quantity > 0
	);
	const expiredMedicines = medicines?.filter(
		(medicine) => new Date(medicine.expiryDate) < new Date()
	);
	const outOfStockMedicines = medicines?.filter(
		(medicine) => medicine.quantity === 0
	);
	const medicineOptions = useSelector(
		(state) => state.medicine.medicinesList
	);

	const [searchTerm, setSearchTerm] = useState("");
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
		dispatch(getMedicines());
	};
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const [value, setValue] = useState(0);
	const [selectedMedicines, setSelectedMedicines] = useState([]);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const inventoryId =
		user.role === "ceo"
			? useSelector((state) => state.inventory?.selectedInventory?._id)
			: useSelector(
					(state) => state.inventory?.selectedInventory[0]?._id
			  );

	const getMedicineName = (medicineId) => {
		const medicine = medicineOptions.find(
			(medicine) => medicine._id === medicineId
		);
		return medicine ? medicine.name : "";
	};

	const handleAdd = () => {
		dispatch(
			updateMedicineToInventory({
				medicineIds: selectedMedicines,
				inventoryId: inventoryId,
			})
		);
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
			{user.role !== "ceo" ? (
				<Button
					variant="contained"
					sx={{ m: 2, marginLeft: "auto" }}
					// onClick={ postOrder}
				>
					Send Order
				</Button>
			) : (
				<>
					<Button
						variant="contained"
						sx={{ m: 2 }}
						onClick={handleOpen}
					>
						Add medicines
					</Button>
					<Dialog open={open} onClose={handleClose}>
						<Box p={2} minWidth={"30rem"}>
							<FormControl fullWidth sx={{ mt: 2 }}>
								<InputLabel>Medicine</InputLabel>
								<Select
									multiple
									value={selectedMedicines}
									label="Medicine"
									onChange={(e) =>
										setSelectedMedicines(e.target.value)
									}
									renderValue={(selected) => (
										<div>
											{selected.map((value) => (
												<Chip
													key={value}
													label={getMedicineName(
														value
													)}
												/>
											))}
										</div>
									)}
								>
									{medicineOptions?.map((medicine) => (
										<MenuItem
											key={medicine._id}
											value={medicine._id}
										>
											{medicine.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<Button
								variant="contained"
								sx={{ m: 2, marginLeft: "auto" }}
								onClick={handleAdd}
							>
								Add
							</Button>
						</Box>
					</Dialog>
				</>
			)}
		</Box>
	);
};

export default StockTable;

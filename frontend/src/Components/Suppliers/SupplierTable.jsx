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
	TextField,
	Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import SupplierRow from "./SupplierRow";
import { closeSnackbar } from "../../Slices/cartSlice";
import { suppliers } from "../../dummy";

const SupplierTable = () => {
	const dispatch = useDispatch();
	const fetchedList = useSelector((state) => state.supplier);
	// const suppliers = fetchedList.suppliersList;

	useEffect(() => {
		if (!suppliers) {
			dispatch(getSuppliers());
		}
	}, [fetchedList]);

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const filteredSuppliers = suppliers?.filter((supplier) =>
		supplier.name.toLowerCase().includes(searchTerm)
	);
	const handleSnackbarClose = () => {
		dispatch(closeSnackbar());
	};
	const snackbarOpen = useSelector((state) => state.cart.snackbarOpen);
	const snackbarMsg = useSelector((state) => state.cart.snackbarMsg);

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ padding: 2 }}>
				<TextField
					fullWidth
					label="Search by Supplier Name"
					variant="outlined"
					onChange={handleSearchChange}
				/>
			</Box>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Name
							</TableCell>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Email ID
							</TableCell>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Phone Number
							</TableCell>
							<TableCell sx={{ fontFamily: "Poppins" }}>
								Joining Date
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredSuppliers?.map((row) => (
							<SupplierRow key={row.ID} row={row} />
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
		</Box>
	);
};

export default SupplierTable;

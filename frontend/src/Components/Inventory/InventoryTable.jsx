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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getInventories } from "../../Slices/inventorySlice";
import InventoryRow from "./InventoryRow";
import { inventories } from "../../dummy";

const InventoryTable = () => {
	const dispatch = useDispatch();
	const fetchedList = useSelector((state) => state.inventory);
	// const inventories = fetchedList.inventoriesList;

	useEffect(() => {
		if (!inventories) {
			dispatch(getInventories());
		}
	}, [fetchedList]);

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const filteredInventories = inventories?.filter((inventory) =>
		inventory.name.toLowerCase().includes(searchTerm)
	);

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ padding: 2 }}>
				<TextField
					fullWidth
					label="Search by Inventory Name"
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
							<TableCell
								sx={{ fontFamily: "Poppins" }}
								align="right"
							>
								Location
							</TableCell>
							<TableCell
								sx={{ fontFamily: "Poppins" }}
								align="right"
							>
								Today's Revenue
							</TableCell>
							<TableCell
								sx={{ fontFamily: "Poppins" }}
								align="right"
							>
								Current Month's Revenue
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredInventories?.map((row) => (
							<InventoryRow key={row.ID} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default InventoryTable;

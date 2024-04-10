import React from "react";
import SupplierTable from "../Components/Suppliers/SupplierTable";
import { Box } from "@mui/system";

import { Button, Typography, AppBar } from "@mui/material";
const SuppliersPage = () => {
	const postOrder = () => {
		alert("Order sent!");
	};
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Suppliers
			</Typography>
			<SupplierTable />
			<Button
				variant="contained"
				sx={{ m: 2, marginLeft: "auto" }}
				onClick={postOrder}
			>
				Send Order
			</Button>
		</Box>
	);
};

export default SuppliersPage;

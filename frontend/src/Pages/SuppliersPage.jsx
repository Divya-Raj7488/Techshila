import React from "react";
import SupplierTable from "../Components/Suppliers/supplierTable";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
const SuppliersPage = () => {
	return (
		<Box>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Suppliers
			</Typography>
			<SupplierTable />
		</Box>
	);
};

export default SuppliersPage;

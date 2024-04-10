import React from "react";
import StockTable from "../Components/Suppliers/StockTable";
import { Box } from "@mui/system";

import { Button, Typography } from "@mui/material";
const StocksPage = () => {
	return (
		<Box
			sx={{
				px: 4,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Typography py={3} variant="h4" fontFamily={"Poppins"}>
				Stocks
			</Typography>
			<StockTable />
		</Box>
	);
};

export default StocksPage;

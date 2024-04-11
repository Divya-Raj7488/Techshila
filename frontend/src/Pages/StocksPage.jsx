import React, { useEffect, useState } from "react";
import StockTable from "../Components/Suppliers/StockTable";
import { Box } from "@mui/system";
import {useSelector} from 'react-redux'
import useGetUser from "../utils/useGetUser";

import { Button, Typography } from "@mui/material";
const StocksPage = () => {

	useGetUser()
	const user = useSelector((state) => state.user.userLoggedIn)
	const role = user?.role
	useEffect(() => {
		if(role === 'user')
		window.location.href = '/user';
	},[role])

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

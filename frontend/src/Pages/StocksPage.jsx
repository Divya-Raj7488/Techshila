import React, { useEffect, useState } from "react";
import StockTable from "../Components/Suppliers/StockTable";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import useGetUser from "../utils/useGetUser";

import { Button, Typography } from "@mui/material";
import { getMedicine } from "../Slices/medicineSlice";
import useGetManagerInventory from "../utils/useGetManagerInventory";

const StocksPage = () => {
	useGetManagerInventory();
	const dispatch = useDispatch();
	useGetUser();

	const user = useSelector((state) => state.user.userLoggedIn);
	const role = user?.role;
	useEffect(() => {
		if (role === "user") window.location.href = "/user";
	}, [role]);

	const inventory = useSelector((state) => state.inventory.selectedInventory);

	useEffect(() => {
		if (inventory?._id) dispatch(getMedicine(inventory?._id));
	}, [inventory]);

	const inventoryMedicines = useSelector(
		(state) => state.medicine.selectedMedicine
	);

	return (
		<Box
			sx={{
				px: 4,
				display: "flex",
				flexDirection: "column",
			}}
		>
			{inventory ? (
				<>
					<Typography py={3} variant="h4" fontFamily={"Poppins"}>
						Stocks
					</Typography>
					<StockTable medicines={inventoryMedicines} />
				</>
			) : (
				<Typography
					py={3}
					variant="h4"
					fontFamily={"Poppins"}
					sx={{ textAlign: "center" }}
				>
					No Store assigned
				</Typography>
			)}
		</Box>
	);
};

export default StocksPage;

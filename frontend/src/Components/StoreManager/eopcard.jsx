import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { getInventoryOrders } from "../../Slices/orderSlice";

const findExpiredDrugs = (medicines) => {
	const currentDate = new Date();
	const expiredDrugs = medicines?.filter((medicine) => {
		const expiryDate = new Date(medicine.expiryDate);
		return expiryDate < currentDate;
	});
	return expiredDrugs?.length;
};

const InventoryCard = () => {
	const dispatch = useDispatch();
	const inventory = useSelector((state) => state.inventory.selectedInventory);
	const medicines = useSelector(
		(state) => state.inventory.inventoryMedicines
	);
	const orders = useSelector((state) => state.inventory.inventoryOrders);

	useEffect(() => {
		if (inventory?._id) dispatch(getInventoryOrders(inventory?._id));
	}, [inventory]);

	const data = [
		{
			heading: "Medicine Sales",
			content: inventory?.currentMonthRevenue,
		},
		{
			heading: "Medicines List",
			content: medicines?.length,
		},
		{
			heading: "Expired Drugs",
			content: findExpiredDrugs(medicines),
		},
		{
			heading: "Amount Payable",
			content: inventory?.amountPayable || 0,
		},
		{
			heading: "Transaction Today",
			content: inventory?.transactionToday || 0,
		},
		{
			heading: "No. of Orders in current Month",
			content: orders?.length,
		},
	];

	return (
		<>
			<Typography p={6} variant="h4" fontFamily={"Poppins"}>
				{inventory?.inventoryName}
			</Typography>
			<Grid sx={{ pl: 6 }} container spacing={2}>
				{data.map((item) => (
					<Grid item>
						<Stack
							direction="row"
							divider={
								<Divider orientation="vertical" flexItem />
							}
							spacing={2}
						>
							<Card sx={{ width: "100%", marginBottom: 5 }}>
								<CardContent>
									<Typography gutterBottom variant="h5">
										{item.heading}
									</Typography>
									<Typography variant="body2">
										{item.content}
									</Typography>
								</CardContent>
							</Card>
						</Stack>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default InventoryCard;

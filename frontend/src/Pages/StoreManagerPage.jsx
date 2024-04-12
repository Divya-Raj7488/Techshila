import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import OrderTable from "../Components/StoreManager/orderTable";
import InventoryCard from "../Components/StoreManager/eopcard";
import { useSelector } from "react-redux";
import useGetUser from "../utils/useGetUser";

const StoreManagerPage = () => {
	useGetUser();
	const user = useSelector((state) => state.user.userLoggedIn);
	const role = user?.role;
	useEffect(() => {
		if (role === "user") window.location.href = "/user";
	}, [role]);

	return (
		<>
			<Box ml={40} mt={2} mr={10}>
				<Typography
					p={5}
					variant="h4"
					fontFamily={"Poppins"}
					style={{ marginBottom: "20px", paddingLeft: "0px" }}
				>
					Business-Details
				</Typography>

				<Grid container spacing={3}>
					{/* <Grid item xs={3}>
			{console.log(data)} */}
					<InventoryCard />
					{/* </Grid> */}

					<Grid item xs={12}>
						<Typography p={3} variant="h4" fontFamily={"Poppins"}>
							Current Orders
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography
							p={3}
							variant="h4"
							fontFamily={"Poppins"}
							style={{ paddingLeft: "0px" }}
						>
							Current Orders
						</Typography>
					</Grid>

					<Grid item xs={12}>
						{/* Render the OrderTable component */}
						<OrderTable />
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default StoreManagerPage;

import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Search from "../Components/User/search";
import { useNavigate } from "react-router-dom";
import useGetUser from "../utils/useGetUser";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { sendOrder } from "../Slices/orderSlice";
// import LocationComponent from '../Components/User/currentLocation';

const UserPage = () => {
	useGetUser();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.userLoggedIn);
	const order = useSelector((state) => state.order.selectedOrder);

	const role = user?.role;
	useEffect(() => {
		if (role === "ceo") window.location.href = "/inventories";
	}, [role]);

	const items = useSelector((state) => state.cart.items);

	return (
		<Box ml={40} mt={2} mr={10}>
			<Typography p={4} variant="h4" fontFamily={"Poppins"}>
				User-Search Page
			</Typography>

			<Search />
			{items && items.length > 0 && (
				<Button
					sx={{
						display: "block",
						marginLeft: "auto",
						marginTop: 3,
						marginRight: 3,
					}}
					variant="contained"
					color="primary"
					onClick={() => {
						dispatch(
							sendOrder({ order: items, userId: user._id })
						).then(() => {
							navigate("/summary");
						});
					}}
				>
					Proceed to Cart
				</Button>
			)}
			{/* <LocationComponent /> */}
		</Box>
	);
};

export default UserPage;

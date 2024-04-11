import React,{ useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Search from "../Components/User/search";
import useGetUser from "../utils/useGetUser";
import {useSelector} from 'react-redux'
const UserPage = () => {
	useGetUser();
	
		const user = useSelector((state) => state.user.userLoggedIn)
		const role = user?.role
		useEffect(() => {
			if(role === 'ceo')
			window.location.href = '/inventories';
		},[role]);
	return (
		<Box>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				User-Search Page
			</Typography>
			<Search />
		</Box>
	);
};

export default UserPage;

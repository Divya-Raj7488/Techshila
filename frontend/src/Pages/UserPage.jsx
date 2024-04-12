import React,{ useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Search from "../Components/User/search";
import useGetUser from "../utils/useGetUser";
import LocationComponent from '../Components/User/currentLocation';
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
		
	
		<Box ml={40} mt={2} mr={10} >
		
			<Typography p={4} variant="h4" fontFamily={"Poppins"} >
				User-Search Page
			</Typography>
			
			<Search />
			<LocationComponent />
		</Box>
		
	);
};

export default UserPage;

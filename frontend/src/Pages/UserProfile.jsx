
import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import UserProfile from "../Components/User/userprofile";
import useGetUser from "../utils/useGetUser";
import {useSelector} from 'react-redux'
const UserPage = () => {
	useGetUser()
	const user = useSelector((state) => state.user.userLoggedIn)
	const role = user?.role
	useEffect(() => {
		if(role === 'ceo')
		window.location.href = '/inventories';
	},[role]);


  return (
    <Box>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Profile Page
			</Typography>
			< UserProfile/>
		</Box>
  );
};

export default UserPage;

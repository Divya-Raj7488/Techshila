
import React from 'react';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import UserProfile from "../Components/User/userprofile";
const UserPage = () => {


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

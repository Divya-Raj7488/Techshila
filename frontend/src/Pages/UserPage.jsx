import React from 'react';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Search from "../Components/User/search";
const UserPage = () => {


  return (
    <Box>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				User-Search Page
			</Typography>
			< Search/>
		</Box>
  );
};

export default UserPage;

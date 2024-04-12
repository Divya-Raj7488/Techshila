import React from 'react';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import ManagerCeo from "../Components/ManagerCeo/managerceo";
const UserPage = () => {


  return (
    <Box>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Manager Seen by Ceo
			</Typography>
			< ManagerCeo/>
		</Box>
  );
};

export default UserPage;

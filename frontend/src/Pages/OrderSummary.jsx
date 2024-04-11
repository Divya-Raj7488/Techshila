import React from 'react';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import OrderSummary from "../Components/Summary/ordersummary";
const UserPage = () => {


  return (
    <Box>
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Summary
			</Typography>
			< OrderSummary/>
		</Box>
  );
};

export default UserPage;

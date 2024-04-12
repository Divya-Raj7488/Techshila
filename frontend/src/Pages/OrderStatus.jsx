import React from 'react';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Status from "../Components/OrderStatus/orderstatus";
const OrderStatus = () => {


  return (
    <Box  ml={40} mt={2} mr={10} >
			<Typography p={3} variant="h4" fontFamily={"Poppins"}>
				Status
			</Typography>
			< Status/>
		</Box>
  );
};

export default OrderStatus;

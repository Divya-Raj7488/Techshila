import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';
import OrderTable from "../Components/StoreManager/orderTable";
import InventoryCard from "../Components/StoreManager/eopcard";

const StoreManagerPage = () => {
  return (
    <>
      <Box>
        <Typography p={3} variant="h4" fontFamily={"Poppins"}>
          Store-Manager
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
            {/* Render the OrderTable component */}
            <OrderTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StoreManagerPage;

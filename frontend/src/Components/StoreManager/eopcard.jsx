import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import {data } from '../../dummy'

import Stack from '@mui/material/Stack';

const InventoryCard = () => {
  return (
    <Grid container spacing={2}>
        {data.map((item) => (
        <Grid item>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
          <Card sx={{ width: '100%', marginBottom: 5}}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {item.heading}
            </Typography>
            <Typography variant="body2">
              {item.content}
            </Typography>
          </CardContent>
        </Card>
          </Stack>
          </Grid>
          ))} 
          
    </Grid>
  );
};

export default InventoryCard;



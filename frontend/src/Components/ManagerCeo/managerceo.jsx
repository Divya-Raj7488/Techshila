import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Card,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";

const ManagerCeo = () => {
  const managerList = [
    {
      id: 1,
      name: "Manager 1",
      date: "2024-04-01",
      inventory: "inventory1",
      works: 2,
      leaves: 3,
    },
    {
      id: 2,
      name: "Manager 2",
      date: "2024-04-05",
      inventory: "inventory1",
      works: 3,
      leaves: 3,
    },
    {
      id: 3,
      name: "Manager 3",
      date: "2024-04-10",
      inventory: "inventory1",
      works: 4,
      leaves: 3,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Card
        elevation={3}
        sx={{ backgroundColor: "#fff", width: "100%", maxWidth: 900 }}
      >
        <CardContent sx={{ padding: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "Poppins", marginBottom: 2 }}
          >
            Manager List
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography
                      sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                    >
                      Manager Name
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                    >
                      Date of Joining
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                    >
                      Inventory
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                    >
                      Works days
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                    >
                      Leaves days
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {managerList.map((list) => (
                  <TableRow key={list.id}>
                    <TableCell align="center" sx={{ fontFamily: "Poppins" }}>
                      {list.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "Poppins" }}>
                      {list.date}
                    </TableCell>

                    <TableCell align="center" sx={{ fontFamily: "Poppins" }}>
                      {list.inventory}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "Poppins" }}>
                      {list.works}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: "Poppins" }}>
                      {list.leaves}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};
export default ManagerCeo;

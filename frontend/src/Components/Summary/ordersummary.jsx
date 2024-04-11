import React from 'react';
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
    TextField,
    Slide,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";

const OrderSummary = () => {
    const orderSummary = [
        { id: 1, name: 'Medicine 1', date: '2024-04-01', status: 'Out for delivery', inventory: 'inventory1', total: 50 },
        { id: 2, name: 'Medicine 1', date: '2024-04-05', status: 'Out for delivery', inventory: 'inventory1', total: 75 },
        { id: 3, name: 'Medicine 1', date: '2024-04-10', status: 'Out for delivery', inventory: 'inventory1', total: 100 },
    ];

    // Calculate total amount
    const totalAmount = orderSummary.reduce((acc, order) => acc + order.total, 0);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                position: "relative",
            }}
        >
            <Card elevation={3}>
                <CardContent sx={{ padding: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontFamily: "Poppins" }}>
                        Order Summary
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Order ID</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Medicine Name</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Date</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Status</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Inventory</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Amount</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderSummary.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell sx={{ fontFamily: "Poppins" }}>{order.id}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins" }}>{order.name}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins" }}>{order.date}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins" }}>{order.status}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins" }}>{order.inventory}</TableCell>
                                        <TableCell sx={{ fontFamily: "Poppins" }}>${order.total}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={5}><Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Total Amount</Typography></TableCell>
                                    <TableCell><Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>${totalAmount}</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Box mt={2} width="100%" display="flex" justifyContent="center">
                <Button variant="contained" color="primary" size="large" sx={{ width: "100%", maxWidth: 783 }}>Select Payment Method</Button>
            </Box>
        </Box>
    );
};

export default OrderSummary;

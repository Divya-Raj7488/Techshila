import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Tabs,
    Tab,
} from "@mui/material";

const OrderSummary = () => {
    const orderCurrent = [
        { id: 1, name: 'Medicine 1', type: 'Tablet', status: 'Out for delivery', inventory: 'inventory1',quantity:5, total: 50 },
        { id: 2, name: 'Medicine 1', type: 'Tablet', status: 'Out for delivery', inventory: 'inventory1',quantity:5, total: 75 },
        { id: 3, name: 'Medicine 1', type: 'Tablet', status: 'Out for delivery', inventory: 'inventory1',quantity:5, total: 100 },
    ];

    const orderPast = [
        { id: 1, name: 'Medicine 1', type: 'Tablet', status: 'Out for delivery', inventory: 'inventory2',quantity:5, total: 50 },
        { id: 2, name: 'Medicine 1', type: 'Tablet', status: 'Out for delivery', inventory: 'inventory2',quantity:5, total: 75 },
        { id: 3, name: 'Medicine 1', type: 'Tablet', status: 'Out for delivery', inventory: 'inventory2',quantity:5, total: 100 },
    ];

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const getOrderData = () => {
        return selectedTab === 0 ? orderCurrent : orderPast;
    };

    return (
        <Box>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Current Order" />
                <Tab label="Past Order" />
            </Tabs>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                        <TableCell sx={{ fontFamily: "Poppins" }}>Order Id</TableCell>
                            <TableCell sx={{ fontFamily: "Poppins" }}>Medicine</TableCell>
                            <TableCell sx={{ fontFamily: "Poppins" }}>Type</TableCell>
                            <TableCell sx={{ fontFamily: "Poppins" }}>Status</TableCell>
                            <TableCell sx={{ fontFamily: "Poppins" }}>Inventory</TableCell>
                            <TableCell sx={{ fontFamily: "Poppins" }}>Quantity</TableCell>
                            <TableCell sx={{ fontFamily: "Poppins" }}>Price</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getOrderData().map((order) => (
                            <TableRow key={order.id}>
                                <TableCell sx={{ fontFamily: "Poppins" }}>{order.id}</TableCell>
                                <TableCell sx={{ fontFamily: "Poppins" }}>{order.name}</TableCell>
                                <TableCell sx={{ fontFamily: "Poppins" }}>{order.type}</TableCell>
                                <TableCell sx={{ fontFamily: "Poppins" }}>{order.status}</TableCell>
                                <TableCell sx={{ fontFamily: "Poppins" }}>{order.inventory}</TableCell>
                                <TableCell sx={{ fontFamily: "Poppins" }}>{order.quantity}</TableCell>
                                <TableCell sx={{ fontFamily: "Poppins" }}>{order.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderSummary;

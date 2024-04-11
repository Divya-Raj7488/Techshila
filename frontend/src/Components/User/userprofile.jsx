import React from 'react';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const UserProfile = () => {
    // Sample data for personal details
    const personalDetails = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        address: '1234 Main Street, City, Country',
        phoneNumber: '+1234567890',
    };

    // Sample data for order history
    const orderHistory = [
        { id: 1,name:'Medicine 1', date: '2024-04-01',status:'Out for delivery',inventory:'inventory1', total: 50 },
        { id: 2,name:'Medicine 1', date: '2024-04-05',status:'Out for delivery',inventory:'inventory1', total: 75 },
        { id: 3,name:'Medicine 1', date: '2024-04-10',status:'Out for delivery',inventory:'inventory1', total: 100 },
    ];

    return (
        <Grid container spacing={3}>
            {/* Profile Photo */}
            <Grid item xs={12} md={3}>
                <Avatar alt="Profile Photo" src="https://via.placeholder.com/150" sx={{ width: 200, height: 200 }} />
            </Grid>

            {/* Personal Details */}
            <Grid item xs={12} md={9}>
                <Card elevation={3} sx={{ borderRadius: 10 }}>
                    <CardContent sx={{ padding: 3 }}>
                        <Typography variant="h4" gutterBottom sx={{ fontFamily: "Poppins" }}>
                            Personal Details
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ fontFamily: "Poppins" }}>Name: {personalDetails.name}</Typography>
                        <Typography variant="body1" gutterBottom sx={{ fontFamily: "Poppins" }}>Email: {personalDetails.email}</Typography>
                        <Typography variant="body1" gutterBottom sx={{ fontFamily: "Poppins" }}>Address: {personalDetails.address}</Typography>
                        <Typography variant="body1" gutterBottom sx={{ fontFamily: "Poppins" }}>Phone Number: {personalDetails.phoneNumber}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Order History */}
            <Grid item xs={12}>
                <Card elevation={3}>
                    <CardContent sx={{ padding: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Order History
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography sx={{ fontWeight: 'bold',fontFamily: "Poppins" }}>Order ID</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontWeight: 'bold',fontFamily: "Poppins" }}>Medicine Name</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontWeight: 'bold',fontFamily: "Poppins" }}>Date</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontWeight: 'bold',fontFamily: "Poppins" }}>Status</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontWeight: 'bold',fontFamily: "Poppins" }}>Inventory</Typography></TableCell>
                                        <TableCell><Typography sx={{ fontWeight: 'bold',fontFamily: "Poppins" }}>Amount</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderHistory.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell sx={{ fontFamily: "Poppins" }}>{order.id}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins" }}>{order.name}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins" }}>{order.date}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins" }}>{order.status}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins" }}>{order.inventory}</TableCell>
                                            <TableCell sx={{ fontFamily: "Poppins" }}>${order.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserProfile;

import React, { useState } from 'react';
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
    Button,
    TextField,
    Slide,
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Search = () => {
    const [search, setSearch] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [data, setData] = useState([
        { id: 1, name: 'Medicine A', type: 'Type A', price: 10, status: 'Available', time: '2 days', quantity: 0 },
        { id: 2, name: 'Medicine B', type: 'Type B', price: 15, status: 'Out of stock', time: '2 days', quantity: 0 },
        { id: 3, name: 'Medicine C', type: 'Type C', price: 20, status: 'Available', time: '2 days', quantity: 0 },
    ]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setShowTable(event.target.value.trim() !== ''); // Show table when search is not empty
    };

    const handleIncreaseQuantity = (id) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setData(updatedData);
    };

    const handleDecreaseQuantity = (id) => {
        const updatedData = data.map((item) => {
            if (item.id === id && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setData(updatedData);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                position: "relative", // Added position relative for proper positioning
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: showTable ? 0 : "15%", // Move to top when table is shown
                    transition: "top 0.5s ease-in-out", // Transition effect
                    transform: showTable ? "translateY(-40%)" : "translateY(0)", // Center when not shown
                    width: "100%",
                    maxWidth: 500,
                    marginBottom: 2,
                    zIndex: 1, // Ensure search bar stays above table
                }}
            >
                <TextField
                    fullWidth
                    label="Search Medicine"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                />
            </Box>

            <Slide direction="down" in={showTable} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 800,
                        marginTop: showTable ? 9 : 0, // Add margin when table is shown
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Name</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Type</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Price</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Status</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Time</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Quantity</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}></Typography>
                                    </TableCell>
                                    <TableCell align="center" >
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Total</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="right">{item.type}</TableCell>
                                        <TableCell align="right">{item.price}</TableCell>
                                        <TableCell align="right">{item.status}</TableCell>
                                        <TableCell align="right">{item.time}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        
                                        
                                        <TableCell align="center">
                                            <Button variant="outlined" onClick={() => handleDecreaseQuantity(item.id)}>
                                                <RemoveIcon />
                                            </Button>
                                            <Button variant="contained" onClick={() => handleIncreaseQuantity(item.id)}>
                                                <AddIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">{item.price * item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Slide>
        </Box>
    );
};

export default Search;

import React, { useState, useEffect } from 'react';
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
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([
        { id: 1, name: 'Medicine A', type: 'Type A', price: 10,inventory:'Inv1', status: 'Available', time: '2 days', quantity: 0 },
        { id: 2, name: 'Medicine B', type: 'Type B', price: 15,inventory:'Inv2', status: 'Out of stock', time: '2 days', quantity: 0 },
        { id: 3, name: 'Medicine C', type: 'Type C', price: 20,inventory:'Inv3', status: 'Available', time: '2 days', quantity: 0 },
    ]);
    const [orderHistory, setOrderHistory] = useState([]);
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            filterData(search);
        }, 500); // Debounce delay in milliseconds

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const filterData = (searchQuery) => {
        if (searchQuery.trim() === '') {
            setShowTable(false);
            setFilteredData([]);
        } else {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setShowTable(true);
            setFilteredData(filtered);
        }
    };

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
    const handleAddMedicine = (id) => {
        // Implement the logic to add the medicine here
        // You can update the state or perform any necessary actions
        console.log(`Add medicine with ID ${id}`);
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
                    transition: `top ${showTable ? 2 : .8}s ease-in-out`, // Transition effect
                    transform: showTable ? "translateY(-40%)" : "translateY(0)", // Center when not shown
                    width: "100%",
                    maxWidth: 500,
                    marginBottom: 2,
                    marginTop:5,
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
                        maxWidth: 1200,
                        marginTop: showTable ? 15 : 0, // Add margin when table is shown
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                            <TableHead>
                                <TableRow>
                                <TableCell>
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>ID</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Name</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Type</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Inventory</Typography>
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
                                        <Typography sx={{ fontWeight: 'bold', fontFamily: "Poppins" }}>Total Amount</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="right">{item.type}</TableCell>
                                        <TableCell align="center">{item.inventory}</TableCell>
                                        <TableCell align="center">{item.price}</TableCell>
                                        <TableCell align="right">{item.status}</TableCell>
                                        <TableCell align="right">{item.time}</TableCell>
                                        <TableCell align="center">{item.quantity}</TableCell>
                                        
                                        
                                        <TableCell align="center">
                                            <Button variant="outlined" onClick={() => handleDecreaseQuantity(item.id)}>
                                                <RemoveIcon />
                                            </Button>
                                            <Button variant="contained" onClick={() => handleIncreaseQuantity(item.id)}>
                                                <AddIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">{item.price * item.quantity}</TableCell>
                                        <TableCell>
                                        <Button variant="contained" onClick={() => handleAddMedicine(item.id)}>Add to Cart</Button> {/* New button to add medicine */}
                                        
                                        </TableCell>
                                        <TableCell>
                                            
                                        </TableCell>
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

// CurrentLocationComponent.js

// LocationComponent.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography, Paper } from '@mui/material';

const LocationComponent = () => {
    const [userAddress, setUserAddress] = useState('');
    const [nearestStores, setNearestStore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const backendBaseUrl = 'http://localhost:3000';

    const handleFindNearestStores = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${backendBaseUrl}/api/location/nearest-inventory-store`, { userAddress });
            setNearestStore(response.data);
        } catch (error) {
            setError("Error finding nearest stores. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Paper style={{paddingTop: 200, maxWidth: 400, margin: 'auto', marginTop: 50 }}>
            <Typography variant="h5" gutterBottom>Find Nearest Stores</Typography>
            <TextField
                label="Enter Your Address"
                variant="outlined"
                fullWidth
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                style={{ marginBottom: 20 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleFindNearestStores}
                disabled={loading}
                fullWidth
                style={{ marginBottom: 20 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Find Nearest Store'}
            </Button>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography style={{ color: 'red', marginBottom: 20 }}>{error}</Typography>}
            {nearestStores && nearestStores.length > 0 && (
                <div>
                    <Typography variant="h6" gutterBottom>Nearest Stores:</Typography>
                    <ul>
                        {nearestStores.map((store, index) => (
                            <li key={index}>
                                <Typography>Name: {store.name}</Typography>
                                <Typography>Address: {store.address}</Typography>
                                <Typography>Distance: {store.distance} meters</Typography>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Paper>
        
        // <div>
        //     <h2>Find Nearest Stores</h2>
        //     <label htmlFor="addressInput">Enter Your Address:</label>
        //     <input
        //         type="text"
        //         id="addressInput"
        //         value={userAddress}
        //         onChange={(e) => setUserAddress(e.target.value)}
        //         placeholder="Enter your address..."
        //     />
        //     <button onClick={handleFindNearestStore} disabled={loading}>Find Nearest Store</button>
        //     {loading && <p>Loading...</p>}
        //     {error && <p>{error}</p>}
        //     {nearestStores && nearestStores.length > 0 && (
        //         <div>
        //             <h3>Nearest Stores:</h3>
        //             <ul>
        //                 {nearestStores.map((store, index) => (
        //                     <li key={index}>
        //                         <p>Name: {store.name}</p>
        //                         <p>Address: {store.address}</p>
        //                         <p>Distance: {store.distance} meters</p>
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     )}
        // </div>

    );
};

export default LocationComponent;


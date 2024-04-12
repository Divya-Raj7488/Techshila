// locationRoutes.js

const express = require('express');
const router = express.Router();
const geolib = require('geolib');

// for OpenStreetMap Nominatim API:
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'openstreetmap',
});

// Dummy inventory store data with addresses
const dummyStores = [
    { name: "Medico Supplies", address: "Durga Colony, Roorkee, Uttarakhand 247667, India", coordinates: { latitude: 29.843978, longitude: 77.915242 } },
    { name: "Medical Depot", address: "Nehru Nagar, Roorkee, Shafipur, Uttarakhand 247667, Uttarakhand, India", coordinates: { latitude: 29.873317, longitude: 77.876538 } },
    { name: "Pharmacy Plus", address: "Adarsh Nagar, Roorkee, Uttarakhand 247667, India", coordinates: { latitude: 29.874550, longitude: 77.900641 } },
    { name: "Health Hub", address: "Paniyala Rd, Azad Nagar, Nehru Nagar, Roorkee, Uttarakhand 247667, India", coordinates: { latitude: 29.867897, longitude: 77.876125 } },
    { name: "Medical Mart", address: "VWPR+HPG, Haridwar Rd, Belrisalhapur, Modipuram, Uttarakhand 247667 India", coordinates: { latitude: 29.886442, longitude: 77.941832 } }
];

// Endpoint for finding nearest inventory store based on user's address
router.post('/nearest-inventory-store', async(req, res) => {
    console.log("****")
    const {userAddress} = req.body; // Assuming user's address is provided in the request body
    console.log(req.body)
    if (!userAddress) {
        return res.status(400).json({ error: "User address is required." });
    }
try {
    const userCoordinates = await geocoder.geocode(userAddress);

    if (!userCoordinates || userCoordinates.length === 0) {
        // Handle case where address could not be geocoded
        res.status(404).json({ error: "Could not geocode the address." });
        return;
    }

     // Find nearest stores based on user's coordinates
    const nearestStores = findNearestStores(userCoordinates[0], dummyStores);
    // // Extract latitude and longitude from the geocoding result
    // const { latitude, longitude } = userCoordinates[0];

    // Now you can use the latitude and longitude in your code
    res.json(nearestStores);
} catch (error) {
    // Handle error
    console.error("Error geocoding address:", error);
    res.status(500).json({ error: "Internal server error." });
}
    // Calculate distance to each store and find the nearest one
    // let nearestStore = null;
    // let minDistance = Infinity;
    // dummyStores.forEach(store => {
    //     const distance = geolib.getDistance(userCoordinates, store.coordinates);
    //     if (distance < minDistance) {
    //         minDistance = distance;
    //         nearestStore = store;
    //     }
    // });

    // res.json(nearestStore);
});
// Function to find the nearest stores from dummy inventory stores based on user's coordinates
const findNearestStores = (userCoordinates, stores) => {
    const nearestStores = stores.map(store => {
        return {
            name: store.name,
            address: store.address,
            distance: geolib.getDistance(userCoordinates, store.coordinates)
        };
    }).sort((a, b) => a.distance - b.distance);

    return nearestStores;
};

module.exports = router;

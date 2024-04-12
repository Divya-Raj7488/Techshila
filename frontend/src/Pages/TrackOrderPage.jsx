import React from 'react';
import Stepper from '../Components/StoreManager/Stepper'; // Import the Stepper component

const TrackOrder = () => {
    return (
        <div >
            <h1 style={{ fontWeight: 'bold', fontSize: 32, textAlign: 'center', paddingTop: '50px', paddingLeft: '200px' }}>Track Your Order</h1>
        <div style={{ display: 'flex', paddingLeft: '200px', paddingBottom: '200px' , justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            
            <Stepper /> {/* Include the Stepper component here */}
            {/* Other content of the TrackOrder page */}
        </div>
        </div>
    );
};

export default TrackOrder;
import React from "react";
import './PickedCustomerPage.css'
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderID } from "../../utils/auth";
import { GoogleMap } from "@react-google-maps/api";
import { getStatus } from "../../api/orders";
const containerStyle = {
  width: "300px",
  height: "180px",
  borderRadius: "15px"
};

// ⚠️ Replace with dynamic coords later
const defaultCenter = {
  lat: 33.6844,
  lng: 73.0479
};

export default function PickedCustomerPage(){

    const navigate = useNavigate();
    const orderId = getOrderID();
    

    const[order , setOrder] = useState(null);
    const[loading , setLoading] = useState(true);
    
    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
        try {
            const data = await getStatus(orderId);
            const orderData = data?.order_status ?? data;

            setOrder(orderData);

            
            if (orderData.status === "delivered") {
                navigate("/order/customer/delivered");
            }

        } catch (err) {
            console.error("Error fetching order", err);
        }
        };

    
        fetchOrder();

        
        const interval = setInterval(fetchOrder, 3000);

        
        return () => clearInterval(interval);

    }, [orderId, navigate]);

    if (loading) return <p>Loading...</p>;
    if (!order) return <p>No order found..</p>;




    return(
        <>
            <div id="order-picked-customerpage-container">
                <div id="order-picked-location-section">

                </div>
                <div id="order-picked-text-section">
                    PICKED UP...
                    YOUR ORDER IS OTW!!!
                </div>
                <div id="map-track-pickeduporder">
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={defaultCenter}
                            zoom={14}
                        >
                            <Marker position={defaultCenter} />
                        </GoogleMap>
                        </LoadScript>
                </div>
            </div>
        
        
        </>
    )    
    

}


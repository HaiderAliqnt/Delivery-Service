import React from "react";
import './PickedCustomerPage.css'
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderID, getStore } from "../../utils/auth";
// import { GoogleMap } from "@react-google-maps/api"; // Not installed
import { getStatus } from "../../api/orders";
import NavBar from "../../components/NavBar/NavBar";

export default function PickedCustomerPage(){

    const navigate = useNavigate();
    const orderId = getOrderID();
    const store = getStore() || "GEN. STORE";

    const[order , setOrder] = useState(null);
    const[loading , setLoading] = useState(true);
    
    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
        try {
            const data = await getStatus(orderId);
            const orderData = data?.order_status ?? data;

            setOrder(orderData);
            setLoading(false);

            
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
                <NavBar title={store} />
                <div id="order-picked-text-section">
                    PICKED UP....
                    YOUR ORDER IS OTW !!!!
                </div>
                <div id="map-track-pickeduporder">
                    {/* Map placeholder — will be replaced with Google Maps later */}
                    <div className="map-placeholder">
                        MAP WILL BE SHOWN HERE
                    </div>
                </div>
            </div>
        </>
    )    
}

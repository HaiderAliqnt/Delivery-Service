import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getStatus } from "../../api/orders";
import { claimOrder } from "../../api/deliverer";
import { getCustomerIdFromToken, getDelivererIdFromToken, getOrderID } from "../../utils/auth"; // 
import NavBar from "../../components/NavBar/NavBar";
import "./OrderConfirmation.css";

function OrderConfirmationPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = getOrderID();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!orderId) return;
       

    const fetchOrder = async () => {
        try {
            const data = await getStatus(orderId);
            const orderData = data?.order_status ?? data;
                setOrder(orderData);
                setLoading(false);
            } catch (err) {
                setError("FAILED TO LOAD ORDER");
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);
 
   const handleClaim = async () => {
    try {
        const deliverer_id = getDelivererIdFromToken() ; 


        if (!deliverer_id) {
        setError("Please sign in as deliverer");
        return;
        }

        await claimOrder(orderId , deliverer_id);
        
        navigate("/orderConfirmed"); 
    } catch (err) {
        setError("FAILED TO CLAIM ORDER");
    }
    };

    const handleReject = () => {
        navigate(-1); // go back
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!order) return <p>No order found</p>;

    return (
        <>
            <NavBar />

            <div className="order-confirmation-container">

                {/* Store / Pickup Location */}
                <div className="store-name">
                    {order.pickup_location}
                </div>

                <h2>YOU HAVE CHOSEN</h2>

                {/* Items */}
                <div className="order-card">
                    <h3>ITEMS</h3>
                    {order.special_instructions}
                    <p><strong>PRICE:</strong> {order.total_price}</p>
                    <p><strong>LOCATION:</strong> {order.delivery_hostel}</p>
                </div>

                <h2>CLAIM THE ORDER?</h2>

                <div className="actions">
                    <button className="accept-btn" onClick={handleClaim}>
                        ✔
                    </button>

                    <button className="reject-btn" onClick={handleReject}>
                        ✖
                    </button>
                </div>

            </div>
        </>
    );
}

export default OrderConfirmationPage;
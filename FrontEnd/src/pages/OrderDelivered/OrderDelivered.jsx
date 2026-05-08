import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../../api/orders";
import { getOrderID } from "../../utils/auth";
import NavBar from "../../components/NavBar/NavBar";
import "./OrderDelivered.css";
import { updateOrderStatus } from "../../api/deliverer";

//THIS IS FOR THE DELIVERER INTERFACE
function OrderDeliveredPage() {
    const navigate = useNavigate();
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

    const handleBackToDelivererHome = () => {
        navigate("/home/deliverer");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!order) return <p>No order found</p>;

    return (
        <>
            <NavBar />

            <div className="delivered-container">

                {/* Store */}
                <div className="store-name">
                    {order.pickup_location}
                </div>

                {/* Success Message */}
                <h2>ORDER DELIVERED</h2>

                {/* Summary */}
                <div className="delivered-card">
                    <h3>SUMMARY</h3>

                    <p><strong>Location:</strong> {order.delivery_hostel}</p>
                    <p><strong>Room:</strong> {order.delivery_room}</p>
                    <p><strong>Price:</strong> {order.total_price}</p>

                    <p className="instructions">
                        {order.special_instructions}
                    </p>
                </div>

                {/* Success Icon */}
                <div className="success-icon">
                    ✔
                </div>

                {/* Back Button */}
                <button className="back-btn" onClick={handleBackToDelivererHome}>
                    BACK TO FEED
                </button>

            </div>
        </>
    );
}

export default OrderDeliveredPage;
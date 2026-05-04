import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStatus, updateOrderStatus } from "../../api/orders";
import { getOrderID } from "../../utils/auth";
import NavBar from "../../components/NavBar/NavBar";
import "./OrderConfirmed.css";

function OrderConfirmedPage() {
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

    const handlePickedUp = async() => {
        const data = await updateOrderStatus(orderId , 'picked_up')
        navigate("/order/picked");
    };
    const handleCancel = () => {
        // later: cancel API
        navigate("/deliver/feed");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!order) return <p>No order found</p>;

    return (
        <>
            <NavBar />

            <div className="confirmed-container">

                {/* Store */}
                <div className="store-name">
                    {order.pickup_location}
                </div>

                <h2>ORDER CONFIRMED</h2>

                {/* Summary Card */}
                <div className="summary-card">
                    <h3>SUMMARY</h3>

                    <p>{order.special_instructions}</p>

                    <p>{order.delivery_hostel}</p>
                    <p>{order.delivery_room}</p>

                    <p>Customer Number</p>

                    <p className="instructions">
                        {order.special_instructions}
                    </p>
                </div>

                {/* Actions */}
                <button className="pickup-btn" onClick={handlePickedUp}>
                    PICKED-UP
                </button>

                <button className="cancel-btn" onClick={handleCancel}>
                    CANCEL ORDER
                </button>

            </div>
        </>
    );
}

export default OrderConfirmedPage;
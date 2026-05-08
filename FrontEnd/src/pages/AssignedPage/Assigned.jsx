import React, { useEffect, useState } from "react";
import "../SearchingPage/Customer.css";
import "./Assigned.css";
import { getOrderID } from "../../utils/auth";
import { getDelivererInfo } from "../../api/deliverer";
import { useNavigate } from "react-router-dom";

export default function AssignedPage() {

    const navigate = useNavigate();
    const [deliverData, setDelivererData] = useState(null);
    const [error, setError] = useState(null);
    const order_id = getOrderID();

    useEffect(() => {
        if (!order_id) return;

        const interval = setInterval(async () => {
            try {
                const deliverer_data = await getDelivererInfo(order_id);

                console.log(deliverer_data);

                setDelivererData(deliverer_data.deliverer_info);
            } catch (err) {
                setError("Failed to fetch deliverer info");
            }
        } , 5000);

        return () => clearInterval(interval);
        

    }, [order_id]);
    
    useEffect(() => {
    if (deliverData?.status === "picked_up") {
        navigate("/order/customer/picked");
    }
    }, [deliverData, navigate]);

    if (!deliverData && !error) {
        return <p>Loading...</p>;
    }

   
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="card">
            <h2>ORDER ASSIGNED</h2>

            <p><strong>Name:</strong> {deliverData?.deliverer_name}</p>
            <p><strong>Rating:</strong> {deliverData?.deliverer_rating}</p>
            <p><strong>Phone:</strong> {deliverData?.deliverer_phone}</p>

            <p className="message">
                Your order has been assigned, waiting for pickup
            </p>
        </div>
    );
}
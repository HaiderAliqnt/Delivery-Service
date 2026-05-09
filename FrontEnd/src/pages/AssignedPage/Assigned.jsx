import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Assigned.css";
import { getOrderID, getStore } from "../../utils/auth";
import { getDelivererInfo } from "../../api/deliverer";
import { useNavigate } from "react-router-dom";

export default function AssignedPage() {

    const navigate = useNavigate();
    const [deliverData, setDelivererData] = useState(null);
    const [error, setError] = useState(null);
    const order_id = getOrderID();
    const store = getStore() || "GEN. STORE";

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
        <div className="assigned-page">
            <NavBar title={store} />

            <div className="assigned-avatar">
                {/* Avatar image will be added later */}
            </div>

            <div className="assigned-details-card">
                <h3>DELIVERER DETAILS</h3>
                <p>{deliverData?.deliverer_name}</p>
                <p>{deliverData?.deliverer_rating}</p>
                <p>{deliverData?.deliverer_phone}</p>
            </div>

            <div className="assigned-status-card">
                YOUR ORDER HAS BEEN ASSIGNED.... WAITING FOR PICKUP
            </div>
        </div>
    );
}
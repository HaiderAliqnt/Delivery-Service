import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../../api/orders";
import { getOrderID, getStore } from "../../utils/auth";
import "./SearchingPage.css";

export default function SearchingPage() {
  const navigate = useNavigate();
  const orderId = getOrderID();
  const store = getStore() || "GEN. STORE";

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const data = await getStatus(orderId);
        const orderData = data?.order_status ?? data;

        setOrder(orderData);

        
        if (orderData.status === "claimed") {
          navigate("/order/assigned");
        }

      } catch (err) {
        console.error("Error fetching order", err);
      }
    };

   
    fetchOrder();

    
    const interval = setInterval(fetchOrder, 3000);

    
    return () => clearInterval(interval);

  }, [orderId, navigate]);

  return (
    <div className="searching-page">
      <NavBar title={store} />
      <div className="searching-text">
        SEARCHING FOR SOMEONE TO FETCH YOUR ORDER......
      </div>
      <div className="searching-character-area">
        {/* Character image will be added later */}
      </div>
    </div>
  );
}
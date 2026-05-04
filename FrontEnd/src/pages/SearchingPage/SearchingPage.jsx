import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { getStatus } from "../../api/orders";
import { getOrderID } from "../../utils/auth";
import "./Customer.css";
import "./SearchingPage.css";

export default function SearchingPage() {
  const navigate = useNavigate();
  const orderId = getOrderID();

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
    <>
      <NavBar />
      <div className="customer-container">
        <div className="card">
          <h2>SIT TIGHT</h2>
          <p>We are looking for someone to fetch your order...</p>
        </div>
      </div>
    </>
  );
}
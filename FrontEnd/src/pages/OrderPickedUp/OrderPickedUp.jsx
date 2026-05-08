import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { getStatus } from "../../api/orders";
import { getOrderID , setTime } from "../../utils/auth";
import NavBar from "../../components/NavBar/NavBar";
import { updateOrderStatus } from "../../api/orders";
import "./OrderPickedUp.css";

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
//THIS IS FOR THE DELIVERER INTERFACE

function OrderPickedUpPage() {
  const navigate = useNavigate();
  const orderId = getOrderID();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const data = await getStatus(orderId);
        const orderData = data?.order_status ?? data;
        setOrder(orderData);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  //  Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    setTime(seconds);

    return () => clearInterval(interval);
  }, []);


 const handleDelivered = async (e) => {
  e.preventDefault();

  try {
    const data = await updateOrderStatus(orderId, 'delivered');
    navigate("/order/delivered");
  } catch (err) {
    console.error(err);
  }
};

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>No order found..</p>;

  return (
    <>
      <NavBar />

      <div className="picked-container">

        {/* Store */}
        <div className="store-name">
          {order.pickup_location}
        </div>

        <h2>ORDER PICKED UP</h2>

        {/* Google Map */}
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={14}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript>

        {/* Timer */}
        <div className="timer-card">
          <h3>TIMER STARTED</h3>
          <p>{seconds}s</p>
        </div>

        {/* Delivered Button */}
        <button type="button" className="delivered-btn" onClick={handleDelivered}>
          DELIVERED
        </button>

      </div>
    </>
  );
}

export default OrderPickedUpPage;
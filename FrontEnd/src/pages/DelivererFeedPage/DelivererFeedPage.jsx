import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { getFeed, claimOrder } from "../../api/deliverer";
import "../ErrorPanel/ErrorPanel.css";
import './DelivererFeedPage.css';
import { storeOrderID } from '../../utils/auth';

function DelivererFeedPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location")
  useEffect(() => {
  if (!location) {
    setOrders([]);
    return;
  }

  let isActive = true;

  setLoading(true);
  setError(null);

  const fetchFeed = async () => {
    try {
      const data = await getFeed(location);
      if (isActive) {
        setOrders(data);
        setLoading(false);
      }
    } catch {
      if (isActive) {
        setError("FAILED TO LOAD RECENT ORDERS.");
        setLoading(false);
      }
    }
  };

  fetchFeed();
  const interval = setInterval(fetchFeed, 5000);

  return () => {
    isActive = false;
    clearInterval(interval);
  };
}, [location]);

  const handleClaim = (orderId) => {
    storeOrderID(orderId)
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="page-container">
      <NavBar title="FEED" />

      <div className="feed-content">
        <p className="section-label">AVAILABLE ORDERS</p>

        {loading && orders.length === 0 && <LoadingPixel />}
        {error && <div className="error-panel">{error}</div>}

        {!loading && !error && orders.length === 0 && (
          <p className="muted-text">
            NO OPEN ORDERS YET
          </p>
        )}

        {!error && orders.length > 0 && (
          <div className="feed-list">
            {orders.map((order) => (
              <OrderCard
                key={order.order_id}
                order={order}
                onClaim={() => handleClaim(order.order_id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DelivererFeedPage;

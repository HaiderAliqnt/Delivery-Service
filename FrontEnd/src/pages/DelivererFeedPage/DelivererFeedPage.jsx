import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { getFeed, claimOrder } from "../../api/deliverer";
import "../ErrorPanel/ErrorPanel.css";

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

  const handleClaim = async (orderId) => {
    setLoading(true);
    try {
      await claimOrder(orderId);
      navigate(`/deliver/${orderId}`);
    } catch {
      setError('FAILED TO CLAIM ORDER.');
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <NavBar title="FEED" />

      <div className="page-content" style={{ padding: '24px' }}>
        <p className="section-label">OPEN ORDERS</p>

        {loading && orders.length === 0 && <LoadingPixel />}
        {error && <div className="error-panel">{error}</div>}

        {!loading && !error && orders.length === 0 && (
          <p className="muted-text" style={{ textAlign: 'center', marginTop: '32px' }}>
            NO OPEN ORDERS YET
          </p>
        )}

        {!error && orders.length > 0 && (
          <div className="feed-list" style={{ marginTop: '16px' }}>
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

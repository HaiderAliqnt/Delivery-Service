import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import StatusBar from '../../components/StatusBar/StatusBar';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { getStatus, cancelOrder } from "../../api/orders";
import './OrderStatusPage.css';

function OrderStatusPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchStatus = () => {
      getStatus(id)
        .then((data) => {
          if (mounted) {
            const orderData = data?.order_status ?? data;
            setOrder(orderData);
            setLoading(false);
          }
        })
        .catch(() => {
          if (mounted) {
            setError('FAILED TO FETCH STATUS.');
            setLoading(false);
          }
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [id]);

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelOrder(id);
      navigate('/home');
    } catch {
      setError('FAILED TO CANCEL.');
      setLoading(false);
    }
  };

  if (loading && !order) return <LoadingPixel />;

  return (
    <div className="page-container">
      <NavBar title={order?.store || 'ORDER'} />

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px' }}>
        {error && <div className="error-panel">{error}</div>}

        <p className="section-label">ORDER ID: {id}</p>
        
        {order && <StatusBar currentStatus={order.status} />}

        {order?.deliverer && (
          <div className="deliverer-info-container">
            <p className="section-label">YOUR DELIVERER</p>
            <div className="deliverer-mini-card">
              <div className="deliverer-avatar-mini">
                 {order.deliverer.avatar ? (
                   <img src={order.deliverer.avatar} alt={order.deliverer.name} />
                 ) : (
                   <img src="/pixelartboy.png" alt={order.deliverer.name} className="avatar-placeholder-mini" />
                 )}
              </div>
              <p className="deliverer-name-mini">{order.deliverer.name}</p>
            </div>
          </div>
        )}

        <div className="order-actions">
          <button className="btn-chat" disabled>CHAT (SOON)</button>
          
          {order?.status === 'open' && (
            <button className="btn-cancel" onClick={handleCancel}>
              CANCEL ORDER
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default OrderStatusPage;

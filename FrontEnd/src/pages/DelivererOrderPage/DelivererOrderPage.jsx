import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { updateOrderStatus } from "../../api/deliverer";
import { getStatus } from "../../api/orders";
import './DelivererOrderPage.css';
import "../ErrorPanel/ErrorPanel.css";

function DelivererOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    getStatus(id)
      .then((data) => {
        if (mounted) {
          // Mock some extra details for the deliverer view since the stub doesn't provide them all
          setOrder({
            ...data,
            customer_name: 'Ahmad',
            delivery_location: 'Hostel 8, Room 123',
            instructions: 'Call when outside',
            items: ['2x Lays', '1x Cola'],
          });
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('FAILED TO LOAD ORDER DETAILS.');
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, [id]);

  const handleAction = async () => {
    if (!order) return;
    
    setActionLoading(true);
    let newStatus = order.status;
    
    if (order.status === 'CLAIMED') newStatus = 'PICKED UP';
    else if (order.status === 'PICKED UP') newStatus = 'DELIVERED';

    try {
      await updateOrderStatus(id, newStatus);
      if (newStatus === 'DELIVERED') {
        alert('DELIVERY COMPLETED! EARNINGS: PKR 50');
        navigate('/deliver/feed');
      } else {
        setOrder({ ...order, status: newStatus });
      }
    } catch {
      setError('FAILED TO UPDATE STATUS.');
    } finally {
      setActionLoading(false);
    }
  };

  const getActionText = () => {
    if (order?.status === 'CLAIMED') return 'MARK AS PICKED UP';
    if (order?.status === 'PICKED UP') return 'MARK AS DELIVERED';
    if (order?.status === 'DELIVERED') return 'COMPLETED';
    return 'UNKNOWN STATE';
  };

  if (loading) return <LoadingPixel />;

  return (
    <div className="page-container">
      <NavBar title={`ORDER ${id}`} />

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px' }}>
        {error && <div className="error-panel">{error}</div>}

        {order && (
          <>
            <div className="delivery-details-card">
              <p className="detail-row"><span className="detail-label">STORE:</span> {order.store}</p>
              <p className="detail-row"><span className="detail-label">CUSTOMER:</span> {order.customer_name}</p>
              <p className="detail-row"><span className="detail-label">LOCATION:</span> {order.delivery_location}</p>
              <p className="detail-row"><span className="detail-label">NOTES:</span> {order.instructions}</p>
            </div>

            <p className="section-label">ITEMS</p>
            <div className="items-list">
              {order.items?.map((item, idx) => (
                <div key={idx} className="item-row">- {item}</div>
              ))}
            </div>

            <div className="status-indicator">
              STATUS: <span className="highlight-status">{order.status}</span>
            </div>

            <div className="order-actions">
              <button 
                className={`action-btn ${order.status === 'DELIVERED' ? 'disabled' : ''}`}
                onClick={handleAction}
                disabled={order.status === 'DELIVERED' || actionLoading}
              >
                {actionLoading ? 'UPDATING...' : getActionText()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DelivererOrderPage;

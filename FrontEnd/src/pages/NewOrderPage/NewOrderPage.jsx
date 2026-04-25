import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { submitOrder } from "../../api/orders";
import './NewOrderPage.css';

function NewOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, shop, order_id } = location.state || { store: 'UNKNOWN', order_id: 'mock' };

  const [orderText, setOrderText] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!orderText.trim()) {
      setError('ORDER CANNOT BE EMPTY.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await submitOrder({ order_id, items_text: orderText, phone, store, shop });
      navigate(`/order/${response.order_id}`, { state: { order: response } });
    } catch {
      setError('SOMETHING WENT WRONG. TRY AGAIN.');
      setLoading(false);
    }
  };

  if (loading) return <LoadingPixel />;

  return (
    <div className="page-container">
      <NavBar title={store} />

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {error && <div className="error-panel">{error}</div>}

        <p className="section-label">ENTER YOUR ORDER</p>

        {shop && <p className="muted-text" style={{margin: '0 0 16px 0', textAlign: 'left'}}>SELECTED SHOP: {shop}</p>}

        <textarea
          className="order-textarea"
          placeholder="TYPE HERE..."
          value={orderText}
          onChange={(e) => setOrderText(e.target.value)}
        />

        <p className="section-label extra-spacing">FOR EXTRA COMMUNICATION REACH OUT</p>

        <div className="phone-input-container">
          <div className="phone-avatar-placeholder"></div>
          <input
            type="text"
            className="phone-input"
            placeholder="Phone num"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="submit-order-button" onClick={handleSubmit}>
          {store.toUpperCase()}
        </button>
      </div>
    </div>
  );
}

export default NewOrderPage;

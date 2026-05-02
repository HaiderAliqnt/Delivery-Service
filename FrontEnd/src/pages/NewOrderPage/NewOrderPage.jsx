import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { createOrder } from "../../api/orders";
import './NewOrderPage.css';
import { getCustomerIdFromToken, getStore } from '../../utils/auth';

function NewOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // const { store, shop, order_id } = location.state || { store: 'UNKNOWN', order_id: 'mock' };
  const store = getStore();
  const [orderText, setOrderText] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropLocation, setDropLocation] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  

 
  const handleSubmit = async () => {
  if (!orderText.trim()) {
    setError('ORDER CANNOT BE EMPTY.');
    return;
  }

  setLoading(true);
  setError(null);
  try {
    
    const customer_id = getCustomerIdFromToken();
    // console.log(customer_id); for debugging purposes ...works
    if(!customer_id){
      setError("Please sign in to place an order. ")
      setLoading(false)
      return;
    }
    // You'll need to get customer_id from auth/session
    const payload = {
      customer_id,
      pickup_location: store,
      delivery_hostel: dropLocation,
      delivery_room: roomNumber,
      special_instructions: orderText,
      total_price: 150,
    }; 

    const response = await createOrder(payload);
    
    // Backend returns { success: true, order: { order_id, ... } }
    navigate(`/order/${response.order.order_id}`, { state: { order: response.order } });
  } catch (err) {
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

        {store && <p className="muted-text" style={{margin: '0 0 16px 0', textAlign: 'left'}}>SELECTED SHOP: {store}</p>}

        <textarea
          className="order-textarea"
          placeholder="TYPE HERE..."
          value={orderText}
          onChange={(e) => setOrderText(e.target.value)}
        />

      <div className="form-field">
        <label htmlFor="drop-location">DROP LOCATION</label>
        <input
          id="drop-location"
          className="text-input"
          type="text"
          placeholder="Hostel / building"
          value={dropLocation}
          onChange={(e) => setDropLocation(e.target.value)}
        />
      </div>

      <div className="form-field">
          <label htmlFor="room-number">ROOM NUMBER (OPTIONAL)</label>
          <input
            id="room-number"
            className="text-input"
            type="text"
            placeholder="Room number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
      </div>
        
      <button className="submit-order-button" onClick={handleSubmit}>
          SUBMIT
      </button>
      </div>
    </div>
  );
}

export default NewOrderPage;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { createOrder , estimateOrder } from "../../api/orders";
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
  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [matchedItems, setMatchedItems] = useState([]);
  const [unmatchedItems, setUnmatchedItems] = useState([]);

  const handleEstimate = async (text) => {

  try {

    if (!text.trim()) {

      setEstimatedTotal(0);

      setMatchedItems([]);

      setUnmatchedItems([]);

      return;
    }

    const data = await estimateOrder(text);

    setEstimatedTotal(
      data.estimatedTotal || 0
    );

    setMatchedItems(
      data.matched || []
    );

    setUnmatchedItems(
      data.unmatched || []
    );

  } catch (err) {

    console.error(
      "Estimate failed:",
      err
    );
  }
};

 
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
      total_price: estimatedTotal,
    }; 

    const response = await createOrder(payload);
    
    // Backend returns { success: true, order: { order_id, ... } }
    // navigate(`/order/${response.order.order_id}`, { state: { order: response.order } });
    navigate('/order/searching')
  } catch (err) {
    setError('SOMETHING WENT WRONG. TRY AGAIN.');
    setLoading(false);
  }
};

  if (loading) return <LoadingPixel />;

  return (
    <div className="page-container">
      <NavBar title={store} />

      <div className="page-content new-order-content">
        {error && <div className="error-panel">{error}</div>}

        <p className="section-label">ENTER ORDER DETAILS</p>



        <textarea
          className="order-textarea"
          placeholder="TYPE HERE..."
          value={orderText}
          onChange={(e) => {

            const value = e.target.value;

            setOrderText(value);

            handleEstimate(value);
          }}
        />

      <div className="form-field">
        <label htmlFor="drop-location">DROP LOCATION</label>
        <input
          id="drop-location"
          className="text-input"
          type="text"
          placeholder="Hostel / building....FORMAT: H10 , H9 , FME"
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
      <div className="estimate-panel">

        <p>
          ESTIMATED TOTAL: Rs {estimatedTotal}
        </p>

      </div>
        
      <button className="submit-order-button" onClick={handleSubmit}>
          CONFIRM
      </button>
      </div>
    </div>
  );
}

export default NewOrderPage;

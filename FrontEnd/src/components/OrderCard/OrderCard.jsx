import React from 'react';
import './OrderCard.css';

function OrderCard({ order, onClaim }) {
  return (
    <div className="order-card" onClick={onClaim}>
      <div className="order-header">
        <span className="order-store">{order.store}</span>
        <span className="order-customer">@{order.customer_name}</span>
      </div>
      <div className="order-body">
        <p className="order-preview">Hostel : {order.delivery_hostel}</p>
        <p className="order-preview">Items : {order.special_instructions}</p>
        <p className="order-preview">Room : {order.delivery_room}</p>
        <p className="order-preview">Total : {order.total_price}</p>
      </div>
    </div>
  );
}

export default OrderCard;

import React from 'react';
import './OrderCard.css';

function OrderCard({ order, onClaim }) {
  return (
    <div className="order-card">
      <div className="order-header">
        <span className="order-store">{order.store}</span>
        <span className="order-customer">@{order.customer_name}</span>
      </div>
      <div className="order-body">
        <p className="order-preview">{order.preview}</p>
      </div>
      <button className="order-claim-btn" onClick={onClaim}>
        CLAIM
      </button>
    </div>
  );
}

export default OrderCard;

import React from 'react';
import './DelivererCard.css';

function DelivererCard({ deliverer, onClick }) {
  return (
    <div className="deliverer-card" onClick={onClick}>
      <div className="deliverer-info">
        <h3 className="deliverer-name">{deliverer.name}</h3>
        <p className="deliverer-rating">reviews {deliverer.rating}</p>
      </div>
      <div className="deliverer-avatar">
        {deliverer.avatar ? (
          <img src={deliverer.avatar} alt={deliverer.name} />
        ) : (
          <div className="avatar-placeholder"></div>
        )}
      </div>
    </div>
  );
}

export default DelivererCard;

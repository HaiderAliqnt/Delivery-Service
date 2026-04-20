import React from 'react';
import './StoreButton.css';

function StoreButton({ label, onClick }) {
  return (
    <button className="store-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default StoreButton;

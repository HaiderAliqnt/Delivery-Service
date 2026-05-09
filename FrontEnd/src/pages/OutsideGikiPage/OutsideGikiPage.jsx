import React from 'react';
import './OutsideGikiPage.css';

const SHOPS = ['TAHIR KHAN', 'AMIR KHAN', 'BANNU BEEF', 'BIRYANI'];

function OutsideGikiPage() {
  const handleShopClick = (shop) => {
    // Routing/navigation will be added later
    console.log('Selected shop:', shop);
  };

  return (
    <div className="outside-giki-page">
      <div className="outside-giki-header">
        OUTSIDE GIK
      </div>

      <p className="outside-giki-label">CHOOSE SHOP</p>

      <div className="outside-giki-card">
        {SHOPS.map((shop) => (
          <button
            key={shop}
            className="outside-giki-shop-btn"
            onClick={() => handleShopClick(shop)}
          >
            {shop}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OutsideGikiPage;

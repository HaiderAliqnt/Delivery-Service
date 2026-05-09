import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import StoreButton from '../../components/StoreButton/StoreButton';
import './ShopSelectPage.css';

const SHOPS = ['TAHIR KHAN', 'AMIR KHAN', 'BANNU BEEF', 'BIRYANI'];

function ShopSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { store } = location.state || { store: 'OUTSIDE GIK' };

  const handleShopClick = (shop) => {
    navigate('/order/new', { state: { store, shop } });
  };

  return (
    <div className="page-container">
      <NavBar title={store} />

      <div className="shop-select-content">
        <p className="section-label">CHOOSE SHOP</p>

        <div className="shop-card-container">

          {SHOPS.map((shop) => (
            <StoreButton
              key={shop}
              label={shop}
              onClick={() => handleShopClick(shop)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopSelectPage;

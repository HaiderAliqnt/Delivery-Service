import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoreButton from '../components/StoreButton';
import NavBar from '../components/NavBar';
import './HomePage.css';

const STORES = ['GEN. STORE', 'MAIN GATE', 'CAFE', 'OUTSIDE GIK'];

function HomePage() {
  const navigate = useNavigate();

  const handleStoreClick = (store) => {
    navigate(`/browse/npcs?store=${encodeURIComponent(store)}`);
  };

  return (
    <div className="page-container">
      {/* We won't strictly need a back button on the root home page, but included for structure if needed */}
      <NavBar title="" />
      
      <div className="home-content">
        <h1 className="home-greeting">
          HI, lets <span className="highlight-order">order</span>
        </h1>

        <p className="section-label">ORDER FROM?</p>

        <div className="store-list">
          {STORES.map((store) => (
            <StoreButton
              key={store}
              label={store}
              onClick={() => handleStoreClick(store)}
            />
          ))}
        </div>

        <div className="home-divider" />

        <div className="mode-toggle-container">
          <p className="mode-toggle-title">I WANT TO</p>
          <button
            className="mode-toggle-button"
            onClick={() => navigate('/home/deliverer')}
          >
            DELIVER
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

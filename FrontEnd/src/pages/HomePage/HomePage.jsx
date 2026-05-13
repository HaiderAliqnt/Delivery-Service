import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoreButton from '../../components/StoreButton/StoreButton';
import NavBar from '../../components/NavBar/NavBar';
import './HomePage.css';
import { useState } from 'react';
import { getRole, setRole, setStore } from '../../utils/auth.js';

const STORES = ['GEN. STORE', 'MAIN GATE', 'CAFE', 'OUTSIDE GIK'];

function HomePage() {
  const navigate = useNavigate();
  
  setRole('customer');

  const handleStoreClick = (store) => {
    //when the store is clicked we will save the store and redirect user to an interface to record the order and store it 
    setStore(store);
    navigate("/order/new")
    
  };

  return (
    <div className="page-container">
     
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
          <button
            className='mode-toggle-button'
            onClick={()=>{
              navigate("/myOpenOrders")
            }}
          >
            YOUR ORDERS
          </button>
      </div>

        <div className="mode-toggle-container">
          <p className="mode-toggle-title">I WANT TO</p>
          <button
            className="mode-toggle-button"
            onClick={() => 
              navigate('/home/deliverer')}
          >
            DELIVER
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

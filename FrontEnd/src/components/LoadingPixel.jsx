import React from 'react';
import './LoadingPixel.css';

function LoadingPixel() {
  return (
    <div className="loading-container">
      <div className="loading-pixel"></div>
      <p className="loading-text">LOADING...</p>
    </div>
  );
}

export default LoadingPixel;

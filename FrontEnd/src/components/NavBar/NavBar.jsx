import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ title }) {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <button className="nav-back-button" onClick={() => navigate(-1)}>
        {'< BACK'}
      </button>
      <h2 className="nav-title">{title}</h2>
      <div className="nav-spacer" />
    </div>
  );
}

export default NavBar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreButton from '../../components/StoreButton/StoreButton';
import NavBar from '../../components/NavBar/NavBar';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { setAvailability } from "../../api/deliverer";
import './DelivererHomePage.css'; // Shares styles with HomePage
import { getRole, setRole } from '../../utils/auth.js';


const ZONES = ['GEN. STORE', 'MAIN GATE', 'CAFE', 'OUTSIDE GIK'];

function DelivererHomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  setRole("deliverer"); 

  const handleZoneClick = async (location) => {
    // setLoading(true);
    // setError(null);
    // try {
    //   await setAvailability({ status: 'available', current_hostel: zone });
    //   navigate('/deliver/feed');
    // } catch {
    //   setError('SOMETHING WENT WRONG. TRY AGAIN.');
    // } finally {
    //   setLoading(false);
    // }

    const userRole = getRole();
    if(userRole == "deliverer"){
      navigate(`/browse/orders?location=${encodeURIComponent(location)}`)
    }
  };

  if (loading) return <LoadingPixel />;
  if (error) return <div className="error-panel">{error}</div>;

  return (
    <div className="page-container">
      <NavBar title="" />
      
      <div className="home-content">
        <h1 className="home-greeting">
          HI, lets <span className="highlight-deliver">deliver</span>
        </h1>

        <p className="section-label">WHERE ARE YOU?</p>

        <div className="store-list">
          {ZONES.map((zone) => (
            <StoreButton
              key={zone}
              label={zone}
              onClick={() => handleZoneClick(zone)}
            />
          ))}
        </div>

        <div className="home-divider" />
        <div className="mode-toggle-container">
          <button
            className='mode-toggle-button'
            onClick={()=>{
              navigate("/myOpenDeliveries")
            }}
          >
            DELIVERIES
          </button>
      </div>



        <div className="mode-toggle-container">
          <p className="mode-toggle-title">I WANT TO</p>
          <button
            className="mode-toggle-button"
            onClick={() => navigate('/home')}
          >
            ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default DelivererHomePage;

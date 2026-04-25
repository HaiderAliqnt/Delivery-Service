import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { createOrder } from "../../api/orders";
import "../ErrorPanel/ErrorPanel.css";
import './NPCDetailPage.css';

function NPCDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { npc, store } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!npc) {
    return <div className="error-panel">MISSING NPC DATA. GO BACK.</div>;
  }

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await createOrder({ deliverer_id: npc.id, store });
      
      if (store === 'OUTSIDE GIK') {
        navigate('/order/new/shop', { state: { order_id: response.order_id, store } });
      } else {
        navigate('/order/new', { state: { order_id: response.order_id, store } });
      }
    } catch {
      setError('SOMETHING WENT WRONG. TRY AGAIN.');
      setLoading(false);
    }
  };

  const handleReject = () => {
    navigate(-1);
  };

  if (loading) return <LoadingPixel />;

  return (
    <div className="page-container">
      <NavBar title={store} />

      <div className="page-content">
        {error && <div className="error-panel">{error}</div>}
        
        <p className="section-label">YOU HAVE CHOSEN</p>

        <div className="chosen-npc-display">
          <div className="npc-info-large">
            <h1 className="npc-name-large">{npc.name}</h1>
            <p className="npc-rating-large">REVIEWS {npc.rating}</p>
          </div>
          
          <div className="npc-avatar-large">
            {npc.avatar ? (
              <img src={npc.avatar} alt={npc.name} />
            ) : (
              <div className="avatar-placeholder-large" />
            )}
          </div>
        </div>

        <p className="consent-text">ASKING FOR CONSENT.....</p>

        <div className="action-buttons-large">
          <button className="btn-confirm" onClick={handleConfirm}>
            <span className="icon-check">✓</span>
          </button>
          <button className="btn-reject" onClick={handleReject}>
            <span className="icon-cross">✗</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NPCDetailPage;

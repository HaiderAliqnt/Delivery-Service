import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import DelivererCard from '../../components/DelivererCard/DelivererCard';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { getAvailable } from "../../api/deliverers";
import "../ErrorPanel/ErrorPanel.css";
import './NPCListPage.css';

function NPCListPage() {
  const [searchParams] = useSearchParams();
  const store = searchParams.get('store') || 'UNKNOWN STORE';
  const navigate = useNavigate();

  const [npcs, setNpcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getAvailable({ store })
      .then((data) => {
        if (mounted) {
          setNpcs(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('SOMETHING WENT WRONG. TRY AGAIN.');
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, [store]);

  const handleNpcClick = (npc) => {
    navigate(`/browse/npcs/${npc.id}`, { state: { npc, store } });
  };

  return (
    <div className="page-container">
      <NavBar title={store} />

      <div className="page-content">
        <p className="section-label">AVAILABLE NPCS</p>

        {loading && <LoadingPixel />}
        {error && <div className="error-panel">{error}</div>}

        {!loading && !error && npcs.length === 0 && (
          <p className="muted-text">NO NPCS ONLINE</p>
        )}

        {!loading && !error && npcs.length > 0 && (
          <div className="npc-list">
            {npcs.map((npc) => (
              <DelivererCard
                key={npc.id}
                deliverer={npc}
                onClick={() => handleNpcClick(npc)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NPCListPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';
import { getProfile } from "../../api/profile";
import { logout } from "../../utils/auth";
import './ProfilePage.css';
import "../ErrorPanel/ErrorPanel.css";

function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getProfile()
      .then((data) => {
        if (mounted) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError('FAILED TO LOAD PROFILE.');
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <LoadingPixel />;

  return (
    <div className="page-container">
      <NavBar title="PROFILE" />

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px' }}>
        {error && <div className="error-panel">{error}</div>}

        {profile && (
          <>
            <div className="profile-header">
              <div className="profile-avatar">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="avatar" />
                ) : (
                  <div className="avatar-placeholder-large" />
                )}
              </div>
              <div className="profile-titles">
                <h1 className="profile-name">{profile.name}</h1>
                <p className="profile-role">{profile.role}</p>
              </div>
            </div>

            <p className="section-label">STATS</p>
            <div className="stats-grid">
              <div className="stat-box">
                <p className="stat-label">RATING</p>
                <p className="stat-value">⭐ {profile.rating}</p>
              </div>
              <div className="stat-box">
                <p className="stat-label">TRUST SCORE</p>
                <p className="stat-value">{profile.trustScore}</p>
              </div>
              <div className="stat-box">
                <p className="stat-label">PLACED</p>
                <p className="stat-value">{profile.stats.ordersPlaced}</p>
              </div>
              <div className="stat-box">
                <p className="stat-label">DELIVERED</p>
                <p className="stat-value">{profile.stats.ordersDelivered}</p>
              </div>
            </div>

            {profile.role === 'deliverer' && (
              <div className="earnings-box border-box">
                <p className="stat-label">EARNINGS</p>
                <p className="stat-value highlight-green">PKR {profile.stats.earnings}</p>
              </div>
            )}

            <p className="section-label">RECENT ACTIVITY</p>
            <div className="activity-list border-box">
              {profile.recentActivity?.map((activity) => (
                <div key={activity.id} className="activity-item">
                  {activity.label}
                </div>
              ))}
              {(!profile.recentActivity || profile.recentActivity.length === 0) && (
                <p className="muted-text margin-0">NO RECENT ACTIVITY</p>
              )}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;

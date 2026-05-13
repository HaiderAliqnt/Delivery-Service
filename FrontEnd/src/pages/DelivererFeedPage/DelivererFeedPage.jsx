import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';

import {
  getFeed,
  getAvailableBatches
} from "../../api/deliverer.js";

import "../ErrorPanel/ErrorPanel.css";
import './DelivererFeedPage.css';

import { storeOrderID } from '../../utils/auth';


function DelivererFeedPage() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [batches, setBatches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();

  const location = searchParams.get("location");




  useEffect(() => {

    if (!location) {
      setOrders([]);
      setBatches([]);
      return;
    }

    let isActive = true;

    setLoading(true);
    setError(null);

    const fetchFeed = async () => {

      try {

        // FETCH SINGLE ORDERS
        const ordersData = await getFeed(location);

        // FETCH BATCHES
        const batchesData = await getAvailableBatches();

        console.log("BATCHES:", batchesData);

        if (isActive) {

          setOrders(ordersData);

          // IMPORTANT
          setBatches(batchesData.batches || []);

          setLoading(false);
        }

      } catch (err) {

        console.error(err);

        if (isActive) {

          setError("FAILED TO LOAD RECENT ORDERS.");

          setLoading(false);
        }
      }
    };

    // INITIAL FETCH
    fetchFeed();

    // AUTO REFRESH
    const interval = setInterval(
      fetchFeed,
      5000
    );

    return () => {

      isActive = false;

      clearInterval(interval);
    };

  }, [location]);




  const handleClaim = (orderId) => {

    storeOrderID(orderId);

    navigate(`/order-confirmation/${orderId}`);
  };




  const handleViewBatch = (batchId) => {

    navigate(`/batch/${batchId}`);
  };


  return (

    <div className="page-container">

      <NavBar title="FEED" />

      <div className="feed-content">


        <p className="section-label">
          AVAILABLE BATCHES
        </p>

        {loading && batches.length === 0 && (
          <LoadingPixel />
        )}

        {!loading && batches.length === 0 && (
          <p className="muted-text">
            NO BATCHES AVAILABLE
          </p>
        )}

        {!error && batches.length > 0 && (

          <div className="feed-list">

            {batches.map((batch) => (

              <div
                key={batch.batch_id}
                className="order-card"
              >

                <p>
                  GROUP: {batch.groupname}
                </p>

                <p>
                  TOTAL: Rs {batch.total_price}
                </p>

                <p>
                  STATUS: {batch.status}
                </p>

                <button
                  onClick={() =>
                    handleViewBatch(batch.batch_id)
                  }
                >
                  VIEW BATCH
                </button>

              </div>
            ))}

          </div>
        )}


        <p className="section-label">
          AVAILABLE ORDERS
        </p>

        {loading && orders.length === 0 && (
          <LoadingPixel />
        )}

        {error && (
          <div className="error-panel">
            {error}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <p className="muted-text">
            NO OPEN ORDERS YET
          </p>
        )}

        {!error && orders.length > 0 && (

          <div className="feed-list">

            {orders.map((order) => (

              <OrderCard
                key={order.order_id}
                order={order}
                onClaim={() =>
                  handleClaim(order.order_id)
                }
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default DelivererFeedPage;
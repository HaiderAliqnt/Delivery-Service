import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';

import "../ErrorPanel/ErrorPanel.css";
import './MyDeliveryPage.css';

import {
  getDelivererIdFromToken,
  storeOrderID
} from '../../utils/auth';

import {
  getMyOpenDeliveries,
  getStatus
} from '../../api/orders.js';


function MyDeliveryPage() {

  const navigate = useNavigate();

  const user_id = getDelivererIdFromToken();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  useEffect(() => {

    if (!user_id) {

      setOrders([]);

      return;
    }

    let isActive = true;

    setLoading(true);

    setError(null);

    const fetchMyOrders = async () => {

      try {

        const data = await getMyOpenDeliveries(user_id);

        if (isActive) {

          setOrders(data.orders);

          setLoading(false);
        }

      } catch (err) {

        console.error(err);

        if (isActive) {

          setError("FAILED TO LOAD YOUR ORDERS.");

          setLoading(false);
        }
      }
    };

    // INITIAL FETCH
    fetchMyOrders();

    // AUTO REFRESH
    const interval = setInterval(
      fetchMyOrders,
      5000
    );

    return () => {

      isActive = false;

      clearInterval(interval);
    };

  }, [user_id]);


const handleOrderClick = async (orderId) => {

    try {

      // STORE CURRENT ORDER
      storeOrderID(orderId);

      // FETCH LATEST STATUS
      const data = await getStatus(orderId);
      console.log(data)
        
      const status = data.order_status.status;
      console.log(status)
    
      // REDIRECT BASED ON STATUS
      switch (status) {

         case "assigned":

          navigate(`/order/confirmed`);
          break;


        case "picked_up":

          navigate(`/order/deliverer/picked`);
          break;


        case "delivered":

          navigate(`/order/delivered`);
          break;


        default:

          navigate(``);
      }

    } catch (err) {

      console.error(
        "Failed to navigate order:",
        err
      );
    }
  };


  return (

    <div className="page-container">

      <NavBar title="MY DELIVERIES" />

      <div className="feed-content">

        <p className="section-label">
          YOUR ONGOING DELIVERIES
        </p>


        {/* LOADING */}

        {loading && orders.length === 0 && (
          <LoadingPixel />
        )}


        {/* ERROR */}

        {error && (
          <div className="error-panel">
            {error}
          </div>
        )}


        {/* EMPTY */}

        {!loading && !error && orders.length === 0 && (

          <p className="muted-text">
            NO OPEN ORDERS YET
          </p>
        )}


        {/* ORDERS */}

        {!error && orders.length > 0 && (

          <div className="feed-list">

            {orders.map((order) => (

              <OrderCard
                key={order.order_id}
                order={order}

                // IMPORTANT
                onClaim={() =>
                  handleOrderClick(order.order_id)
                }
              />
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyDeliveryPage;
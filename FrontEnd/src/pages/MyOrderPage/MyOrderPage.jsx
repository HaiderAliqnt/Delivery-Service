import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import OrderCard from '../../components/OrderCard/OrderCard';
import LoadingPixel from '../../components/LoadingPixel/LoadingPixel';

import "../ErrorPanel/ErrorPanel.css";
import './MyOrderPage.css';

import {
  getCustomerIdFromToken,
  storeOrderID
} from '../../utils/auth';

import {
  getMyOpenOrders,
  getStatus
} from '../../api/orders.js';


function MyOrderPage() {

  const navigate = useNavigate();

  const user_id = getCustomerIdFromToken();

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

        const data = await getMyOpenOrders(user_id);

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

        case "open":

          navigate(`/order/searching`);
          break;


        case "assigned":

          navigate(`/order/assigned`);
          break;


        case "picked_up":

          navigate(`/order/customer/picked`);
          break;


        case "delivered":

          navigate(`/order/customer/delivered`);
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

      <NavBar title="MY ORDERS" />

      <div className="feed-content">

        <p className="section-label">
          YOUR ONGOING ORDERS
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

export default MyOrderPage;
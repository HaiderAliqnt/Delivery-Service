import React, { useState, useEffect } from "react";
import './DeliveredCustomerPage.css';
import { useNavigate } from "react-router-dom";
import { getOrderID , getTime  } from "../../utils/auth";
import { getStatus } from "../../api/orders";
import NavBar from "../../components/NavBar/NavBar";


function DeliveredCustomerPage(){

    const navigate = useNavigate();
    const orderId = getOrderID();
    console.log(orderId)
    const [order , setOrder] = useState(null);
    const [loading , setLoading] =  useState(true);
    

    const time = getTime();

    useEffect(()=>{
    
        if(!orderId) return ;
        
        const fetchOrder = async () => {
            try {
                const data = await getStatus(orderId);
                console.log(data)
                const orderData = data?.order_status ?? data;
                console.log(orderData)
                setOrder(orderData);
                setLoading(false);
            } catch {
                setLoading(false);
            }
        };

        fetchOrder();
    },[orderId])

    const returnBackHome = ()=>{
        navigate("/home"); //goes back to home
    }

    if(loading)return<p>Loading...</p>

    if(!order)return <p>No order found....</p>

    return(
        <>
            <div className="full-page-container">
                <div className="store-name-heading">
                    {order.pickup_location}
                </div>
                <div className="status-display-box">
                    ORDER DELIVERED !!!
                </div>
                <div className="icon-time-display">
                    <div id="icon"></div>
                    <div id="time-box">
                        {time}
                    </div>
                </div>
                <div className="rating-stars">
                    <div className="rating-section-text">
                        RATE DELIVERER'S PERFORMANCE
                    </div>
                    <div className="rating-section-stars">

                    </div>
                </div>
                <div className="navigate-home-button">
                    <button id="navigate-home" onClick={returnBackHome}>ORDER AGAIN</button>
                </div>
            </div>
         


        
        
        </>
    )
    



}
export default DeliveredCustomerPage
import React, { useState, useEffect } from "react";

import './DeliveredCustomerPage.css';

import { useNavigate } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";

import {
    getOrderID,
    getTime,
    getCustomerIdFromToken
} from "../../utils/auth";

import {
    getStatus,addRating
} from "../../api/orders";




function DeliveredCustomerPage() {

    const navigate = useNavigate();

    const orderId = getOrderID();

    const reviewer_id =
        getCustomerIdFromToken();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] =
        useState(true);

    const [score, setScore] =
        useState(0);

    const [feedback, setFeedback] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const time = getTime();


    useEffect(() => {

        if (!orderId) return;

        const fetchOrder = async () => {

            try {

                const data =
                    await getStatus(orderId);

                const orderData =
                    data?.order_status ?? data;

                setOrder(orderData);

                setLoading(false);

            } catch (err) {

                console.error(err);

                setLoading(false);
            }
        };

        fetchOrder();

    }, [orderId]);

    const handleSubmitRating = async () => {

        try {

            if (score === 0) {

                setMessage(
                    "PLEASE SELECT A RATING"
                );

                return;
            }

            setSubmitting(true);
            console.log({
                order_id: orderId,
                reviewer_id,
                reviewee_id: order.deliverer_id,
                score,
                feedback
                });

            await addRating({

                order_id: orderId,

                reviewer_id,

                reviewee_id:
                    order.deliverer_id,

                score,

                feedback
            });

            setMessage(
                "RATING SUBMITTED"
            );

            setSubmitting(false);

        } catch (err) {

            console.error(err);

            setMessage(
                "FAILED TO SUBMIT RATING"
            );

            setSubmitting(false);
        }
    };




    const returnBackHome = () => {

        navigate("/home");
    };


    if (loading) {

        return <p>Loading...</p>;
    }




    if (!order) {

        return <p>No order found....</p>;
    }




    return (

        <>

            <div className="full-page-container">

                <NavBar title="ORDER COMPLETE" />


                {/* STORE */}

                <div className="store-name-heading">

                    {order.pickup_location}

                </div>


                {/* STATUS */}

                <div className="status-display-box">

                    ORDER DELIVERED !!!

                </div>


                {/* TIME */}

                <div className="icon-time-display">

                    <div id="icon"></div>

                    <div id="time-box">

                        {time}

                    </div>
                </div>


                {/* RATING */}

                <div className="rating-stars">

                    <div className="rating-section-text">

                        RATE DELIVERER'S PERFORMANCE

                    </div>


                    {/* STARS */}

                    <div className="rating-section-stars">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <span
                                key={star}

                                onClick={() =>
                                    setScore(star)
                                }

                                style={{
                                    cursor: "pointer",
                                    fontSize: "2rem",
                                    color:
                                        star <= score
                                            ? "gold"
                                            : "gray"
                                }}
                            >
                                ★
                            </span>
                        ))}

                    </div>


                    {/* FEEDBACK */}

                    <textarea
                        className="feedback-box"

                        placeholder="OPTIONAL FEEDBACK"

                        value={feedback}

                        onChange={(e) =>
                            setFeedback(
                                e.target.value
                            )
                        }
                    />


                    {/* SUBMIT */}

                    <button
                        className="submit-rating-button"

                        onClick={
                            handleSubmitRating
                        }

                        disabled={submitting}
                    >
                        {submitting
                            ? "SUBMITTING..."
                            : "SUBMIT RATING"}
                    </button>


                    {/* MESSAGE */}

                    {message && (

                        <p className="rating-message">

                            {message}

                        </p>
                    )}

                </div>


                {/* HOME BUTTON */}

                <div className="navigate-home-button">

                    <button
                        id="navigate-home"

                        onClick={returnBackHome}
                    >
                        ORDER AGAIN
                    </button>

                </div>

            </div>

        </>
    );
}

export default DeliveredCustomerPage;
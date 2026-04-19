import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './title_page.css'
import pixelart1 from './pixelart1.png'; 

function Title_page(){

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/signin'); 
        }
        , 3000);
        return () => clearTimeout(timer);
        }, [navigate]);
    



    return (
        <>
            <div id="title-page-container">
                <div id="title-page">
                    <div id="title-section">
                        <h1>GIK GO!</h1>
                    </div>
                    <div id="avatar-section">
                        <div id="avatar-container">
                            <img src={pixelart1} id="avatar"></img>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )




}
export default Title_page
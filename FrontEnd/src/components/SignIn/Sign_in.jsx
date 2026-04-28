import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from '../../utils/auth';
import './sign_in.css'
import { FETCH_URL } from '../../layout.jsx';

function SignIN_page() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

    const SignIN_func = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${FETCH_URL}/user/login`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    phone_number: phone,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Request failed");
            }

            if (data.success) {
                setAuth(data.token, data.role);
                navigate('/home');
            } else {
                alert(data.message || "Invalid credentials");
            }

        } catch (error) {
            console.error("Login Failed", error);
            alert(error.message || "Server Error");
        }
    };

  return(
    <>
        <div id="Signin-box-container">
            <div id="signin-title">
                <h1>SIGN IN</h1>
            </div>
            <div id="Signin-box">
                <div id="text-boxes">
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className='user_details' placeholder='PHONE NUMBER'></input>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='user_details' placeholder='PASSWORD'></input>
                </div>
                <div id="signin-enter-button-section">
                    <button id="signin-enter-button" onClick={SignIN_func}>ENTER</button>
                </div>
                <div id="create-account-section">
                    <h4 id="first-time">FIRST TIME?</h4>
                    <Link to="/signup" className="signup-link">
                        <button id="create-account-button">SIGNUP</button>
                    </Link>
                </div>
            </div>
        </div> 
    </>
  )
}

export default SignIN_page
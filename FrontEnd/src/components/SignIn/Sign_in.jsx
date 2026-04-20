import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from '../../utils/auth';
import './sign_in.css'

function SignIN_page() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  function SignIN_func() {
    // Mock successful login
    setAuth('mock-token-from-signin', 'customer');
    navigate('/home');
  }

  return(
    <>
        <div id="Signin-box-container">
            <div id="signin-title">
                <h1>SIGN IN</h1>
            </div>
            <div id="Signin-box">
                <div id="text-boxes">
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className='user_details' placeholder='PHONE NUMBER'></input>
                    <input type="text" value={otp} onChange={e => setOtp(e.target.value)} className='user_details' placeholder='OTP'></input>
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

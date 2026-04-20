import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.css'

function SignUP_page() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSignUp = () => {
    // Navigate back to login since signup is simulated
    navigate('/login');
  };

  return (
    <>
        <div id="Sign-up-container">
            <div id="signup-page">
                <h1 id="signup-text">SIGN UP</h1>
                <div id="signup-text-boxes">
                    <input type="text" placeholder='USERNAME' value={username} onChange={e => setUsername(e.target.value)} className='user-signup-details'></input>
                    <input type="text" placeholder='PHONE NUMBER' value={phone} onChange={e => setPhone(e.target.value)} className='user-signup-details'></input>
                    <input type="text" placeholder='OTP' value={otp} onChange={e => setOtp(e.target.value)} className='user-signup-details'></input>
                </div>
                <div id="sigunp-enter-button-container">
                    <button id="sign-up-enter-button" onClick={handleSignUp}>ENTER</button>
                </div>
            </div>  
        </div>  
    </>
  )
}

export default SignUP_page
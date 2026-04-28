import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.css'
import { FETCH_URL } from '../../layout.jsx';
import { setAuth } from '../../utils/auth.js';

function SignUP_page() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async(e) => {
    // Navigate back to login since signup is simulated

    e.preventDefault();
    try{

        if (!username || !phone || !password) {
            alert("All fields required");
            return;
        }
        const response = await fetch(`${FETCH_URL}/user/signup`,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify({
                name: username , 
                password,
                phone_number: phone  
               })
        });

        if(!response.ok){
            throw new Error("Request Failed");
        }
        const data = await response.json();

        if (data.success) {
            setAuth(data.token , data.role);
            navigate('/home');
        }else{
            alert(data.message || "Invalid credentials");
        }
    }catch(error){
        console.error("Signup Failed" , error);
        alert("Server Error");  
    }
    };

  return (
    <>
        <div id="Sign-up-container">
            <div id="signup-page">
                <h1 id="signup-text">SIGN UP</h1>
                <div id="signup-text-boxes">
                    <input type="text" placeholder='USERNAME' value={username} onChange={e => setUsername(e.target.value)} className='user-signup-details'></input>
                    <input type="text" placeholder='PHONE NUMBER' value={phone} onChange={e => setPhone(e.target.value)} className='user-signup-details'></input>
                    <input type="password" placeholder='PASSWORD' value={password} onChange={e => setPassword(e.target.value)} className='user-signup-details'></input>
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
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './sign_in.css'

function SignIN_page() {
  const [count, setCount] = useState(0)

  function SignIN_func(){

  }
  function create_Redirect(){

  }


  return(
    <>
        <div id="Signin-box-container">
            <div id="signin-title">
                <h1>SIGN IN</h1>
            </div>
            <div id="Signin-box">
                <div id="text-boxes">
                    <input type="text" value="" className='user_details' placeholder='PHONE NUMBER'></input>
                    <input type="text" value="" className='user_details' placeholder='OTP'></input>
                </div>
                <div id="signin-enter-button-section">
                    <button id="signin-enter-button" onClick={SignIN_func()}>ENTER</button>
                </div>
                <div id="create-account-section">
                    <h4  id="first-time">FIRST TIME?</h4>
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
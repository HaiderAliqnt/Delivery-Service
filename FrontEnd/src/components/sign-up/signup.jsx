import {usestate} from 'react'
import './signup.css'

function SignUP_page(){

return (

    <>
        <div id="Sign-up-container">
            <div id="signup-page">
                <h1 id="signup-text">SIGN UP</h1>
                <div id="signup-text-boxes">
                    <input type="text" placeholder='USERNAME' value="" className='user-signup-details'></input>
                    <input type="text" placeholder='PHONE NUMBER' value="" className='user-signup-details'></input>
                    <input type="text" placeholder='OTP' value='' className='user-signup-details'></input>
                </div>
                <div id="sigunp-enter-button-container">
                    <button id="sign-up-enter-button">ENTER</button>
                </div>
            </div>  
        </div>  
    </>
)


}
export default SignUP_page
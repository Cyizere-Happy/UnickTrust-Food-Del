import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../content/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import TourGuide from '../webTourGuide/TourGuide'

const LoginPopup = ({ setShowLogin }) => {
   
  const [currState, setCurrState] = useState("Sign Up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const { url, setToken } = useContext(StoreContext)
   
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
     
  const onLogin = async(event) => {
    event.preventDefault();
    console.log("Login form submitted with data:", data);
    console.log("Current state:", currState);
    
    let newUrl = url;
    if(currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    console.log("API endpoint:", newUrl);
    
    try {
      console.log("Sending request to server...");
      const response = await axios.post(newUrl, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Server response:", response);
      
      if(response.data.success) {
        console.log("Login/registration successful");
        console.log("Token received:", response.data.token);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(response.data.message)

        if (!response.data.hasSeenGuide || currState === "Sign Up") {
          localStorage.removeItem("authHasCompletedTour");
        }

      } else {
        console.error("Operation failed:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("API call failed", error);
      
      if (error.response) {
        // The server responded with an error
        console.error("Server error data:", error.response.data);
        console.error("Server error status:", error.response.status);
        alert(`Error: ${error.response.data.message || "Request failed"}`);
      } else if (error.request) {
        // The request was made but no response received
        console.error("No response received");
        alert("Server didn't respond. Please check if it's running.");
      } else {
        // Something else caused the error
        console.error("Request setup error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }

  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required/>
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Click here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
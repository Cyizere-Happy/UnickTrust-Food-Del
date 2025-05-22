import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../content/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { url, setToken } = useContext(StoreContext);

  // Clear form when switching between Login and Sign Up
  useEffect(() => {
    setData({ name: "", email: "", password: "" });
  }, [currState]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    console.log("Login form submitted with data:", data);
    console.log("Current state:", currState);

    let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(`${url}${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Server response:", response);

      if (response.data.success) {
        toast.success(response.data.message);

        if (currState === "Login") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);

          // Reset tour guide if needed
          if (!response.data.hasSeenGuide || currState === "Sign Up") {
            localStorage.removeItem("authHasCompletedTour");
          }
        }
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("API call failed:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Request failed"}`);
      } else if (error.request) {
        toast.error("Server is currently down. Try again later 😁");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input
              name='name'
              autoComplete="off"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            autoComplete="off"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Your email'
            required
          />
          <input
            name='password'
            autoComplete="off"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms of use &{' '}
            <NavLink to="/privacy-policy"><span>privacy policy</span></NavLink>.
          </p>
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        {currState === "Login" ? (
          <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Click here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

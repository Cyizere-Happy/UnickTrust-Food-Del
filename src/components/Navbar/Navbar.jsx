import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../content/StoreContext';
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { cartItems, getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
  const [colorChange, setColorChange] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 40 ? setColorChange(true) : setColorChange(false)
    })
  }, []);

  // Safely calculate cart amount only when food_list is loaded
  useEffect(() => {
    if (food_list && food_list.length > 0) {
      try {
        const amount = getTotalCartAmount();
        setCartAmount(amount);
      } catch (error) {
        console.error("Error calculating cart amount:", error);
        setCartAmount(0);
      }
    }
  }, [food_list, cartItems, getTotalCartAmount]);
  
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    localStorage.removeItem("nonAuthHasCompletedTour")
    toast.success("Loged out successfully")
  }

  // Count items in cart (alternative way to check if cart is empty)
  const hasItemsInCart = Object.values(cartItems).some(quantity => quantity > 0);
  const goToHeader = ()=>{
    const section = document.getElementById('header')
    setTimeout(() => {
      if(section){
        section.scrollIntoView({behavior: 'smooth'})
      }
    }, 100);
  }

  return (
    <div className={`navbar ${colorChange ? 'dark-navbar' : ''}`}>
      <div className="navbar-inner">
        <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>

        <ul className={`navbar-menu ${colorChange ? 'dark-navbar' : ''}`}>
          <Link to='/' onClick={() => {setMenu('home')
             goToHeader()}} className={menu === "home" ? "active" : ""}><a href='#header' >Home</a></Link>
          <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === "menu" ? "active" : ""}>Menu</a>
          <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
          <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
        </ul>

        <div className={`navbar-right ${colorChange ? 'dark-navbar' : ''}`}>
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={colorChange ? assets.cart_2 : assets.cart_1} alt="cart" className='cart-img'/></Link>
            <div className={hasItemsInCart ? "dot" : ""}></div>
          </div>
          {!token ? 
            <button onClick={() => setShowLogin(true)}>Sign-in</button>
            :
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li><img src={assets.bag_icon} alt="" /><p>orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;

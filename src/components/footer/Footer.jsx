import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className='footer' >
       <div className="footer-content">
        <div className="footer-content-left "  id='footer'>
            <img src={assets.logo} alt="" />
            <p>UnickTrust is a digital menu system that lets customers view and order from a restaurant’s menu by scanning a QR code. It helps restaurants update menus in real time, track orders, manage stock, and connect with delivery services — all from one platform.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-right">
              <h2>Navigation</h2>
              <ul>
                <li><a href='#header'>Home</a></li>
                <li><a href='#explore-menu'>Menu</a></li>
                <li><a href='/order'>Delivery</a></li>
                <li><Link to='/privacy-policy'>Privacy policy</Link></li>
              </ul>
        </div>
        <div className="footer-content-center">
             <h2>Get In Touch</h2>
             <ul>
                <li><a href="tel:+250788507076 ">Call Us</a></li>
                <li><a href="mailto:happycyizere69@gmail.com">Email Us</a></li>
             </ul>
        </div>
       </div>
       <hr />
       <p className="footer-copyright">Copyright 2025 @ UnickTrust - All Right Reserved.</p>
    </div>
  )
}

export default Footer

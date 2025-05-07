import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header' id='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Explore a wide variety of dishes made with the finest ingredients. Whether you're craving something sweet or savory, our menu has something to satisfy every taste. Treat yourself to the best flavors today!</p>
        <a href="#explore-menu" className="view-menu-button">View Menu</a>
      </div>
    </div>
  )
}

export default Header



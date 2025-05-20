import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
    <div className='sidebar'>
      <img src={assets.logo} alt="" className='logo'/>
      <div className="sidebar-options">
  <h2>You</h2>
  <hr />
  <NavLink to='/profile' className="side-option">
    <img src={assets.profile_image} alt="" />
    <p>Profile</p>
  </NavLink>
  <NavLink to='/notifications' className="side-option">
    <img src={assets.notification} alt="" />
    <p>Notifications</p>
  </NavLink>
</div>


      
      <div className="sidebar-options">
        <h2>Food Section</h2>
        <hr />
        <NavLink to='/add' className="side-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Food</p>
        </NavLink>
        <NavLink to='/list' className="side-option">
          <img src={assets.list_icon} alt="" />
          <p>List Food</p>
        </NavLink>
        <NavLink to='/orders' className="side-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>

      <div className="sidebar-options">
        <h2>Stock Management</h2>
        <hr />
        <NavLink to='/add-items' className="side-option">
          <img src={assets.add_item} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list-items' className="side-option">
          <img src={assets.list_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/analytics' className="side-option">
          <img src={assets.analytics} alt="" />
          <p>Analytics</p>
        </NavLink>
      </div>
    </div>
    </>
  )
}

export default Sidebar

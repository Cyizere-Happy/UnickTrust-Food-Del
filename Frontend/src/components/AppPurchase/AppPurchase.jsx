import React from 'react'
import './AppPurchase.css'
import { assets } from '../../assets/assets'

const AppPurchase = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For better Experience Download <br></br> Unick | Food del</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}

export default AppPurchase

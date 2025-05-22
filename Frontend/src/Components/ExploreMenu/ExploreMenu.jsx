import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Discover a world of flavors with our carefully curated menu. From savory dishes to sweet treats, we’ve got something to satisfy every craving. Explore and order with ease, and enjoy a seamless dining experience.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>{ setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}}key={index} className="explore-menu-list-item">
                        <img className={category==item.menu_name?"active":""} src={item.menu_image} alt="" id="#category-button"/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div> 
        <hr />
    </div>
  )
}

export default ExploreMenu

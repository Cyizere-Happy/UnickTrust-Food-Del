import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppPurchase from '../../components/AppPurchase/AppPurchase'

const Home = ({ setShowLogin }) => {
    const [category,setCategory] = useState("All")
  return (
    <div>
      < Header />
      < ExploreMenu  category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} setShowLogin={setShowLogin}/>
      <AppPurchase />
    </div>
  )
}

export default Home

import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../content/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { assets } from '../../assets/assets';

const FoodDisplay = ({ category, setShowLogin }) => {
    const { food_list, token } = useContext(StoreContext);
    if (token){
        return (
            <div className='food-display' id='food-display'>
                <h2>Top dishes near you</h2>
                <div className="food-display-list">
                    {food_list
                        .filter(item => category === "All" || category === item.category)
                        .map((item, index) => (
                            <FoodItem
                                key={item.id}
                                id={item.id}
                                description={item.description}
                                price={item.price}
                                image={`http://localhost:5790/images/${item.image}`}
                                name={item.name}
                            />
                        ))}
                </div>
            </div>
        );
    }else if(!token || !food_list){
        return(
            <div className="signup">
                <div className="right">
                <img src={assets.Sign_up} alt="" />
                </div>
                <div className="left">
                    <h2>Once you sign up, you'll be able to browse the full menu, see detailed photos of each dish, and place your order instantly—all from your device!</h2>
                    <button onClick={()=>{
                        setShowLogin(true)
                    }} className='left-button'>Sign Up</button>
                </div>
            </div>
        )
    }
};

export default FoodDisplay;

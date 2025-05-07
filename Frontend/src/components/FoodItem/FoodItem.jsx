import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../content/StoreContext';
import StarRating from '../StarRating/StarRating';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, token } = useContext(StoreContext);
  
  // Make sure we're using the correct ID format
  const itemId = id;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={image} className='food-item-image' alt={name} />
        {!cartItems[itemId] || cartItems[itemId] <= 0
          ? <img 
              src={assets.add_icon_white} 
              onClick={() => addToCart(itemId)} 
              alt='Add to cart' 
              className='add' 
            />
          : <div className='food-item-counter'>
              <img 
                onClick={() => removeFromCart(itemId)} 
                src={assets.remove_icon_red} 
                alt="Remove item" 
                className='remove-icon'
              />
              <p>{cartItems[itemId]}</p>
              <img 
                onClick={() => addToCart(itemId)} 
                src={assets.add_icon_green} 
                alt='Add item' 
              />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {!token? <img src={assets.rating_starts} alt='Rating' /> : <StarRating /> }
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
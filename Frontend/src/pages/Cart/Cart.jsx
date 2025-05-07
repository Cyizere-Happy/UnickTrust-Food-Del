import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../content/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';


const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, isLoading, url, token } = useContext(StoreContext);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && food_list.length > 0) {
      try {
        const total = getTotalCartAmount();
        setCartTotal(total);
      } catch (error) {
        console.error("Error calculating cart total:", error);
        setCartTotal(0);
      }
    }
  }, [food_list, cartItems, getTotalCartAmount, isLoading]);



  // Check if cart is empty
  const hasItems = Object.values(cartItems).some(quantity => quantity > 0);
  const continueShopping = ()=>{
    navigate('/')
    setTimeout(()=>{
      const section = document.getElementById('explore-menu')
      if(section){
        section.scrollIntoView({behavior: 'smooth'})
      } 
    },100)
   }

  if (!hasItems || isLoading  || !token) {
    return (
      <div className="cart-container">
         <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <img src={assets.empty_cart} />
        <p>Oops! Nothing here yet. Let’s fix that with something delicious.</p>
        <button onClick={() => continueShopping()}>Continue Shopping</button>
      </div>
      </div>
    );
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        
        {food_list.map((item) => {
          // Handle both ID formats
          const itemId = item._id || item.id;
          
          if (cartItems[itemId] && cartItems[itemId] > 0) {
            return (
              <div key={itemId}>
                <div className='cart-items-title cart-items-item'>
                  <img src={`http://localhost:5790/images/${item.image}`} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[itemId]}</p>
                  <p>${item.price * cartItems[itemId]}</p>
                  <p className='cross' onClick={() => removeFromCart(itemId)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${cartTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>$2</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${cartTotal + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
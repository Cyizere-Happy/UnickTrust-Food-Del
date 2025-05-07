import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './NotFound.css'

const NotFound = () => {
  return (
    <div>
      <div className="wave-header">
        <div className="main">
          <div className="container">
            <h3>Oops!</h3>
            <img src={assets.NotFound} alt="404 Error Illustration" />
            <h2>Looks like you're lost!</h2>
            <p>The page you're looking for is not available</p>
            <button>
              <Link to='/'>Go back</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './StarRating.css'; // Import the CSS file

const StarRating = () => {
  const [rating, setRating] = useState(0); // To store the selected rating

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <label key={index} className={`star ${rating > index ? 'filled' : ''}`}>
          <input
            type="radio"
            name="rating"
            value={index + 1}
            onClick={() => setRating(index + 1)} // Set the rating on click
            style={{ display: 'none' }} // Hide the actual radio button
          />
          <Star className="star-icon" size={12} />
        </label>
      ))}
    </div>
  );
};

export default StarRating;

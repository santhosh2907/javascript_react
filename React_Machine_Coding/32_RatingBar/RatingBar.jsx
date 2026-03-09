import React from 'react';
import './RatingBar.css';

const RatingBar = ({ ratings = { 5: 50, 4: 30, 3: 10, 2: 5, 1: 5 } }) => {
  const total = Object.values(ratings).reduce((a, b) => a + b, 0);
  const starsArray = [5, 4, 3, 2, 1];
  return (
    <div className="ratingbar-container">
      <h2>Reviews</h2>
      {starsArray.map(star => (
        <div key={star} className="rating-row">
          <span>{star} ⭐</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(ratings[star] / total) * 100}%` }} />
          </div>
          <span>{ratings[star]}</span>
        </div>
      ))}
    </div>
  );
};
export default RatingBar;

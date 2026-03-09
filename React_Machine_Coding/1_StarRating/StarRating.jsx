import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating-container">
            <h2>Star Rating Component</h2>
            <div className="star-rating">
                {(() => {
                    const starsArray = [];
                    for (let i = 1; i <= totalStars; i++) starsArray.push(i);
                    return starsArray.map((index) => {
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= (hover || rating) ? 'on' : 'off'}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <span className="star">&#9733;</span>
                            </button>
                        );
                    });
                })()}
            </div>
            <p>Rating: {rating} out of {totalStars}</p>
        </div>
    );
};

export default StarRating;

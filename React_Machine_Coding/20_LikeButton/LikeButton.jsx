import React, { useState } from 'react';
import './LikeButton.css';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="likebutton-container">
      <button className={liked ? 'liked' : ''} onClick={() => setLiked(!liked)}>
        {liked ? '❤️ Liked' : '🤍 Like'}
      </button>
    </div>
  );
};
export default LikeButton;

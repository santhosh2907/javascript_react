import React, { useState } from 'react';
import './ImageZoomHover.css';

const ImageZoomHover = () => {
  const [style, setStyle] = useState({});
  const handleMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(1.5)' });
  };
  return (
    <div className="zoom-container">
      <div className="img-wrapper" onMouseMove={handleMove} onMouseLeave={() => setStyle({transform: 'scale(1)'})}>
        <img src="https://via.placeholder.com/300x200" alt="mock" style={style} />
      </div>
    </div>
  );
};
export default ImageZoomHover;

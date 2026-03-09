import React, { useState } from 'react';
import './RangeSlider.css';

const RangeSlider = () => {
  const [val, setVal] = useState(50);
  return (
    <div className="rangeslider-container">
      <h2>Range Slider: {val}</h2>
      <input type="range" min="0" max="100" value={val} onChange={e => setVal(e.target.value)} />
    </div>
  );
};
export default RangeSlider;

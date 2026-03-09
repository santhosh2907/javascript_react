import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ text = "I am a tooltip!" }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="tooltip-container" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <span>Hover me</span>
      {show && <div className="tooltip-box">{text}</div>}
    </div>
  );
};
export default Tooltip;

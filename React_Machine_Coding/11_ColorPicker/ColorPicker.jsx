import React, { useState } from 'react';
import './ColorPicker.css';

const ColorPicker = () => {
  const [color, setColor] = useState('#000000');

  return (
    <div className="colorpicker-container" style={{ backgroundColor: color }}>
      <span style={{ color: '#fff', mixBlendMode: 'difference' }}>Color Picker Component</span>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <p style={{ color: '#fff', mixBlendMode: 'difference' }}>Selected: {color}</p>
    </div>
  );
};
export default ColorPicker;

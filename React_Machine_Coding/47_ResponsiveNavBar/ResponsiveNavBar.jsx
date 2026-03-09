import React, { useState } from 'react';
import './ResponsiveNavBar.css';

const ResponsiveNavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="logo">Brand</div>
      <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li>Home</li><li>About</li><li>Services</li><li>Contact</li>
      </ul>
    </nav>
  );
};
export default ResponsiveNavBar;

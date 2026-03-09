import React, { useState } from 'react';
import './NestedDropdown.css';

const NestedDropdown = () => {
  return (
    <div className="nesteddropdown-container">
      <ul className="menu">
        <li>Item 1</li>
        <li>Item 2 <span>&raquo;</span>
          <ul className="submenu">
            <li>Sub 1</li>
            <li>Sub 2</li>
          </ul>
        </li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};
export default NestedDropdown;

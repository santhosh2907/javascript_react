import React, { useState, useEffect } from 'react';
import './ContextMenu.css';

const ContextMenu = () => {
  const [pos, setPos] = useState({ x: 0, y: 0, show: false });

  const handleContext = (e) => {
    e.preventDefault();
    setPos({ x: e.pageX, y: e.pageY, show: true });
  };

  useEffect(() => {
    const close = () => setPos(p => ({ ...p, show: false }));
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  return (
    <div className="contextmenu-container" onContextMenu={handleContext}>
      <h2>Right click anywhere here</h2>
      {pos.show && (
        <ul className="context-menu" style={{ top: pos.y, left: pos.x }}>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
  );
};
export default ContextMenu;

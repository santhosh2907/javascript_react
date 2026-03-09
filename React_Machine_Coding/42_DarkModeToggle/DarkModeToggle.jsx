import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [dark]);
  return (
    <div className={`darkmode-container ${dark ? 'dark' : 'light'}`}>
      <h2>{dark ? 'Dark Mode' : 'Light Mode'} Active</h2>
      <button onClick={() => setDark(!dark)}>Toggle Theme</button>
    </div>
  );
};
export default DarkModeToggle;

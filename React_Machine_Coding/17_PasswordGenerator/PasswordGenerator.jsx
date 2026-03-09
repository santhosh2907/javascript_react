import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = () => {
  const [pwd, setPwd] = useState('');
  const [len, setLen] = useState(12);

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let res = '';
    for(let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setPwd(res);
  };

  return (
    <div className="passwordgenerator-container">
      <h2>Password Generator</h2>
      <div className="pwd-display">{pwd || 'Generate a password'}</div>
      <div><label>Length: {len}</label><input type="range" min="6" max="32" value={len} onChange={e => setLen(e.target.value)} /></div>
      <button onClick={generate}>Generate Password</button>
    </div>
  );
};
export default PasswordGenerator;

import React, { useState } from 'react';
import './useLocalStorageHook.css';

const useLocalStorage = (key, initialVal) => {
  const [val, setVal] = useState(() => {
    try { const item = window.localStorage.getItem(key); return item ? JSON.parse(item) : initialVal; } catch(e) { return initialVal; }
  });
  const setValStorage = (v) => { setVal(v); window.localStorage.setItem(key, JSON.stringify(v)); };
  return [val, setValStorage];
};

const UseLocalStorageDemo = () => {
  const [name, setName] = useLocalStorage('name', 'Guest');
  return (
    <div className="uselocalstorage-container">
      <h2>useLocalStorage Demo</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
      <p>Hello, {name}! (Refresh to see it persisted)</p>
    </div>
  );
};
export default UseLocalStorageDemo;

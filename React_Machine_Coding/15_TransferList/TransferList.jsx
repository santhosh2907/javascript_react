import React, { useState } from 'react';
import './TransferList.css';

const TransferList = () => {
  const [left, setLeft] = useState(['Apple', 'Banana', 'Cherry']);
  const [right, setRight] = useState(['Date']);
  const [checked, setChecked] = useState([]);

  const handleCheck = (item) => {
    setChecked(checked.includes(item) ? checked.filter(i => i !== item) : [...checked, item]);
  };

  const moveRight = () => {
    const toMove = left.filter(item => checked.includes(item));
    setRight([...right, ...toMove]);
    setLeft(left.filter(item => !checked.includes(item)));
    setChecked(checked.filter(item => !toMove.includes(item)));
  };

  const moveLeft = () => {
    const toMove = right.filter(item => checked.includes(item));
    setLeft([...left, ...toMove]);
    setRight(right.filter(item => !checked.includes(item)));
    setChecked(checked.filter(item => !toMove.includes(item)));
  };

  return (
    <div className="transferlist-container">
      <div className="list">
        {left.map(item => (
          <div key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => handleCheck(item)} /> {item}</div>
        ))}
      </div>
      <div className="actions">
        <button onClick={moveRight}>{'>'}</button>
        <button onClick={moveLeft}>{'<'}</button>
      </div>
      <div className="list">
        {right.map(item => (
          <div key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => handleCheck(item)} /> {item}</div>
        ))}
      </div>
    </div>
  );
};
export default TransferList;

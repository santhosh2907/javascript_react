import React, { useState } from 'react';
import './MemoryGame.css';

const initialCards = [
  { id: 0, val: 1, flipped: false },
  { id: 1, val: 2, flipped: false },
  { id: 2, val: 3, flipped: false },
  { id: 3, val: 4, flipped: false },
  { id: 4, val: 1, flipped: false },
  { id: 5, val: 2, flipped: false },
  { id: 6, val: 3, flipped: false },
  { id: 7, val: 4, flipped: false }
];

const MemoryGame = () => {
  const [cards, setCards] = useState(initialCards);
  return (
    <div className="memorygame-container">
      <h2>Memory Game</h2>
      <div className="grid">
        {cards.map(c => (
          <div key={c.id} className={`card ${c.flipped ? 'flipped' : ''}`}>
            {c.flipped ? c.val : '?'}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MemoryGame;

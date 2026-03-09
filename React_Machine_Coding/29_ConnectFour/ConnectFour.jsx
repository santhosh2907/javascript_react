import React, { useState } from 'react';
import './ConnectFour.css';

const generateEmptyBoard = () => {
  const board = [];
  for (let r = 0; r < 6; r++) {
    const row = [];
    for (let c = 0; c < 7; c++) {
      row.push(null);
    }
    board.push(row);
  }
  return board;
};

const ConnectFour = () => {
  const board = generateEmptyBoard();
  return (
    <div className="connectfour-container">
      <h2>Connect Four</h2>
      <div className="c4-board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="c4-row">
            {row.map((cell, cIdx) => (
              <div key={cIdx} className="c4-cell"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ConnectFour;

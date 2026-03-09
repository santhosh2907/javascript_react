import React, { useState } from 'react';

const initialBoard = [null, null, null, null, null, null, null, null, null];

const TicTacToe = () => {
    const [board, setBoard] = useState(initialBoard);
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const winner = calculateWinner(board);

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    return (
        <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2>Tic Tac Toe</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)', gap: '5px', justifyContent: 'center' }}>
                {board.map((cell, i) => (
                    <button key={i} onClick={() => handleClick(i)} style={{ width: '50px', height: '50px', fontSize: '24px' }}>
                        {cell}
                    </button>
                ))}
            </div>
            <p>{winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`}</p>
            <button onClick={() => setBoard(initialBoard)}>Restart</button>
        </div>
    );
};
export default TicTacToe;

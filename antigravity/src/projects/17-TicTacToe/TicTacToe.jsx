import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: lines[i] };
            }
        }
        return null;
    };

    const handleClick = (i) => {
        if (board[i] || winner) return;

        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    useEffect(() => {
        const result = calculateWinner(board);
        if (result) {
            setWinner(result.winner);
            setWinningLine(result.line);
        } else if (board.every(square => square)) {
            setWinner('Draw');
        }
    }, [board]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
        setWinningLine([]);
    };

    const renderSquare = (i) => {
        const isWinningSquare = winningLine.includes(i);
        return (
            <button
                className={`h-24 sm:h-32 text-4xl sm:text-6xl font-bold flex items-center justify-center rounded-xl shadow-sm transition-all duration-200
          ${!board[i] && !winner ? 'hover:bg-gray-50 active:scale-95' : ''}
          ${isWinningSquare ? 'bg-green-100 text-green-600 ring-4 ring-green-400' : 'bg-white text-gray-700'}
          ${board[i] === 'X' ? 'text-blue-500' : 'text-rose-500'}
        `}
                onClick={() => handleClick(i)}
                disabled={!!board[i] || !!winner}
            >
                {board[i]}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Tic Tac Toe</h1>
                <div className="h-8">
                    {winner ? (
                        <div className={`text-xl font-bold px-4 py-1 rounded-full inline-block animate-bounce ${winner === 'Draw' ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                            {winner === 'Draw' ? 'Game Draw!' : `Winner: ${winner}`}
                        </div>
                    ) : (
                        <div className="text-lg text-gray-600 flex items-center justify-center gap-2">
                            Player <span className={`font-bold ${xIsNext ? 'text-blue-500' : 'text-rose-500'}`}>{xIsNext ? 'X' : 'O'}</span>'s Turn
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-200 p-4 rounded-2xl">
                <div className="grid grid-cols-3 gap-3 w-72 sm:w-96">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i}>{renderSquare(i)}</div>
                    ))}
                </div>
            </div>

            <button
                onClick={resetGame}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-bold rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all active:scale-95"
            >
                <RotateCcw size={20} />
                Restart Game
            </button>
        </div>
    );
};

export default TicTacToe;

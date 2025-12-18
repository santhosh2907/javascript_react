import React, { useState } from 'react';
import { ArrowLeft, Delete } from 'lucide-react';
import { Link } from 'react-router-dom';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handleNumber = (num) => {
        setDisplay(display === '0' ? num : display + num);
        setEquation(equation + num);
    };

    const handleOperator = (op) => {
        setDisplay('0');
        setEquation(equation + ' ' + op + ' ');
    };

    const calculate = () => {
        try {
            // Note: eval is dangerous in production, but for a simple local calculator it's often used for learning.
            // A better approach is writing a parser, but that might be overkill for "Basic Concepts".
            // We'll use a safer Function constructor or just simple eval with constraints.
            // For this project, let's keep it simple but safe-ish by only allowing math chars.
            if (!/^[0-9+\-*/. ]+$/.test(equation)) return;

            const result = Function('"use strict";return (' + equation + ')')();
            setDisplay(String(result));
            setEquation(String(result));
        } catch (e) {
            setDisplay('Error');
            setEquation('');
        }
    };

    const clear = () => {
        setDisplay('0');
        setEquation('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
            <Link to="/" className="absolute top-4 left-4 p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-sm bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
                <div className="p-6 bg-gray-800 h-32 flex flex-col items-end justify-end">
                    <div className="text-gray-400 text-sm mb-1 h-6">{equation}</div>
                    <div className="text-4xl text-white font-bold tracking-wider">{display}</div>
                </div>

                <div className="p-4 grid grid-cols-4 gap-3">
                    <button onClick={clear} className="col-span-3 p-4 bg-gray-700 text-red-400 rounded-2xl hover:bg-gray-600 font-bold transition-colors">AC</button>
                    <button onClick={() => handleOperator('/')} className="p-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 font-bold transition-colors">÷</button>

                    {[7, 8, 9].map(n => (
                        <button key={n} onClick={() => handleNumber(String(n))} className="p-4 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 font-bold transition-colors">{n}</button>
                    ))}
                    <button onClick={() => handleOperator('*')} className="p-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 font-bold transition-colors">×</button>

                    {[4, 5, 6].map(n => (
                        <button key={n} onClick={() => handleNumber(String(n))} className="p-4 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 font-bold transition-colors">{n}</button>
                    ))}
                    <button onClick={() => handleOperator('-')} className="p-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 font-bold transition-colors">-</button>

                    {[1, 2, 3].map(n => (
                        <button key={n} onClick={() => handleNumber(String(n))} className="p-4 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 font-bold transition-colors">{n}</button>
                    ))}
                    <button onClick={() => handleOperator('+')} className="p-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 font-bold transition-colors">+</button>

                    <button onClick={() => handleNumber('0')} className="col-span-2 p-4 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 font-bold transition-colors">0</button>
                    <button onClick={() => handleNumber('.')} className="p-4 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 font-bold transition-colors">.</button>
                    <button onClick={calculate} className="p-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 font-bold transition-colors">=</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;

import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 p-4 flex items-center text-white">
                    <Link to="/" className="p-2 hover:bg-blue-700 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold ml-4">Project 1: Counter</h1>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col items-center">
                    <div className="text-8xl font-bold text-gray-800 mb-8 font-mono">
                        {count}
                    </div>

                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => setCount(count - 1)}
                            className="p-4 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors active:scale-95"
                        >
                            <Minus size={32} />
                        </button>
                        <button
                            onClick={() => setCount(count + 1)}
                            className="p-4 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors active:scale-95"
                        >
                            <Plus size={32} />
                        </button>
                    </div>

                    <button
                        onClick={() => setCount(0)}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Counter;

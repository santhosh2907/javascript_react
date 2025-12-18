import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
import { increment, decrement, incrementByAmount } from './store/counterSlice';
import { ArrowLeft, Plus, Minus, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReduxCounter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <ArrowLeft size={24} />
            </Link>

            <div className="max-w-md w-full bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
                <div className="flex items-center justify-center mb-8">
                    <span className="bg-purple-900 p-3 rounded-xl mr-4">
                        <Zap className="text-purple-400" size={32} />
                    </span>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Redux Toolkit
                    </h1>
                </div>

                <div className="text-center mb-12">
                    <div className="text-8xl font-black font-mono tracking-tighter mb-4 text-white">
                        {count}
                    </div>
                    <p className="text-gray-400 uppercase tracking-widest text-xs font-semibold">Global State Value</p>
                </div>

                <div className="flex gap-4 justify-center mb-8">
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                        className="p-4 bg-gray-700 hover:bg-gray-600 rounded-2xl transition-all active:scale-95"
                    >
                        <Plus size={24} />
                    </button>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                        className="p-4 bg-gray-700 hover:bg-gray-600 rounded-2xl transition-all active:scale-95"
                    >
                        <Minus size={24} />
                    </button>
                </div>

                <div className="bg-gray-900 p-4 rounded-2xl flex items-center gap-4">
                    <input
                        className="w-16 bg-gray-800 border border-gray-700 rounded-lg p-2 text-center focus:outline-none focus:border-purple-500 font-mono"
                        value={incrementAmount}
                        onChange={(e) => setIncrementAmount(e.target.value)}
                    />
                    <button
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
                    >
                        Add Amount
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-xs">
                        State managed by Redux Toolkit slice.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Wrapper to provide store to this isolated component
const ReduxToolkitWrapper = () => {
    return (
        <Provider store={store}>
            <ReduxCounter />
        </Provider>
    );
};

export default ReduxToolkitWrapper;

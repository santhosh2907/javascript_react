import { useRef, useState, useEffect } from 'react';

export default function UseRefAdvanced() {
    // 1. DOM Access
    const inputRef = useRef(null);

    // 2. Mutable Variables (Refs for data that doesn't trigger re-render)
    const timerRef = useRef(null);
    const [count, setCount] = useState(0);

    // 3. Tracking Previous State
    const [text, setText] = useState('');
    const prevTextRef = useRef('');

    useEffect(() => {
        prevTextRef.current = text;
    }, [text]);

    const startTimer = () => {
        if (timerRef.current) return;
        timerRef.current = setInterval(() => {
            setCount(c => c + 1);
        }, 100);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-blue-400 mb-4">1. DOM Access & Focus Management</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Focus me with the button"
                        className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded mr-4 focus:border-blue-500 outline-none"
                    />
                    <button
                        onClick={() => inputRef.current.focus()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
                    >
                        Focus Input
                    </button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-green-400 mb-4">2. Mutable Variables (Timer ID)</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="text-3xl font-mono text-white mb-4">{count.toFixed(0)}</p>
                    <div className="flex gap-4">
                        <button
                            onClick={startTimer}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition"
                        >
                            Start
                        </button>
                        <button
                            onClick={stopTimer}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
                        >
                            Stop
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        The timer ID is stored in a ref (`timerRef.current`). Updating it doesn't trigger a re-render, which is perfect for storing infrastructure data that isn't used for rendering.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. Tracking Previous State</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-gray-800 border-gray-700 text-white px-4 py-2 rounded mb-4"
                        placeholder="Type something..."
                    />
                    <p className="text-gray-300">
                        Current: <span className="text-white font-bold">{text}</span>
                    </p>
                    <p className="text-gray-400">
                        {/* eslint-disable-next-line react-hooks/refs */}
                        Previous: <span className="text-yellow-400 font-mono">{prevTextRef.current}</span>
                    </p>
                </div>
            </section>
        </div>
    );
}

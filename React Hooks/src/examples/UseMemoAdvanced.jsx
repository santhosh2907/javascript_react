import { useState, useMemo, useEffect } from 'react';

// Simulate expensive calculation
const expensiveCalculation = (num) => {
    console.log('Calculating...');
    for (let i = 0; i < 1000000000; i++) {
        num += 1;
    }
    return num;
};

export default function UseMemoAdvanced() {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState([]);

    // 1. Expensive Calculation
    // Without useMemo, this would run on every render (e.g. when typing in input below)
    // With useMemo, it only runs when count changes.
    // Note: We use a smaller loop here to not freeze the browser completely, but enough to notice delays if not memoized in heavy apps.
    // Actually, let's make it light for this demo but log to console.
    const calculation = useMemo(() => {
        return expensiveCalculation(count);
    }, [count]);

    // 2. Referential Equality
    const [dark, setDark] = useState(false);

    // Without useMemo, this object is recreated on every render.
    // If passed to a child wrapped in React.memo, it would break memoization.
    const themeStyles = useMemo(() => {
        return {
            backgroundColor: dark ? '#333' : '#FFF',
            color: dark ? '#FFF' : '#333'
        };
    }, [dark]);

    useEffect(() => {
        console.log('Theme object changed!');
    }, [themeStyles]); // usage of useEffect to prove referential change

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-indigo-400 mb-4">1. Expensive Calculation</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="mb-4 text-gray-300">
                        Count: <span className="text-white font-mono text-xl">{count}</span>
                    </p>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => setCount(c => c + 1)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition"
                        >
                            Increment (+ Recalculate)
                        </button>
                        <button
                            onClick={() => setTodos([...todos, "New Todo"])}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition"
                        >
                            Add Todo (No Recalculate)
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        Clicking "Add Todo" causes a re-render but <strong>does NOT</strong> trigger the "Calculating..." log because <code>count</code> hasn't changed.
                    </p>
                    <p className="mt-1 text-xs text-gray-600">
                        Result: {calculation}
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">2. Referential Equality</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div style={themeStyles} className="p-4 rounded mb-4 transition-colors duration-300">
                        Theme Preview Box
                    </div>
                    <button
                        onClick={() => setDark(!dark)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition"
                    >
                        Toggle Theme
                    </button>
                    <button
                        onClick={() => setCount(c => c + 1)}
                        className="ml-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition"
                    >
                        Re-render Parent
                    </button>
                    <p className="mt-4 text-sm text-gray-500">
                        Open Console. Toggle Theme to "Theme object changed!". Re-render Parent to No log (object reference preserved).
                    </p>
                </div>
            </section>
        </div>
    );
}


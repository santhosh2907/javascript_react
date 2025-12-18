import { useState } from 'react';

export default function UseStateAdvanced() {
    // 1. Functional Updates & Previous State
    const [count, setCount] = useState(0);

    const incrementFiveTimes = () => {
        // This will only increment by 1 if not using functional update
        // setCount(count + 1);
        // setCount(count + 1);
        // ...

        // Correct way:
        for (let i = 0; i < 5; i++) {
            setCount(prev => prev + 1);
        }
    };

    // 2. Complex Object State
    const [user, setUser] = useState({
        name: 'John Doe',
        details: {
            age: 28,
            email: 'john@example.com'
        },
        preferences: {
            theme: 'dark'
        }
    });

    const updateEmail = (newEmail) => {
        // Must spread all levels
        setUser(prev => ({
            ...prev,
            details: {
                ...prev.details,
                email: newEmail
            }
        }));
    };

    // 3. Lazy Initialization
    // This function runs only once on initial render
    const [largeData] = useState(() => {
        console.log('Expensive calculation running...');
        return Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
    });

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-indigo-400 mb-4">1. Functional Updates</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="mb-4 text-gray-300">
                        Count: <span className="text-white font-mono text-xl">{count}</span>
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setCount(count + 1)}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition"
                        >
                            Regular +1
                        </button>
                        <button
                            onClick={incrementFiveTimes}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition"
                        >
                            Enqueue +5 Updates
                        </button>
                        <button
                            onClick={() => setCount(0)}
                            className="px-4 py-2 bg-red-900/50 hover:bg-red-900/70 text-red-200 rounded transition"
                        >
                            Reset
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        Clicking "+5 Updates" queues 5 functional updates, correctly incrementing by 5.
                        Standard state updates would batch and likely only result in +1.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">2. Complex Object Immutability</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <pre className="bg-gray-950 p-4 rounded-lg text-xs font-mono text-gray-300 mb-4 overflow-auto">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                    <div className="flex gap-4">
                        <button
                            onClick={() => updateEmail(`updated_${Date.now()}@example.com`)}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition"
                        >
                            Update Nested Email
                        </button>
                        <button
                            onClick={() => setUser(prev => ({ ...prev, name: 'Jane Doe' }))}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition"
                        >
                            Update Name Only
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        Demonstrates spreading previous state deeply to maintain immutability for nested objects.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-pink-400 mb-4">3. Lazy Initialization</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="mb-2 text-gray-300">
                        Loaded <span className="text-pink-400 font-mono">{largeData.length}</span> items.
                    </p>
                    <p className="text-sm text-gray-500">
                        Open the console. You will see "Expensive calculation running..." only once, even if the component re-renders (try clicking buttons above).
                    </p>
                </div>
            </section>
        </div>
    );
}

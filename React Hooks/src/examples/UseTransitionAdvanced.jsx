import { useState, useTransition } from 'react';

// Artificial heavy computation
const generateItems = (text) => {
    const items = [];
    for (let i = 0; i < 20000; i++) {
        if (text === '' || `Item ${i}`.toLowerCase().includes(text.toLowerCase())) {
            items.push(`Item ${i}`);
        }
    }
    return items;
};

export default function UseTransitionAdvanced() {
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        const value = e.target.value;
        // Urgent update: update input immediately
        setInput(value);

        // Non-urgent update: wrap in startTransition
        // React will deprioritize this state update to keep the UI (input) responsive
        startTransition(() => {
            // Simulate heavy filter
            const items = generateItems(value);
            setList(items);
        });
    };

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-amber-400 mb-4">Non-blocking UI Updates</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="mb-4 text-gray-400">
                        Type fast in the input. Without <code>useTransition</code>, the input would lag because React would try to render the heavy list on every keystroke immediately.
                        With <code>useTransition</code>, the input stays responsive while the list updates in the background.
                    </p>

                    <input
                        value={input}
                        onChange={handleChange}
                        placeholder="Type to filter 20k items..."
                        className="w-full bg-gray-800 border-gray-700 text-white px-4 py-3 rounded mb-4 focus:border-amber-500 outline-none"
                    />

                    {isPending && <div className="text-amber-400 mb-2">Updating list...</div>}

                    <div className="h-64 overflow-y-auto bg-gray-950 p-4 rounded border border-gray-800">
                        {list.length > 0 ? (
                            <ul className="space-y-1 text-gray-400 text-sm">
                                {list.slice(0, 100).map((item, i) => <li key={i}>{item}</li>)}
                                {list.length > 100 && <li>...and {list.length - 100} more</li>}
                            </ul>
                        ) : (
                            <div className="text-gray-600">Start typing to see items</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

import { useState, useDeferredValue, useMemo } from 'react';

// Heavy list component
const HeavyList = ({ query }) => {
    // Simulate heavy processing
    const items = useMemo(() => {
        // eslint-disable-next-line react-hooks/purity
        const start = performance.now();
        // eslint-disable-next-line react-hooks/purity
        while (performance.now() - start < 20) {
            // Artificial lag of 20ms per render to simulate complex UI
        }

        // Just return generic items
        return Array.from({ length: 50 }, (_, i) => `Result matching "${query}" - Item ${i}`);
    }, [query]);

    return (
        <ul className="space-y-1 text-gray-400 text-sm opacity-100 transition-opacity">
            {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    );
};

export default function UseDeferredValueAdvanced() {
    const [query, setQuery] = useState('');

    // deferredQuery will "lag behind" query when updates are frequent
    // React will use the old value for the heavy part until it's ready
    const deferredQuery = useDeferredValue(query);

    const isStale = query !== deferredQuery;

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-violet-400 mb-4">Deferred Values</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="mb-4 text-gray-400">
                        Similar to debounce, but integrated with React's rendering cycle.
                        Type fast below. The input remains responsive, while the heavy list updates slightly later.
                    </p>

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type quickly..."
                        className="w-full bg-gray-800 border-gray-700 text-white px-4 py-3 rounded mb-4 focus:border-violet-500 outline-none"
                    />

                    <div className={`p-4 rounded border border-gray-800 bg-gray-950 transition-opacity duration-300 ${isStale ? 'opacity-50' : 'opacity-100'}`}>
                        <h4 className="text-gray-300 font-bold mb-2">
                            Results for: <span className="text-violet-400">"{deferredQuery}"</span>
                        </h4>
                        <HeavyList query={deferredQuery} />
                    </div>

                    <p className="mt-4 text-xs text-gray-600">
                        If opacity drops, it means we are showing "stale" deferred content while calculating the new one.
                    </p>
                </div>
            </section>
        </div>
    );
}

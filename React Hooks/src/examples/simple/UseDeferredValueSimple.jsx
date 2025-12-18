import { useState, useDeferredValue } from 'react';

// --- LOGIC STARTS HERE ---
function HeavyList({ query }) {
    // Simulate slow rendering
    // eslint-disable-next-line react-hooks/purity
    const start = performance.now();
    // eslint-disable-next-line react-hooks/purity
    while (performance.now() - start < 20) { /* lag */ }

    return <p>Results for: {query}</p>;
}

export default function UseDeferredValueSimple() {
    const [query, setQuery] = useState('');

    // The deferred version will lag behind during rapid updates
    const deferredQuery = useDeferredValue(query);
    const isStale = query !== deferredQuery;

    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useDeferredValue (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Type here..." />

                <div style={{ opacity: isStale ? 0.5 : 1, marginTop: '20px' }}>
                    <HeavyList query={deferredQuery} />
                </div>

                {isStale && <p style={{ fontSize: '10px' }}>Rendering new results...</p>}
            </div>
        </div>
    );
}

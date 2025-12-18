import { useState, useMemo } from 'react';

export default function UseMemoSimple() {
    // --- LOGIC STARTS HERE ---
    const [count, setCount] = useState(0);
    const [color, setColor] = useState('black');

    // Expensive calculation runs ONLY when count changes
    const doubled = useMemo(() => {
        console.log('Calculating doubled...');
        // Artificial delay
        let i = 0; while (i < 10000000) i++;
        return count * 2;
    }, [count]);

    // Object referential equality
    const style = useMemo(() => ({ color }), [color]);

    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useMemo (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <p>Count: {count}</p>
                <p>Doubled: {doubled} (Check console log)</p>

                <button onClick={() => setCount(c => c + 1)} style={{ marginRight: '10px' }}>
                    Increment Count (Triggers Calc)
                </button>

                <button onClick={() => setColor(c => c === 'black' ? 'red' : 'black')}>
                    Toggle Color (No Calc)
                </button>

                <div style={{ ...style, marginTop: '10px' }}>
                    I am styled with a memoized object.
                </div>
            </div>
        </div>
    );
}

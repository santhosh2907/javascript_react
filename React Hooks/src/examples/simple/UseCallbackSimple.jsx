import { useState, useCallback, memo } from 'react';

// Memoized Child
const ChildParams = memo(({ onClick, label }) => {
    console.log(`Render Child: ${label}`);
    return <button onClick={onClick} style={{ margin: '5px' }}>{label}</button>;
});

ChildParams.displayName = 'ChildParams';

export default function UseCallbackSimple() {
    // --- LOGIC STARTS HERE ---
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    // This function is STABLE. It won't be re-created when count2 updates.
    const increment1 = useCallback(() => {
        setCount1(c => c + 1);
    }, []);

    // This function is STABLE. It won't be re-created when count1 updates.
    const increment2 = useCallback(() => {
        setCount2(c => c + 1);
    }, []);
    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useCallback (Simple...)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <p>Count 1: {count1} | Count 2: {count2}</p>
                <p>Check console: Clicking one button ONLY renders that specific button.</p>

                <ChildParams onClick={increment1} label="Increment 1" />
                <ChildParams onClick={increment2} label="Increment 2" />
            </div>
        </div>
    );
}

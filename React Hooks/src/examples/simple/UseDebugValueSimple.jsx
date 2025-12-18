import { useState, useDebugValue } from 'react';

// --- LOGIC STARTS HERE ---
function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);

    // Shows "Online" or "Offline" in React DevTools
    useDebugValue(isOnline ? 'Online' : 'Offline');

    return { isOnline, setIsOnline };
}

export default function UseDebugValueSimple() {
    const { isOnline, setIsOnline } = useOnlineStatus();
    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useDebugValue (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <p>Status: <strong>{isOnline ? 'Online' : 'Offline'}</strong></p>
                <button onClick={() => setIsOnline(!isOnline)}>Toggle</button>
                <p>Open React DevTools to see the label.</p>
            </div>
        </div>
    );
}

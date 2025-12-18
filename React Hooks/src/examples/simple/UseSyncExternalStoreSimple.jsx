import { useSyncExternalStore } from 'react';

// --- LOGIC STARTS HERE ---
// External Store (Browser Window)
const store = {
    subscribe(callback) {
        window.addEventListener('resize', callback);
        return () => window.removeEventListener('resize', callback);
    },
    getSnapshot() {
        return window.innerWidth;
    }
};

export default function UseSyncExternalStoreSimple() {
    const width = useSyncExternalStore(store.subscribe, store.getSnapshot);
    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useSyncExternalStore (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <p>Window innerWidth: <strong>{width}px</strong></p>
                <p>Resize your browser.</p>
            </div>
        </div>
    );
}

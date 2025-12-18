import { useInsertionEffect } from 'react';

export default function UseInsertionEffectSimple() {
    // --- LOGIC STARTS HERE ---
    useInsertionEffect(() => {
        // Inject style tag BEFORE layout
        const style = document.createElement('style');
        style.innerHTML = `.dynamic-style { color: blue; font-weight: bold; }`;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);
    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useInsertionEffect (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <div className="dynamic-style">
                    I am styled via dynamic style tag injection.
                </div>
            </div>
        </div>
    );
}

import { useId } from 'react';

// --- LOGIC STARTS HERE ---
function PasswordField() {
    const id = useId();
    return (
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor={id}>Password (ID: {id}): </label>
            <input id={id} type="password" />
        </div>
    );
}
// --- LOGIC ENDS HERE ---

export default function UseIdSimple() {
    return (
        <div>
            <h1>useId (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <PasswordField />
                <PasswordField />
                <p>Notice unique IDs are generated automatically.</p>
            </div>
        </div>
    );
}

import { useState } from 'react';

export default function UseStateSimple() {
    // --- LOGIC STARTS HERE ---

    // 1. Functional Updates
    const [count, setCount] = useState(0);

    const incrementFiveTimes = () => {
        // This is the correct way to update based on previous state multiple times
        for (let i = 0; i < 5; i++) {
            setCount(prev => prev + 1);
        }
    };

    // 2. Complex Object State
    const [user, setUser] = useState({
        name: 'John Doe',
        details: { age: 28, email: 'john@example.com' }
    });

    const updateEmail = () => {
        // You must copy the existing object manually (...prev)
        setUser(prev => ({
            ...prev,
            details: {
                ...prev.details,
                email: 'updated@example.com'
            }
        }));
    };

    // --- LOGIC ENDS HERE ---

    // Simple UI with minimal inline styles
    const styles = {
        container: { padding: '20px', border: '1px solid #ccc', marginBottom: '20px' },
        button: { marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }
    };

    return (
        <div>
            <h1>useState (Simple)</h1>

            {/* Example 1: Counter */}
            <div style={styles.container}>
                <h3>1. Functional Updates</h3>
                <p>Count: <strong>{count}</strong></p>
                <button style={styles.button} onClick={() => setCount(count + 1)}>
                    Regular +1
                </button>
                <button style={styles.button} onClick={incrementFiveTimes}>
                    Queue +5 Updates
                </button>
            </div>

            {/* Example 2: Objects */}
            <div style={styles.container}>
                <h3>2. Object Updates</h3>
                <pre>{JSON.stringify(user, null, 2)}</pre>
                <button style={styles.button} onClick={updateEmail}>
                    Update Nested Email
                </button>
            </div>
        </div>
    );
}

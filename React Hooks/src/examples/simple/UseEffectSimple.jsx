import { useState, useEffect } from 'react';

export default function UseEffectSimple() {
    // --- LOGIC STARTS HERE ---

    // 1. Cleanup Function
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!isActive) return;

        const onMove = (e) => setPosition({ x: e.clientX, y: e.clientY });

        // Add listener
        window.addEventListener('mousemove', onMove);

        // Cleanup listener on unmount or dependency change
        return () => window.removeEventListener('mousemove', onMove);
    }, [isActive]);

    // 2. Race Conditions (Simulated)
    const [id, setId] = useState('1');
    const [data, setData] = useState(null);

    useEffect(() => {
        let active = true;
        const controller = new AbortController();

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { signal: controller.signal })
            .then(res => res.json())
            .then(result => {
                if (active) setData(result);
            })
            .catch(e => {
                if (e.name !== 'AbortError') console.error(e);
            });

        return () => {
            active = false;
            controller.abort();
        };
    }, [id]);

    // --- LOGIC ENDS HERE ---

    const styles = {
        container: { padding: '20px', border: '1px solid #ccc', marginBottom: '20px' },
        button: { marginRight: '10px', padding: '5px' }
    };

    return (
        <div>
            <h1>useEffect (Simple)</h1>

            <div style={styles.container}>
                <h3>1. Cleanup (Event Listeners)</h3>
                <button style={styles.button} onClick={() => setIsActive(!isActive)}>
                    {isActive ? 'Stop Tracking' : 'Start Tracking'}
                </button>
                <p>Position: {position.x}, {position.y}</p>
            </div>

            <div style={styles.container}>
                <h3>2. Race Conditions (Fetch)</h3>
                <div style={{ marginBottom: '10px' }}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <button key={i} style={styles.button} onClick={() => setId(String(i))}>
                            ID: {i}
                        </button>
                    ))}
                </div>
                <p><strong>Current ID:</strong> {id}</p>
                <p><strong>Title:</strong> {data ? data.title : 'Loading...'}</p>
            </div>
        </div>
    );
}

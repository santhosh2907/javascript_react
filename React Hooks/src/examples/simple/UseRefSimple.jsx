import { useRef, useState, useEffect } from 'react';

export default function UseRefSimple() {
    // --- LOGIC STARTS HERE ---

    // 1. DOM Access: Holds reference to the input element
    const inputRef = useRef(null);

    // 2. Mutable Variable: Holds a value that persists but doesn't trigger re-render
    const timerIdRef = useRef(null);
    const [count, setCount] = useState(0);

    // 3. Tracking Previous State
    const [text, setText] = useState('');
    const prevTextRef = useRef('');

    useEffect(() => {
        // Update ref after render. Next render will have access to this old value.
        prevTextRef.current = text;
    }, [text]);

    const startTimer = () => {
        if (timerIdRef.current) return; // Prevent multiple timers
        timerIdRef.current = setInterval(() => {
            setCount(c => c + 1);
        }, 100);
    };

    const stopTimer = () => {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
    };

    // --- LOGIC ENDS HERE ---

    const styles = {
        container: { padding: '20px', border: '1px solid #ccc', marginBottom: '20px' },
        button: { marginRight: '10px', padding: '5px 10px' }
    };

    return (
        <div>
            <h1>useRef (Simple)</h1>

            {/* Example 1 */}
            <div style={styles.container}>
                <h3>1. Focus Input</h3>
                <input ref={inputRef} placeholder="I will be focused" style={{ marginRight: '10px' }} />
                <button style={styles.button} onClick={() => inputRef.current.focus()}>
                    Focus Me
                </button>
            </div>

            {/* Example 2 */}
            <div style={styles.container}>
                <h3>2. Timer (Mutable Ref)</h3>
                <p>Timer stored in ref (no re-render on update): <strong>{count}</strong></p>
                <button style={styles.button} onClick={startTimer}>Start</button>
                <button style={styles.button} onClick={stopTimer}>Stop</button>
            </div>

            {/* Example 3 */}
            <div style={styles.container}>
                <h3>3. Previous State</h3>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type here..."
                />
                <p>Current: {text}</p>
                {/* eslint-disable-next-line react-hooks/refs */}
                <p>Previous (from ref): {prevTextRef.current}</p>
            </div>
        </div>
    );
}

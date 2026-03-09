import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => setTime(t => t + 10), 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const format = (ms) => {
        const mins = Math.floor(ms / 60000).toString().padStart(2, '0');
        const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        const millis = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
        return `${mins}:${secs}:${millis}`;
    };

    return (
        <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '24px' }}>
            <h2>{format(time)}</h2>
            <div>
                <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Pause' : 'Start'}</button>
                <button onClick={() => { setIsRunning(false); setTime(0); }}>Reset</button>
            </div>
        </div>
    );
};
export default Stopwatch;

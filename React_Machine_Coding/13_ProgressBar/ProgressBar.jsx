import React, { useState, useEffect } from 'react';

const ProgressBar = ({ durationMs = 5000 }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const stepMs = 50;
        const increment = 100 / (durationMs / stepMs);

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + increment;
            });
        }, stepMs);

        return () => clearInterval(timer);
    }, [durationMs]);

    return (
        <div style={{ width: '100%', maxWidth: '300px', background: '#ccc', borderRadius: '5px', overflow: 'hidden' }}>
            <div
                style={{ width: `${progress}%`, height: '20px', background: '#4caf50', transition: 'width 0.1s linear' }}
            />
        </div>
    );
};
export default ProgressBar;

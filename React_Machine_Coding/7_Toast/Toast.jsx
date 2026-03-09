import React, { useState, useEffect } from 'react';

const Toast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (msg) => {
        const id = Date.now();
        setToasts([...toasts, { id, msg }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <div>
            <button onClick={() => addToast('New Notification!')}>Show Toast</button>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {toasts.map(t => (
                    <div key={t.id} style={{ padding: '10px 20px', background: '#333', color: 'white', borderRadius: '4px' }}>
                        {t.msg}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Toast;

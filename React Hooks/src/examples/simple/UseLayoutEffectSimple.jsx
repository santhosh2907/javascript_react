import { useState, useLayoutEffect, useRef } from 'react';

export default function UseLayoutEffectSimple() {
    // --- LOGIC STARTS HERE ---
    const [show, setShow] = useState(false);
    const buttonRef = useRef(null);
    const popupRef = useRef(null);

    useLayoutEffect(() => {
        if (!show || !buttonRef.current || !popupRef.current) return;

        // Measure DOM *before* paint to avoid flicker
        const { bottom } = buttonRef.current.getBoundingClientRect();
        popupRef.current.style.top = `${bottom + 10}px`;
    }, [show]);
    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useLayoutEffect (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc', position: 'relative', height: '200px' }}>
                <button ref={buttonRef} onClick={() => setShow(!show)}>
                    Toggle Popup
                </button>

                {show && (
                    <div
                        ref={popupRef}
                        style={{ position: 'absolute', border: '1px solid black', padding: '10px', background: 'yellow' }}
                    >
                        I am positioned synchronously.
                    </div>
                )}
            </div>
        </div>
    );
}

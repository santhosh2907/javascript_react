import { useState, useLayoutEffect, useRef } from 'react';

export default function UseLayoutEffectAdvanced() {
    const [show, setShow] = useState(false);
    const popupRef = useRef(null);
    const buttonRef = useRef(null);

    // useLayoutEffect runs synchronously immediately after DOM structure updates, 
    // but before the browser paints. 
    // This is the place to measure DOM and make adjustments to prevent flicker.

    useLayoutEffect(() => {
        if (popupRef.current && buttonRef.current) {
            const { bottom } = buttonRef.current.getBoundingClientRect();
            popupRef.current.style.top = `${bottom + 25}px`; // Adjust position before paint
        }
    }, [show]);

    // Try changing this to useEffect and if the CPU is slow (or throttled), you might see a flicker 
    // where the popup appears in the wrong place first.

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-lime-400 mb-4">Synchronous Layout Updates</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 h-64 relative">
                    <p className="mb-4 text-gray-400">
                        Click toggle. The popup position is calculated based on the button position.
                        Using <code>useLayoutEffect</code> ensures it is positioned correct *before* you see it.
                    </p>

                    <button
                        ref={buttonRef}
                        onClick={() => setShow(prev => !prev)}
                        className="px-4 py-2 bg-lime-600 hover:bg-lime-700 rounded transition"
                    >
                        Toggle Popup
                    </button>

                    {show && (
                        <div
                            ref={popupRef}
                            className="absolute left-8 p-4 bg-gray-800 border border-lime-500/50 rounded shadow-xl text-lime-200 w-64"
                            style={{ top: '0px' }} // Initial wrong position
                        >
                            <h4 className="font-bold mb-1">Popup Content</h4>
                            <p className="text-sm">
                                I was positioned by measuring the DOM using useLayoutEffect.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

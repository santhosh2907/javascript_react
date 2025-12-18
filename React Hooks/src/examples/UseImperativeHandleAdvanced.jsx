import { useRef, useImperativeHandle, forwardRef, useState } from 'react';

// Child Component
const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef(null);
    const [shake, setShake] = useState(false);

    useImperativeHandle(ref, () => ({
        // Determine what to expose to parent
        focus: () => {
            inputRef.current.focus();
        },
        clear: () => {
            inputRef.current.value = '';
        },
        triggerShake: () => {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        },
        // We can also expose internal state
        getValue: () => inputRef.current.value
    }));

    return (
        <input
            ref={inputRef}
            className={`bg-gray-800 border-gray-700 text-white px-4 py-2 rounded mb-4 w-full focus:border-cyan-500 outline-none transition-transform ${shake ? 'animate-bounce border-red-500' : ''}`}
            placeholder="I am a custom child component input..."
            {...props}
        />
    );
});

CustomInput.displayName = 'CustomInput';

export default function UseImperativeHandleAdvanced() {
    const childRef = useRef(null);

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Exposing Custom Instance Methods</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <CustomInput ref={childRef} />

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => childRef.current.focus()}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded transition"
                        >
                            Parent: Focus Child
                        </button>
                        <button
                            onClick={() => childRef.current.clear()}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
                        >
                            Parent: Clear Child
                        </button>
                        <button
                            onClick={() => childRef.current.triggerShake()}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
                        >
                            Parent: Shake Child
                        </button>
                        <button
                            onClick={() => alert(childRef.current.getValue())}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
                        >
                            Parent: Get Value
                        </button>
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        Usually, refs give you the DOM node. With <code>useImperativeHandle</code>, the child controls exactly what the parent can do with the ref.
                        Useful for libraries or complex UI components (modals, drawers).
                    </p>
                </div>
            </section>
        </div>
    );
}

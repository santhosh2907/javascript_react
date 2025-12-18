import { useRef, useImperativeHandle, forwardRef } from 'react';

// --- LOGIC STARTS HERE ---
const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef(null);

    // Parent can ONLY call these functions, not access the full DOM node
    useImperativeHandle(ref, () => ({
        focusMe: () => inputRef.current.focus(),
        clearMe: () => inputRef.current.value = '',
        alertValue: () => alert(inputRef.current.value)
    }));

    return <input ref={inputRef} placeholder="Child Input" {...props} />;
});

CustomInput.displayName = 'CustomInput';

export default function UseImperativeHandleSimple() {
    const childRef = useRef(null);
    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useImperativeHandle (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <CustomInput ref={childRef} />
                <div style={{ marginTop: '10px' }}>
                    <button onClick={() => childRef.current.focusMe()}>Parent: Focus</button>
                    <button onClick={() => childRef.current.clearMe()}>Parent: Clear</button>
                    <button onClick={() => childRef.current.alertValue()}>Parent: Alert Value</button>
                </div>
            </div>
        </div>
    );
}

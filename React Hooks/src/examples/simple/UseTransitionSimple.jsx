import { useState, useTransition } from 'react';

export default function UseTransitionSimple() {
    // --- LOGIC STARTS HERE ---
    const [isPending, startTransition] = useTransition();
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value); // Urgent update

        startTransition(() => {
            // Slow update (generating large list)
            const items = [];
            for (let i = 0; i < 5000; i++) items.push(`${value} - Item ${i}`);
            setList(items);
        });
    };
    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useTransition (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <input value={input} onChange={handleChange} placeholder="Type fast..." />
                {isPending && <span style={{ color: 'red', marginLeft: '10px' }}>Updating list...</span>}

                <ul style={{ maxHeight: '200px', overflow: 'auto' }}>
                    {list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        </div>
    );
}

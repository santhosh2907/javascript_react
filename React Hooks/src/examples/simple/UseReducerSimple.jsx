import { useReducer, useState } from 'react';

// --- LOGIC STARTS HERE ---
const initialState = { tasks: [], count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return { ...state, tasks: [...state.tasks, { id: Date.now(), text: action.payload }] };
        case 'DELETE':
            return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export default function UseReducerSimple() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (!text) return;
        dispatch({ type: 'ADD', payload: text });
        setText('');
    };
    // --- LOGIC ENDS HERE ---

    return (
        <div>
            <h1>useReducer (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Task..." />
                <button onClick={handleAdd}>Add</button>
                <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>

                <ul>
                    {state.tasks.map(task => (
                        <li key={task.id}>
                            {task.text}
                            <button onClick={() => dispatch({ type: 'DELETE', payload: task.id })} style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

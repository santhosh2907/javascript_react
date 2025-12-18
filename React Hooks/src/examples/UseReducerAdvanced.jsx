import { useReducer, useState } from 'react';

const initialState = {
    tasks: [
        { id: 1, text: 'Master React Hooks', completed: true },
        { id: 2, text: 'Learn useReducer', completed: false }
    ],
    filter: 'all' // all, completed, active
};

// Reducer function: pure, no side effects
const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, { id: Date.now(), text: action.payload, completed: false }]
            };
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                )
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
};

export default function UseReducerAdvanced() {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        dispatch({ type: 'ADD_TASK', payload: text });
        setText('');
    };

    const filteredTasks = state.tasks.filter(task => {
        if (state.filter === 'active') return !task.completed;
        if (state.filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-orange-400 mb-4">Complex State Logic</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                        <input
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Add new task..."
                            className="flex-1 bg-gray-800 border-gray-700 text-white px-4 py-2 rounded focus:border-orange-500 outline-none"
                        />
                        <button type="submit" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded transition font-medium">
                            Add
                        </button>
                    </form>

                    <div className="flex gap-2 mb-4 text-sm">
                        {['all', 'active', 'completed'].map(f => (
                            <button
                                key={f}
                                onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
                                className={`px-3 py-1 rounded capitalize transition ${state.filter === f ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <ul className="space-y-2">
                        {filteredTasks.map(task => (
                            <li key={task.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded hover:bg-gray-800 transition">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                                        className="w-5 h-5 accent-orange-500 cursor-pointer"
                                    />
                                    <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-200'}>
                                        {task.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                                    className="text-red-400 hover:text-red-300 px-2"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                        {filteredTasks.length === 0 && (
                            <li className="text-gray-500 text-center py-4">No tasks found.</li>
                        )}
                    </ul>
                </div>
            </section>
        </div>
    );
}

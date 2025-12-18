import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('react-30-todos');
        return saved ? JSON.parse(saved) : [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('react-30-todos', JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setTodos([...todos, {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false
        }]);
        setInputValue('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-purple-600 p-4 flex items-center text-white">
                    <Link to="/" className="p-2 hover:bg-purple-700 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold ml-4">Project 3: Todo List</h1>
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-b border-gray-100 flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Plus size={24} />
                    </button>
                </form>

                {/* List */}
                <div className="p-4">
                    {todos.length === 0 ? (
                        <div className="text-center text-gray-400 py-8">
                            No tasks yet. Add one above!
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {todos.map(todo => (
                                <li
                                    key={todo.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border ${todo.completed ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-200 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <button
                                            onClick={() => toggleTodo(todo.id)}
                                            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                                                    ? 'bg-purple-500 border-purple-500 text-white'
                                                    : 'border-gray-300 text-transparent hover:border-purple-400'
                                                }`}
                                        >
                                            <Check size={14} />
                                        </button>
                                        <span className={`truncate ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                            {todo.text}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer info */}
                <div className="bg-gray-50 p-3 text-center text-xs text-gray-400">
                    {todos.filter(t => !t.completed).length} items left • Saved to Local Storage
                </div>
            </div>
        </div>
    );
};

export default TodoList;

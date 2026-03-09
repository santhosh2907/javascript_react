import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const add = (e) => {
    e.preventDefault();
    if (text) {
      setTodos([...todos, { id: Date.now(), text, done: false }]);
      setText('');
    }
  };

  const toggle = (id) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id) => setTodos(todos.filter(t => t.id !== id));

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <form onSubmit={add}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Add a task" />
      </form>
      <ul>
        {todos.map(t => (
          <li key={t.id} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
            <span onClick={() => toggle(t.id)}>{t.text}</span>
            <button onClick={() => remove(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;

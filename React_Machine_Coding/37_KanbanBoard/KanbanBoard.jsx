import React, { useState } from 'react';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({ 
    todo: ['Task 1', 'Task 2'], 
    doing: ['Task 3'], 
    done: [] 
  });

  return (
    <div className="kanban-container">
      {['todo', 'doing', 'done'].map(status => (
        <div key={status} className="column">
          <h3>{status.toUpperCase()}</h3>
          {tasks[status].map((t, i) => (
            <div key={i} className="task-card">{t}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default KanbanBoard;

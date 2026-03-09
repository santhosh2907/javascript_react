import React, { useState } from 'react';
import './DragAndDropList.css';

const DragAndDropList = () => {
  const [items, setItems] = useState(['Alpha', 'Bravo', 'Charlie', 'Delta']);
  const [draggedItem, setDraggedItem] = useState(null);
  
  const onDragStart = (e, index) => setDraggedItem(items[index]);
  const onDragOver = e => e.preventDefault();
  const onDrop = (e, targetIndex) => {
    const newItems = items.filter(i => i !== draggedItem);
    newItems.splice(targetIndex, 0, draggedItem);
    setItems(newItems);
    setDraggedItem(null);
  };

  return (
    <div className="dnd-container">
      <h2>Drag and Drop</h2>
      <ul className="dnd-list">
        {items.map((item, i) => (
          <li key={item} draggable onDragStart={e => onDragStart(e, i)} onDragOver={onDragOver} onDrop={e => onDrop(e, i)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DragAndDropList;

import React, { useState } from 'react';
import { ArrowLeft, GripVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const INITIAL_ITEMS = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
];

const DragAndDrop = () => {
    // Basic HTML5 Drag and Drop API implementation without external libraries for learning purposes
    const [items, setItems] = useState(INITIAL_ITEMS);
    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedItem(items[index]);
        e.dataTransfer.effectAllowed = "move";
        // Ghost image usually handled by browser, but we can customize if needed
        // e.dataTransfer.setDragImage(e.target, 20, 20);
        setTimeout(() => {
            e.target.classList.add('opacity-50');
        }, 0);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        const draggedOverItem = items[index];

        // If the item is dragged over itself, ignore
        if (draggedItem === draggedOverItem) {
            return;
        }

        // Filter out the currently dragged item
        let newItems = items.filter(item => item !== draggedItem);

        // Add the dragged item after the dragged over item
        // Note: This logic is simple but can be jittery directly in dragOver. 
        // A robust solution calculates positions. For this simple demo, we swap.

        // Let's implement a swap for simplicity in this basic demo
        const draggedIdx = items.indexOf(draggedItem);
        const overIdx = index;

        if (draggedIdx !== overIdx) {
            const reordered = [...items];
            // Remove dragged
            reordered.splice(draggedIdx, 1);
            // Insert at new
            reordered.splice(overIdx, 0, draggedItem);
            setItems(reordered);
        }
    };

    const handleDragEnd = (e) => {
        setDraggedItem(null);
        e.target.classList.remove('opacity-50');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Drag & Drop List</h1>
                <p className="text-gray-500 text-center mb-8">Reorder items by dragging them.</p>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 border border-gray-100">
                    <ul className="space-y-3">
                        {items.map((item, index) => (
                            <li
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDragEnd={handleDragEnd}
                                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md cursor-grab active:cursor-grabbing transition-all transform animate-fade-in"
                            >
                                <GripVertical className="text-gray-400" />
                                <span className="font-medium text-gray-700">{item.content}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;

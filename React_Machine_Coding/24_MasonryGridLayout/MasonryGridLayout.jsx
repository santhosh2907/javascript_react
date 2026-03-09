import React from 'react';
import './MasonryGridLayout.css';

const generateMasonryItems = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: i,
      height: Math.floor(Math.random() * 201) + 100 // 100 to 300
    });
  }
  return result;
};

const defaultItems = generateMasonryItems(15);

const MasonryGridLayout = ({ items = defaultItems }) => {
  return (
    <div className="masonry-container">
      {items.map(item => (
        <div key={item.id} className="masonry-item" style={{ height: item.height }} />
      ))}
    </div>
  );
};
export default MasonryGridLayout;

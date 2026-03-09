import React, { useState } from 'react';
import './VirtualizedList.css';

const generateMockItems = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(`Item ${i}`);
  }
  return result;
};

const defaultItems = generateMockItems(1000);

const VirtualizedList = ({ items = defaultItems }) => {
  const itemHeight = 35;
  const windowHeight = 400;
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(items.length - 1, startIndex + Math.ceil(windowHeight / itemHeight));
  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div className="virtualized-container" onScroll={e => setScrollTop(e.target.scrollTop)} style={{ height: windowHeight, overflowY: 'auto', border: '1px solid black' }}>
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div key={startIndex + index} style={{ position: 'absolute', top: (startIndex + index) * itemHeight, height: itemHeight, width: '100%', borderBottom: '1px solid #eee', boxSizing: 'border-box', padding: '8px' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
export default VirtualizedList;

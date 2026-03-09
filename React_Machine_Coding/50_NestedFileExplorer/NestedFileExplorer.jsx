import React, { useState } from 'react';
import './NestedFileExplorer.css';

const explorer = { name: 'root', isFolder: true, items: [{ name: 'public', isFolder: true, items: [{ name: 'index.html', isFolder: false }] }, { name: 'src', isFolder: true, items: [{ name: 'App.js', isFolder: false }] }, { name: 'package.json', isFolder: false }] };

const Folder = ({ explorer }) => {
  const [exp, setExp] = useState(false);
  if (explorer.isFolder) {
    return (
      <div className="folder">
        <span onClick={() => setExp(!exp)}>📁 {explorer.name}</span>
        <div style={{ display: exp ? 'block' : 'none', paddingLeft: 15 }}>
          {explorer.items.map((item, i) => <Folder key={i} explorer={item} />)}
        </div>
      </div>
    );
  }
  return <div className="file">📄 {explorer.name}</div>;
};

const NestedFileExplorer = () => (
  <div className="fileexplorer-container">
    <h2>File Explorer</h2>
    <Folder explorer={explorer} />
  </div>
);
export default NestedFileExplorer;

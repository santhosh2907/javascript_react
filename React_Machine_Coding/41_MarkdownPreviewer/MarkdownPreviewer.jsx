import React, { useState } from 'react';
import './MarkdownPreviewer.css';

const MarkdownPreviewer = () => {
  const [text, setText] = useState('# Hello\nThis is a mock markdown previewer.');
  
  return (
    <div className="md-container">
      <textarea className="md-input" value={text} onChange={e => setText(e.target.value)} />
      <div className="md-preview">
        <p><i>Preview mock:</i></p>
        <pre>{text}</pre>
      </div>
    </div>
  );
};
export default MarkdownPreviewer;

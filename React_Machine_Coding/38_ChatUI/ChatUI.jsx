import React, { useState } from 'react';
import './ChatUI.css';

const ChatUI = () => {
  const [msgs, setMsgs] = useState([{text: 'Hello!', own: false}]);
  const [val, setVal] = useState('');

  const send = (e) => {
    e.preventDefault();
    if (val) {
      setMsgs([...msgs, { text: val, own: true }]);
      setVal('');
      setTimeout(() => setMsgs(m => [...m, {text: 'Bot reply', own: false}]), 1000);
    }
  };

  return (
    <div className="chatui-container">
      <div className="chat-window">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.own ? 'own' : ''}`}>{m.text}</div>
        ))}
      </div>
      <form onSubmit={send} className="chat-input">
        <input value={val} onChange={e => setVal(e.target.value)} placeholder="Type..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatUI;

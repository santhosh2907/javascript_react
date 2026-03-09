import React, { useState } from 'react';

const Tabs = ({ tabs = [{ label: 'Tab 1', content: 'Cont 1' }, { label: 'Tab 2', content: 'Cont 2' }] }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
                {tabs.map((tab, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        style={{ padding: '10px', background: activeTab === i ? '#eee' : 'white', border: 'none', cursor: 'pointer' }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div style={{ padding: '20px' }}>
                {tabs[activeTab].content}
            </div>
        </div>
    );
};
export default Tabs;

import React, { useState, useEffect } from 'react';

const Typeahead = ({ data = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'] }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (!query) {
            setSuggestions([]); return;
        }
        const filtered = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        setSuggestions(filtered);
    }, [query, data]);

    return (
        <div style={{ position: 'relative', width: '200px' }}>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a fruit..."
                style={{ width: '100%', padding: '5px' }}
            />
            {suggestions.length > 0 && (
                <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #ccc', margin: 0, padding: 0, listStyle: 'none' }}>
                    {suggestions.map((s, i) => (
                        <li key={i} style={{ padding: '5px', cursor: 'pointer', borderBottom: '1px solid #eee' }} onClick={() => setQuery(s)}>
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Typeahead;

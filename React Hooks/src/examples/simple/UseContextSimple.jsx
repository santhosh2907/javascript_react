import { useState, useContext, createContext } from 'react';

// --- LOGIC STARTS HERE ---
const ThemeContext = createContext('light');
const UserContext = createContext(null);

function Display() {
    const theme = useContext(ThemeContext);
    const user = useContext(UserContext);

    const style = {
        padding: '10px',
        backgroundColor: theme === 'dark' ? '#333' : '#eee',
        color: theme === 'dark' ? '#fff' : '#000',
        marginTop: '10px'
    };

    return (
        <div style={style}>
            <p>Theme: {theme}</p>
            <p>User: {user ? user.name : 'Guest'}</p>
        </div>
    );
}
// --- LOGIC ENDS HERE ---

export default function UseContextSimple() {
    const [theme, setTheme] = useState('light');

    return (
        <div>
            <h1>useContext (Simple)</h1>
            <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
                    Toggle Theme
                </button>

                {/* Providing Contexts */}
                <ThemeContext.Provider value={theme}>
                    <UserContext.Provider value={{ name: 'Alice' }}>
                        <Display />
                    </UserContext.Provider>
                </ThemeContext.Provider>
            </div>
        </div>
    );
}

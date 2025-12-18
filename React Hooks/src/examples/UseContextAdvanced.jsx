import { useState, useContext, createContext } from 'react';

// 1. Basic Theme Context
const ThemeContext = createContext('light');

// 2. Optimized Context (Splitting Value and Setter)
// This prevents consumers of 'UserContext' from re-rendering when only 'UserUpdateContext' is used, and vice versa.
const UserContext = createContext(null);
const UserUpdateContext = createContext(null);

function Header() {
    const theme = useContext(ThemeContext);
    const user = useContext(UserContext);

    console.log('Header rendered');
    return (
        <div className={`p-4 border rounded ${theme === 'dark' ? 'bg-black border-gray-700' : 'bg-white border-gray-200 text-black'}`}>
            <h3 className="font-bold">Header Component</h3>
            <p>Theme: {theme}</p>
            <p>User: {user ? user.name : 'Guest'}</p>
        </div>
    );
}

function UserSettings() {
    const setUser = useContext(UserUpdateContext);
    console.log('UserSettings rendered');

    return (
        <div className="p-4 border border-gray-700 rounded bg-gray-900 mt-4">
            <h3 className="font-bold text-gray-300">User Settings</h3>
            <p className="text-xs text-gray-500 mb-2">
                This component uses <code>UserUpdateContext</code> only. It won't re-render if <code>UserContext</code> (name) changes,
                unless the parent re-renders it directly.
            </p>
            <button
                onClick={() => setUser({ name: 'Alice' })}
                className="px-3 py-1 bg-green-600 rounded mr-2"
            >
                Set User Alice
            </button>
            <button
                onClick={() => setUser({ name: 'Bob' })}
                className="px-3 py-1 bg-blue-600 rounded"
            >
                Set User Bob
            </button>
        </div>
    );
}

export default function UseContextAdvanced() {
    const [theme, setTheme] = useState('dark');
    const [user, setUser] = useState({ name: 'Guest' });

    // Important: Memoize the value object if it's an object, to prevent context consumers from 
    // re-rendering unnecessarily due to new object reference on every parent render.
    // Although here 'user' state is stable, if we passed { user, setUser } as one object, we'd need useMemo.

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">Context Composition & Optimization</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold text-gray-200 mb-4">Control Panel</h3>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-400 mb-2">App Theme</label>
                            <button
                                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                                className="px-4 py-2 bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 rounded"
                            >
                                Toggle Theme (Current: {theme})
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Providing Contexts */}
                        <ThemeContext.Provider value={theme}>
                            <UserContext.Provider value={user}>
                                <UserUpdateContext.Provider value={setUser}>

                                    <Header />
                                    <UserSettings />

                                </UserUpdateContext.Provider>
                            </UserContext.Provider>
                        </ThemeContext.Provider>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-gray-800/50 rounded-lg text-sm text-gray-400">
                    <h4 className="font-bold text-gray-300 mb-2">Key Concepts:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Context Splitting:</strong> Separating <code>UserContext</code> (data) and <code>UserUpdateContext</code> (setter) prevents components that only set state from re-rendering when state changes.</li>
                        <li><strong>Composition:</strong> Nesting multiple providers to inject different slices of state.</li>
                        <li><strong>Console Log:</strong> Check the console. When you click "Set User", <code>Header</code> (consumes data) renders, but <code>UserSettings</code> (consumes setter) stays efficient (if memoized properly conceptually, though here parent re-render might trigger it unless wrapped in memo).</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ArrowLeft, Moon, Sun, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. Create Context
const ThemeContext = createContext();

// 2. Theme Provider Component
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    // Listen for system changes if in system mode
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                const root = window.document.documentElement;
                root.classList.remove('light', 'dark');
                root.classList.add(mediaQuery.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

const Content = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 flex flex-col items-center justify-center">
            <Link to="/" className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                <ArrowLeft size={24} />
            </Link>

            <div className="max-w-xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Theme Switcher</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Try switching themes to see how the interface utilizes Tailwind's dark mode strategy with React Context.
                    </p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full flex justify-between shadow-inner mb-12">
                    {['light', 'system', 'dark'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`flex-1 py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-200 ${theme === t
                                    ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600 dark:text-blue-400'
                                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {t === 'light' && <Sun size={18} />}
                            {t === 'system' && <Monitor size={18} />}
                            {t === 'dark' && <Moon size={18} />}
                            <span className="capitalize font-medium">{t}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg mb-2">Card Component</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            This card automatically adjusts its background and text colors based on the selected theme configuration.
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/30">
                        <h3 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Accent Colors</h3>
                        <p className="text-blue-600/80 dark:text-blue-300/80 text-sm">
                            Even accent colors adapt to ensure good contrast and visual hierarchy in both modes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ThemeSwitcherResult = () => {
    return (
        <ThemeProvider>
            <Content />
        </ThemeProvider>
    );
};

export default ThemeSwitcherResult;

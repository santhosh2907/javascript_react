import React from 'react';
import { ArrowLeft, Globe, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';

// A component that consumes the context
const Content = () => {
    // We use our custom hook to get the state (t = translations, locale, setLocale)
    const { t, locale, setLocale } = useLanguage();

    const handleLanguageChange = (e) => {
        setLocale(e.target.value);
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Globe size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Context API</h2>
                </div>

                <select
                    value={locale}
                    onChange={handleLanguageChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none font-medium"
                >
                    <option value="en">🇺🇸 English</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="fr">🇫🇷 Français</option>
                </select>
            </div>

            <div className="space-y-6 text-center py-4">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {t.greeting}
                </h1>

                <p className="text-gray-500 text-lg leading-relaxed">
                    {t.description}
                </p>

                <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-200">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">How it works</h3>
                    <code className="text-xs font-mono text-purple-600 block bg-white p-2 rounded border border-gray-100">
                        const &#123; t &#125; = useLanguage();<br />
                        return &lt;h1&gt;&#123;t.greeting&#125;&lt;/h1&gt;;
                    </code>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs font-medium text-gray-400 flex items-center justify-center gap-1">
                    <MessageSquare size={14} /> {t.footer}
                </p>
            </div>
        </div>
    );
};

// The Main Component wrapping everything in the Provider
const ContextDemo = () => {
    return (
        // The Provider must wrap all components that need access to the context
        <LanguageProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
                <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <ArrowLeft size={24} />
                </Link>

                <div className="mb-8 text-center max-w-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Context API</h1>
                    <p className="text-gray-500">
                        Context allows you to pass data through the component tree without having to pass props down manually at every level (Prop Drilling).
                    </p>
                </div>

                <Content />
            </div>
        </LanguageProvider>
    );
};

export default ContextDemo;

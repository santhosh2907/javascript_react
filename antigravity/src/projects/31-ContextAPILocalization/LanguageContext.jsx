import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
// This is like creating a "global" object that components can subscribe to.
// The default value (undefined here) is only used if a component tries to hook into this context 
// without being wrapped in a Provider (which is rare).
const LanguageContext = createContext();

// 2. Create the Provider Component
// This component wraps the part of your app that needs access to this state.
// It manages the state (locale) and provides it to all children via the 'value' prop.
export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState('en');

    // Simple dictionary for translations
    const translations = {
        en: {
            greeting: "Hello, World!",
            description: "This text is provided by the Context API.",
            button: "Switch Language",
            footer: "Made with React Context"
        },
        es: {
            greeting: "¡Hola, Mundo!",
            description: "Este texto es proporcionado por la API de Contexto.",
            button: "Cambiar idioma",
            footer: "Hecho con React Context"
        },
        fr: {
            greeting: "Bonjour le monde !",
            description: "Ce texte est fourni par l'API Context.",
            button: "Changer de langue",
            footer: "Fait avec React Context"
        }
    };

    // The value object is what will be accessible to consuming components
    const value = {
        locale,
        setLocale,
        t: translations[locale]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

// 3. Create a Custom Hook
// This makes it easy for components to consume the context without importing useContext every time.
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

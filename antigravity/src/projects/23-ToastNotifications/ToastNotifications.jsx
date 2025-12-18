import React, { useState, useEffect, createContext, useContext } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. Toast Context
const ToastContext = createContext();

// 2. Toast Item Component
const ToastItem = ({ toast, removeToast }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(toast.id);
        }, toast.duration || 3000);
        return () => clearTimeout(timer);
    }, [toast, removeToast]);

    const icons = {
        success: <CheckCircle size={20} className="text-green-500" />,
        error: <XCircle size={20} className="text-red-500" />,
        info: <Info size={20} className="text-blue-500" />,
        warning: <AlertTriangle size={20} className="text-yellow-500" />
    };

    const borders = {
        success: 'border-l-4 border-green-500',
        error: 'border-l-4 border-red-500',
        info: 'border-l-4 border-blue-500',
        warning: 'border-l-4 border-yellow-500'
    };

    return (
        <div className={`
            bg-white shadow-lg rounded-lg p-4 mb-3 flex items-start gap-3 w-80 transform transition-all duration-300 animate-slide-in-right
            ${borders[toast.type]}
        `}>
            {icons[toast.type]}
            <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm capitalize">{toast.type}</h4>
                <p className="text-gray-600 text-sm mt-0.5">{toast.message}</p>
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
            </button>
        </div>
    );
};

// 3. Toast Provider
const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (type, message, duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
                {toasts.map(toast => (
                    <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const useToast = () => useContext(ToastContext);

// 4. Demo Component
const ToastDemo = () => {
    const { addToast } = useToast();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Toast Notifications</h1>
                <p className="text-gray-500 mb-8">Click buttons to trigger different toast alerts.</p>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => addToast('success', 'Operation completed successfully!', 3000)}
                        className="p-4 bg-green-50 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition-colors border border-green-200"
                    >
                        Success Toast
                    </button>
                    <button
                        onClick={() => addToast('error', 'Something went wrong.', 3000)}
                        className="p-4 bg-red-50 text-red-700 font-semibold rounded-xl hover:bg-red-100 transition-colors border border-red-200"
                    >
                        Error Toast
                    </button>
                    <button
                        onClick={() => addToast('info', 'New updates are available.', 3000)}
                        className="p-4 bg-blue-50 text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                        Info Toast
                    </button>
                    <button
                        onClick={() => addToast('warning', 'Please check your inputs.', 3000)}
                        className="p-4 bg-yellow-50 text-yellow-700 font-semibold rounded-xl hover:bg-yellow-100 transition-colors border border-yellow-200"
                    >
                        Warning Toast
                    </button>
                </div>
            </div>
        </div>
    );
};

// Wrapper
const ToastNotificationsWrapper = () => {
    return (
        <ToastProvider>
            <ToastDemo />
        </ToastProvider>
    );
};

export default ToastNotificationsWrapper;

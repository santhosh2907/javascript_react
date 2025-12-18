import React, { useState, createContext, useContext } from 'react';
import { ArrowLeft, User, Lock, LogIn, LogOut, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        // Mock validation
        if (password === 'password') {
            setUser({ username, role: 'admin' });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

// 2. Protected Component
const Dashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center animate-fade-in">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-xl text-blue-600 font-medium mb-6">@{user.username}</p>
            <p className="text-gray-500 mb-8">You have successfully authenticated and accessed this protected route.</p>

            <button
                onClick={logout}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
                <LogOut size={20} /> Sign Out
            </button>
        </div>
    );
};

// 3. Login Form
const LoginForm = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        const success = login(username, password);
        if (!success) {
            setError('Invalid credentials (use password: "password")');
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-slide-up">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
                <p className="text-gray-500">Access your account</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                    <Shield size={16} /> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="Enter username"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            placeholder="password is 'password'"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-200"
                >
                    <LogIn size={20} /> Sign In
                </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-500">
                Hint: Use password <b>"password"</b>
            </p>
        </div>
    );
};

const AuthApp = () => {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>
            {user ? <Dashboard /> : <LoginForm />}
        </div>
    );
};

const UserAuthWrapper = () => (
    <AuthProvider>
        <AuthApp />
    </AuthProvider>
);

export default UserAuthWrapper;

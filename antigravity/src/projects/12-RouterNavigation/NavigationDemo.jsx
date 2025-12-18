import React from 'react';
import { ArrowLeft, Home, User, Settings, FileText } from 'lucide-react';
import { Link, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// Sub-components for nested routing
const DashboardHome = () => <div className="p-6 bg-blue-50 rounded-lg text-blue-800"><h2>Dashboard Home</h2><p>Welcome to the protected dashboard area.</p></div>;
const Profile = () => <div className="p-6 bg-purple-50 rounded-lg text-purple-800"><h2>User Profile</h2><p>This is the user profile settings page.</p></div>;
const SettingsPage = () => <div className="p-6 bg-gray-50 rounded-lg text-gray-800"><h2>App Settings</h2><p>Configure your application preferences here.</p></div>;

const NavigationDemo = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Since we are inside a main Router already in App.jsx, we can't easily nest another BrowserRouter.
    // However, we can demonstrate programmatic navigation and conditional rendering based on mocked 'routes' or just standard usage.
    // A common pattern for sub-apps is to use relative routes, but here we'll keep it simple:
    // We will build a mini-tab system that effectively acts like a router within this component using state,
    // OR we can actually use nested routes if we define them in the parent. 
    // To make this self-contained and "Router-like" within the constraint of the existing App.jsx structure without complex route config changes,
    // let's simulate a "Protected Route" flow which is a common router pattern.

    const handleLogin = () => {
        // Simulate login and redirect
        navigate('/projects/12/dashboard');
        // Note: For this to work in the main app, we'd need to register /projects/12/* in App.jsx or handling it carefully.
        // Simpler approach for this specific demo constraint:
        // We will just demonstrate internal state navigation resembling routing for the visual demo, 
        // OR better: Update App.jsx to handle /projects/12/*
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="hover:bg-slate-700 p-2 rounded-full"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-xl">Router Navigation Patterns</h1>
                    </div>
                </div>

                <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-64 bg-slate-100 border-r border-slate-200 p-4">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Menu</h3>
                        <nav className="space-y-2">
                            <button onClick={() => navigate('home')} className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-white hover:text-blue-600 rounded-lg transition-colors text-left"><Home size={18} /> Home</button>
                            <button onClick={() => navigate('profile')} className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-white hover:text-purple-600 rounded-lg transition-colors text-left"><User size={18} /> Profile</button>
                            <button onClick={() => navigate('settings')} className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-white hover:text-gray-900 rounded-lg transition-colors text-left"><Settings size={18} /> Settings</button>
                        </nav>

                        <div className="mt-8 p-4 bg-blue-100 rounded-lg">
                            <p className="text-xs text-blue-800 mb-2">Current Location:</p>
                            <code className="text-xs bg-white p-1 rounded block">{location.pathname}</code>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-8">
                        <h2 className="text-2xl font-bold mb-4">Nested Navigation Demo</h2>
                        <p className="text-gray-600 mb-6">
                            This project normally demonstrates `react-router-dom` features like `useNavigate`, `useLocation`, and nested routes.
                            Click the sidebar items to see programmatic navigation in action.
                        </p>

                        <div className="border-t pt-6">
                            <Routes>
                                {/* Note: These are relative paths to the parent route /projects/12 */}
                                {/* In a real app we'd define these in App.jsx or use a descendent <Routes> */}
                                <Route path="/" element={<DashboardHome />} />
                                <Route path="home" element={<DashboardHome />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="settings" element={<SettingsPage />} />
                            </Routes>

                            <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded text-sm">
                                Note: For these nested routes (e.g. <code>/projects/12/profile</code>) to work upon refresh,
                                the main Router in <code>App.jsx</code> needs to map <code>/projects/12/*</code>.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationDemo;

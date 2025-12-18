import React, { useState } from 'react';
import {
    ArrowLeft,
    Menu,
    X,
    Home,
    User,
    Settings,
    Mail,
    BarChart2,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarNavigation = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeItem, setActiveItem] = useState('Dashboard');

    const menuItems = [
        { name: 'Dashboard', icon: Home },
        { name: 'Analytics', icon: BarChart2 },
        { name: 'Profile', icon: User },
        { name: 'Messages', icon: Mail },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex relative overflow-hidden">
            {/* Mobile Toggle Button */}
            <button
                className="absolute top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    bg-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out absolute md:relative z-40 h-full
                    ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}
                `}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-lg">A</span>
                    </div>
                    <span
                        className={`ml-3 font-bold text-xl tracking-wider transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}
                    >
                        ANTIGRAVITY
                    </span>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-6 px-3 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveItem(item.name)}
                            className={`
                                w-full flex items-center p-3 rounded-xl transition-all group relative
                                ${activeItem === item.name
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }
                            `}
                        >
                            <item.icon size={22} className="flex-shrink-0" />
                            <span
                                className={`ml-3 font-medium whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                                    }`}
                            >
                                {item.name}
                            </span>

                            {/* Tooltip for collapsed mode */}
                            {!isOpen && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                                    {item.name}
                                </div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Toggle (Desktop) */}
                <div className="p-4 border-t border-slate-800 hidden md:flex justify-end">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ChevronRight size={20} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Footer User */}
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-slate-700"
                        />
                        <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
                            <p className="text-sm font-bold truncate">John Doe</p>
                            <p className="text-xs text-slate-500 truncate">john@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-4 md:p-8">
                <div className="flex items-center mb-8">
                    <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow mr-4 md:hidden">
                        <ArrowLeft size={24} />
                    </Link>
                    <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow mr-4 hidden md:block">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Sidebar Navigation</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[500px] flex flex-col items-center justify-center text-center">
                    <div className="bg-blue-50 p-6 rounded-full inline-block mb-6">
                        <Home size={48} className="text-blue-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to {activeItem}</h2>
                    <p className="text-gray-500 max-w-md">
                        This layout features a responsive collapsible sidebar with smooth transitions using Tailwind CSS.
                        Try toggling the sidebar or switching tabs.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default SidebarNavigation;

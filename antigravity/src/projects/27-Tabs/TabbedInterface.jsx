import React, { useState } from 'react';
import { ArrowLeft, Layout, Code, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = [
    {
        id: 'preview',
        label: 'Preview',
        icon: Layout,
        content: (
            <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-800">Preview Content</h3>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <p className="text-blue-800">
                        This is the preview tab content area. It typically shows the visual representation of what you are building.
                    </p>
                </div>
                <div className="h-32 bg-gray-100 rounded-xl"></div>
                <div className="h-32 bg-gray-100 rounded-xl"></div>
            </div>
        )
    },
    {
        id: 'code',
        label: 'Code',
        icon: Code,
        content: (
            <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-800">Source Code</h3>
                <pre className="bg-slate-900 text-slate-50 p-6 rounded-xl overflow-x-auto font-mono text-sm">
                    {`const Tabs = () => {
  const [activeTab, setActiveTab] = useState('preview');

  return (
    <div>
       {/* Tab Headers */}
       {/* Tab Content */}
    </div>
  );
}`}
                </pre>
            </div>
        )
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        content: (
            <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-800">Configuration</h3>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <span>Enable Dark Mode</span>
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <span>Auto-Save Changes</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                        <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow"></div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'profile',
        label: 'Profile',
        icon: User,
        content: (
            <div className="text-center py-8 animate-fade-in">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-800">John Doe</h3>
                <p className="text-gray-500">Frontend Developer</p>
            </div>
        )
    }
];

const TabbedInterface = () => {
    const [activeTab, setActiveTab] = useState('preview');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                {/* Header */}
                <div className="bg-white border-b border-gray-100 px-2 pt-2">
                    <div className="flex space-x-2">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center gap-2 px-6 py-4 rounded-t-xl font-medium text-sm transition-all duration-300 relative
                                        ${isActive
                                            ? 'text-blue-600 bg-gray-50'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-50 p-8">
                    {TABS.map((tab) => (
                        activeTab === tab.id && (
                            <div key={tab.id} role="tabpanel">
                                {tab.content}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabbedInterface;

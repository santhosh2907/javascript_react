import { Link, Outlet, useLocation } from 'react-router-dom';

const hooks = [
    { name: 'useState', path: '/use-state' },
    { name: 'useEffect', path: '/use-effect' },
    { name: 'useContext', path: '/use-context' },
    { name: 'useReducer', path: '/use-reducer' },
    { name: 'useRef', path: '/use-ref' },
    { name: 'useMemo', path: '/use-memo' },
    { name: 'useCallback', path: '/use-callback' },
    { name: 'useLayoutEffect', path: '/use-layout-effect' },
    { name: 'useImperativeHandle', path: '/use-imperative-handle' },
    { name: 'useTransition', path: '/use-transition' },
    { name: 'useDeferredValue', path: '/use-deferred-value' },
    { name: 'useId', path: '/use-id' },
    { name: 'useSyncExternalStore', path: '/use-sync-external-store' },
    { name: 'useDebugValue', path: '/use-debug-value' },
    { name: 'useInsertionEffect', path: '/use-insertion-effect' },
];

export default function Layout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        React Hooks
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">Advanced Pattern Mastery</p>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
                    {hooks.map((hook) => (
                        <Link
                            key={hook.path}
                            to={hook.path}
                            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === hook.path
                                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-900/20'
                                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                                }`}
                        >
                            {hook.name}
                        </Link>
                    ))}

                    <div className="mt-6 mb-2 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Simple Hooks (No CSS)
                    </div>
                    <Link to="/simple/use-state" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useState</Link>
                    <Link to="/simple/use-effect" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useEffect</Link>
                    <Link to="/simple/use-context" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useContext</Link>
                    <Link to="/simple/use-ref" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useRef</Link>
                    <Link to="/simple/use-memo" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useMemo</Link>
                    <Link to="/simple/use-callback" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useCallback</Link>
                    <Link to="/simple/use-reducer" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useReducer</Link>
                    <Link to="/simple/use-imperative-handle" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useImperativeHandle</Link>
                    <Link to="/simple/use-layout-effect" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useLayoutEffect</Link>
                    <Link to="/simple/use-debug-value" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useDebugValue</Link>
                    <Link to="/simple/use-transition" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useTransition</Link>
                    <Link to="/simple/use-deferred-value" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useDeferredValue</Link>
                    <Link to="/simple/use-id" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useId</Link>
                    <Link to="/simple/use-sync-external-store" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useSyncExternalStore</Link>
                    <Link to="/simple/use-insertion-effect" className="block px-4 py-2 text-gray-400 hover:text-gray-200">useInsertionEffect</Link>
                </nav>
                <div className="p-4 border-t border-gray-800 text-xs text-gray-600">
                    v1.0.0
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-950">
                <div className="max-w-5xl mx-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

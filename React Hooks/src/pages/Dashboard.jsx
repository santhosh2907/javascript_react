export default function Dashboard() {
    return (
        <div className="space-y-8">
            <header className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    React Hooks Mastery
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                    Deep dive into the React ecosystem. Explore advanced patterns, performance optimizations,
                    and under-the-hood behaviors of every React hook.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">⚡️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Performance First</h3>
                    <p className="text-gray-400 text-sm">
                        Learn how to effectively use <code className="text-indigo-400">useMemo</code>, <code className="text-indigo-400">useCallback</code>, and <code className="text-indigo-400">useTransition</code> to build buttery smooth UIs.
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-purple-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">🧠</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Advanced State</h3>
                    <p className="text-gray-400 text-sm">
                        Master complex state logic with <code className="text-purple-400">useReducer</code> and <code className="text-purple-400">useContext</code> patterns used in large-scale apps.
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-pink-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="text-2xl">🛠️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Real-world Patterns</h3>
                    <p className="text-gray-400 text-sm">
                        See how hooks like <code className="text-pink-400">useLayoutEffect</code> and <code className="text-pink-400">useImperativeHandle</code> solve specific library-level problems.
                    </p>
                </div>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                <h2 className="text-xl font-bold text-gray-300 mb-4">How to use this guide</h2>
                <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                        <span className="mr-3 text-indigo-400">•</span>
                        Select a hook from the sidebar to view its advanced examples.
                    </li>
                    <li className="flex items-start">
                        <span className="mr-3 text-indigo-400">•</span>
                        Each example includes interactive demos and explanation of the "Why" and "How".
                    </li>
                    <li className="flex items-start">
                        <span className="mr-3 text-indigo-400">•</span>
                        Check the code to see best practices in action.
                    </li>
                </ul>
            </div>
        </div>
    );
}

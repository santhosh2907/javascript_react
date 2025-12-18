import { useState, useDebugValue } from 'react';

// Custom Hook
function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);

    // This label will show up next to "useOnlineStatus" in React DevTools components tree.
    // Useful for libraries or shared logic.
    useDebugValue(isOnline ? 'Online' : 'Offline');

    return { isOnline, setIsOnline };
}

export default function UseDebugValueAdvanced() {
    const { isOnline, setIsOnline } = useOnlineStatus();

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Custom Hook Labeling</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="mb-4 text-gray-400">
                        Current Status: <span className={`font-bold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>{isOnline ? 'Online' : 'Offline'}</span>
                    </p>

                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
                    >
                        Toggle Status
                    </button>

                    <p className="mt-6 text-sm text-gray-500">
                        Open <strong>React DevTools</strong> (Components tab). select the <code>UseDebugValueAdvanced</code> component, and look at the hooks section.
                        You will see <code>useOnlineStatus: "Online"</code> (or "Offline").
                        <br />
                        Without <code>useDebugValue</code>, it would just show <code>State</code> or internal hooks without a clear label.
                    </p>
                </div>
            </section>
        </div>
    );
}

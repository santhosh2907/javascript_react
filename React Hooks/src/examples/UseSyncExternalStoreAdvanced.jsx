import { useSyncExternalStore } from 'react';

// External Store (outside React)
const windowStore = {
    subscribe(callback) {
        window.addEventListener('resize', callback);
        return () => window.removeEventListener('resize', callback);
    },
    getSnapshot() {
        return window.innerWidth;
    }
};

// Another store: Network status
const networkStore = {
    subscribe(callback) {
        window.addEventListener('online', callback);
        window.addEventListener('offline', callback);
        return () => {
            window.removeEventListener('online', callback);
            window.removeEventListener('offline', callback);
        };
    },
    getSnapshot() {
        return navigator.onLine;
    }
};

export default function UseSyncExternalStoreAdvanced() {
    const width = useSyncExternalStore(windowStore.subscribe, windowStore.getSnapshot);
    const isOnline = useSyncExternalStore(networkStore.subscribe, networkStore.getSnapshot);

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-emerald-400 mb-4">External Store Subscriptions</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-800 rounded">
                            <h3 className="text-gray-400 text-sm mb-1">Window Width</h3>
                            <p className="text-3xl font-mono text-white">{width}px</p>
                            <p className="text-xs text-emerald-500 mt-2">Resize window to see update</p>
                        </div>

                        <div className="p-4 bg-gray-800 rounded">
                            <h3 className="text-gray-400 text-sm mb-1">Network Status</h3>
                            <p className={`text-3xl font-bold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                                {isOnline ? 'ONLINE' : 'OFFLINE'}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">Disconnect WiFi to test</p>
                        </div>
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        <code>useSyncExternalStore</code> is the recommended way to subscribe to external data sources (browser APIs, Redux, Zustand, etc.) to avoid tearing and ensure consistency in concurrent mode.
                        It replaces <code>useEffect</code> + <code>useState</code> patterns for these cases.
                    </p>
                </div>
            </section>
        </div>
    );
}

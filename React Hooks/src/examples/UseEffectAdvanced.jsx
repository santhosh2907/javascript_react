import { useState, useEffect } from 'react';

export default function UseEffectAdvanced() {
    // 1. Cleanup Function
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isTracking, setIsTracking] = useState(false);

    useEffect(() => {
        if (!isTracking) return;

        const handleMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMove);
        console.log('Listener added');

        return () => {
            window.removeEventListener('mousemove', handleMove);
            console.log('Listener removed');
        };
    }, [isTracking]);

    // 2. Race Conditions & Data Fetching
    const [id, setId] = useState('1');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;
        const controller = new AbortController();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        setData(null);

        // Simulate API call
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { signal: controller.signal })
            .then(res => res.json())
            .then(result => {
                if (active) {
                    setData(result);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted for ID:', id);
                } else {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
            controller.abort();
        };
    }, [id]);

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-teal-400 mb-4">1. Effects & Cleanup</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => setIsTracking(!isTracking)}
                            className={`px-4 py-2 rounded transition font-medium ${isTracking ? 'bg-red-500/20 text-red-400' : 'bg-teal-500/20 text-teal-400'}`}
                        >
                            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                        </button>
                        <p className="text-gray-300 font-mono">
                            X: {mousePosition.x}, Y: {mousePosition.y}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        Check the console. Toggling "Stop Tracking" or unmounting the component runs the cleanup function, removing the event listener.
                        This prevents memory leaks.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-orange-400 mb-4">2. Race Conditions (AbortController)</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map(postId => (
                            <button
                                key={postId}
                                onClick={() => setId(String(postId))}
                                className={`w-10 h-10 rounded flex items-center justify-center transition border ${id === String(postId) ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
                            >
                                {postId}
                            </button>
                        ))}
                    </div>

                    <div className="h-40 p-4 bg-gray-950 rounded border border-gray-800 overflow-y-auto">
                        {loading ? (
                            <div className="animate-pulse text-gray-500">Loading post {id}...</div>
                        ) : data ? (
                            <div>
                                <h4 className="font-bold text-gray-200 mb-2">{data.title}</h4>
                                <p className="text-gray-400 text-sm">{data.body}</p>
                            </div>
                        ) : null}
                    </div>

                    <p className="mt-4 text-sm text-gray-500">
                        Rapidly click different numbers. The <code>AbortController</code> cancels previous pending requests, ensuring you don't show stale data (race condition) if a previous request finishes after the current one.
                    </p>
                </div>
            </section>
        </div>
    );
}

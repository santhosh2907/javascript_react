import { useId } from 'react';

const PasswordField = () => {
    const id = useId();
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm text-gray-400">
                Password (ID: <span className="font-mono text-xs">{id}</span>)
            </label>
            <input
                id={id}
                type="password"
                className="bg-gray-800 border-gray-700 text-white px-3 py-2 rounded focus:border-blue-500 outline-none"
                aria-describedby={`${id}-hint`}
            />
            <p id={`${id}-hint`} className="text-xs text-gray-600">
                Must be at least 8 characters.
            </p>
        </div>
    );
};

export default function UseIdAdvanced() {
    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Accessible Unique IDs</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="mb-6 text-gray-400">
                        <code>useId</code> generates unique IDs that are consistent across server and client (SSR safe).
                        It's perfect for connecting labels to inputs and aria-describedby relationships in reusable components.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PasswordField />
                        <PasswordField />
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        Inspect the DOM or look at the labels above. Notice each component instance gets a unique ID (e.g., :r1:, :r3:) without prop drilling or manual counters.
                    </p>
                </div>
            </section>
        </div>
    );
}

import { useState, useCallback, memo } from 'react';

// Child component wrapped in memo
// It only re-renders if props change.
const Button = memo(({ handleClick, children }) => {
    console.log(`Rendering button - ${children}`);
    return (
        <button
            onClick={handleClick}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded transition mr-2"
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default function UseCallbackAdvanced() {
    const [count, setCount] = useState(0);
    const [salary, setSalary] = useState(50000);

    // Without useCallback, this function is recreated on every render
    const incrementCount = useCallback(() => {
        setCount(prev => prev + 1);
    }, []); // No dependencies, so function reference is stable

    // Without useCallback, this function is recreated on every render
    const incrementSalary = useCallback(() => {
        setSalary(prev => prev + 1000);
    }, []);

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-pink-400 mb-4">Function Stability</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="mb-8">
                        <p className="mb-2 text-gray-300">Count: {count}</p>
                        {/* Passed memoized callback */}
                        <Button handleClick={incrementCount}>Increment Count</Button>
                    </div>

                    <div>
                        <p className="mb-2 text-gray-300">Salary: {salary}</p>
                        {/* Passed memoized callback */}
                        <Button handleClick={incrementSalary}>Increment Salary</Button>
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        Open Console. Clicking "Increment Count" renders ONLY the Count button.
                        "Increment Salary" rendering ONLY the Salary button.
                        <br />
                        Without <code>useCallback</code>, clicking either would re-render BOTH buttons because the handler functions would be new references every time.
                    </p>
                </div>
            </section>
        </div>
    );
}

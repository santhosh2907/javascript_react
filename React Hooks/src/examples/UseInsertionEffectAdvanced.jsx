import { useState, useInsertionEffect, useLayoutEffect } from 'react';

// This hook is intended for CSS-in-JS libraries, not general application code.
// It allows inserting <style> tags before any layout effects fire, avoiding layout thrashing.

export default function UseInsertionEffectAdvanced() {
    const [color, setColor] = useState('red');

    useInsertionEffect(() => {
        // This runs BEFORE DOM mutations are visible and BEFORE useLayoutEffect.
        // Perfect for inserting dynamic CSS rules.

        // Example: Create a style tag for the dynamic class
        const styleStub = document.createElement('style');
        styleStub.innerHTML = `
      .dynamic-class-${color} {
        color: ${color};
        font-weight: bold;
        padding: 10px;
        border: 2px dashed ${color};
      }
    `;
        document.head.appendChild(styleStub);

        console.log(`style tag inserted for ${color}`);

        return () => {
            document.head.removeChild(styleStub);
        };
    }, [color]);

    useLayoutEffect(() => {
        console.log('useLayoutEffect running (styles should be present)');
        // Accessing computed styles here triggers a reflow. 
        // If we inserted styles in useLayoutEffect, it would force *another* recalc.
        // useInsertionEffect prevents that double recalc.
    }, [color]);

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Style Injection (CSS-in-JS)</h2>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <p className="mb-4 text-gray-400">
                        <code>useInsertionEffect</code> runs synchronously <strong>before</strong> DOM mutations are effectively painted and before <code>useLayoutEffect</code>.
                        It is specifically designed for injecting global styles (like <code>&lt;style&gt;</code> tags) to prevent layout thrashing.
                    </p>

                    <div className={`dynamic-class-${color} mb-4 bg-gray-950 rounded`}>
                        I am styled dynamically via a generated style tag!
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setColor('cyan')}
                            className="px-4 py-2 bg-cyan-900 text-cyan-200 rounded hover:bg-cyan-800"
                        >
                            Cyan
                        </button>
                        <button
                            onClick={() => setColor('magenta')}
                            className="px-4 py-2 bg-fuchsia-900 text-fuchsia-200 rounded hover:bg-fuchsia-800"
                        >
                            Magenta
                        </button>
                        <button
                            onClick={() => setColor('orange')}
                            className="px-4 py-2 bg-orange-900 text-orange-200 rounded hover:bg-orange-800"
                        >
                            Orange
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

/**
 * JS Objects Mastery: Object Diff
 * 
 * Returns an object representing changes from obj1 to obj2.
 * {
 *   key: { old: val, new: val, type: 'UPDATE' | 'ADD' | 'DELETE' }
 * }
 */

function objectDiff(obj1, obj2) {
    const diff = {};

    // Union of keys
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (const key of keys) {
        const val1 = obj1[key];
        const val2 = obj2[key];

        // 1. Check existence
        if (!(key in obj1)) {
            diff[key] = { type: 'ADD', new: val2 };
            continue;
        }
        if (!(key in obj2)) {
            diff[key] = { type: 'DELETE', old: val1 };
            continue;
        }

        // 2. Check value inequality
        // Simple check: Primitives or References.
        // For deep diffing, we'd recurse here. Keeping it 'Shallow Diff' for this exercise 
        // or 'Deep Diff' if we add recursion. Let's do simple value comparison + deep recursion for objects.

        if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
            // Recursive Diff
            const nestedDiff = objectDiff(val1, val2);
            if (Object.keys(nestedDiff).length > 0) {
                diff[key] = { type: 'NESTED', changes: nestedDiff };
            }
        } else if (val1 !== val2) {
            diff[key] = { type: 'UPDATE', old: val1, new: val2 };
        }
    }

    return diff;
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('--- Object Diff ---');

    const v1 = {
        name: 'Alice',
        role: 'Admin',
        settings: { theme: 'Dark', n: 1 }
    };

    const v2 = {
        name: 'Alice',
        role: 'User', // Updated
        settings: { theme: 'Light', n: 1 }, // Nested Update
        active: true // Added
    };

    const changes = objectDiff(v1, v2);
    console.log(JSON.stringify(changes, null, 2));
}

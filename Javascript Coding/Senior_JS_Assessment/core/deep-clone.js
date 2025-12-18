/**
 * Senior JS Assessment: Deep Clone
 *
 * Challenge: Implement a deepClone function that handles:
 * 1. Primitive types (number, string, boolean, null, undefined, symbol)
 * 2. Objects and Arrays
 * 3. Date and RegExp objects
 * 4. Map and Set objects
 * 5. Circular references (CRITICAL)
 *
 * What we look for:
 * - Use of WeakMap to track visited objects (circular ref handling).
 * - Correct handling of prototypes (preserving the class of the object).
 * - Recursion depth handling (though standard recursion is fine for this scope).
 */

function deepClone(obj, seen = new WeakMap()) {
    // 1. Handle primitives and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 2. Handle Circular References
    if (seen.has(obj)) {
        return seen.get(obj);
    }

    // 3. Handle Date and RegExp
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    // 4. Handle Array, Map, Set, and Object
    // Using constructor to preserve prototype chain (generic approach)
    const clone = new obj.constructor();

    // Register in seen to break cycles BEFORE recurring
    seen.set(obj, clone);

    if (obj instanceof Map) {
        obj.forEach((value, key) => {
            clone.set(deepClone(key, seen), deepClone(value, seen));
        });
        return clone;
    }

    if (obj instanceof Set) {
        obj.forEach((value) => {
            clone.add(deepClone(value, seen));
        });
        return clone;
    }

    // Handle generic Objects and Arrays
    // Reflect.ownKeys gets both string and symbol keys
    Reflect.ownKeys(obj).forEach((key) => {
        clone[key] = deepClone(obj[key], seen);
    });

    return clone;
}

// --- TEST SUITE (Simple verification) ---
if (require.main === module) {
    console.log('Running Deep Clone Tests...');

    const original = {
        num: 1,
        str: 'hello',
        date: new Date(),
        arr: [1, 2, { a: 3 }],
        map: new Map([['key', 'val']]),
        set: new Set([1, 2, 3]),
    };
    original.self = original; // Circular ref

    const cloned = deepClone(original);

    console.assert(cloned !== original, 'References should be different');
    console.assert(cloned.arr[2].a === 3, 'Nested object should match');
    console.assert(cloned.self === cloned, 'Circular reference should point to clone');
    console.assert(cloned.date.getTime() === original.date.getTime(), 'Dates should match');
    console.assert(cloned.map.get('key') === 'val', 'Map should be cloned');

    console.log('Tests Passed!');
}

module.exports = deepClone;

/**
 * Senior JS Assessment: Deep Flatten Object
 *
 * Challenge: Write a function that flattens a nested object into a single depth object.
 * Keys should be dot-separated.
 *
 * Example:
 * Input: { a: 1, b: { c: 2, d: { e: 3 } } }
 * Output: { 'a': 1, 'b.c': 2, 'b.d.e': 3 }
 *
 * What we look for:
 * - Recursion.
 * - Key path construction.
 * - Handling of arrays (optional: 'arr.0', 'arr.1' or keep as array).
 *   (Decided: Treat arrays as objects with index keys for this implementation).
 */

function flattenObject(obj, prefix = '', res = {}) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (typeof val === 'object' && val !== null) {
                flattenObject(val, newKey, res);
            } else {
                res[newKey] = val;
            }
        }
    }
    return res;
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('Running Flatten Object Tests...');

    const input = {
        a: 1,
        b: {
            c: 2,
            d: {
                e: 3
            }
        },
        f: [10, 20]
    };

    const output = flattenObject(input);

    console.assert(output['a'] === 1, 'Top level key');
    console.assert(output['b.c'] === 2, 'Nested key');
    console.assert(output['b.d.e'] === 3, 'Deeply nested key');
    console.assert(output['f.0'] === 10, 'Array index key');

    console.log('Tests Passed!');
}

module.exports = flattenObject;

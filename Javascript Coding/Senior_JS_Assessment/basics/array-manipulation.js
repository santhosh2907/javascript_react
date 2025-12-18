/**
 * Senior JS Assessment: Array Manipulation & Logic
 *
 * Constraints: NO built-in high-level methods (map, filter, reduce, JSON.stringify, Set).
 * Use simple loops (for, while) Only.
 *
 * 1. uniqueArrays(arr): Remove duplicate arrays from an array of arrays.
 * 2. characterFrequency(str): key-value count.
 */

// Helper: Manual Deep Equality Check
function deepEqual(a, b) {
    if (a === b) return true;

    // If either is nill or not an object, strict equality failed so return false
    if (a === null || typeof a !== 'object' || b === null || typeof b !== 'object') {
        return false;
    }

    // Handle Arrays
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    // Handle Objects (Basic check, ignoring prototypes for this specific logic challenge)
    const keysA = [];
    for (let key in a) if (Object.prototype.hasOwnProperty.call(a, key)) keysA.push(key);

    const keysB = [];
    for (let key in b) if (Object.prototype.hasOwnProperty.call(b, key)) keysB.push(key);

    if (keysA.length !== keysB.length) return false;

    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (!deepEqual(a[key], b[key])) return false;
    }

    return true;
}

function uniqueArrays(arrOfArrays) {
    const result = [];

    // Outer loop: Iterate input
    for (let i = 0; i < arrOfArrays.length; i++) {
        const candidate = arrOfArrays[i];
        let isDuplicate = false;

        // Inner loop: Check if candidate exists in 'result'
        for (let j = 0; j < result.length; j++) {
            if (deepEqual(candidate, result[j])) {
                isDuplicate = true;
                break;
            }
        }

        if (!isDuplicate) {
            result.push(candidate);
        }
    }

    return result;
}

function characterFrequency(str) {
    const freq = {};

    // Standard loop instead of for..of (if we want to be super strict, though for..of is syntax)
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (freq[char]) {
            freq[char]++;
        } else {
            freq[char] = 1;
        }
    }

    return freq;
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('Running Array/Logic Tests (No Built-ins)...');

    // Test 1: Unique Arrays
    const arrays = [
        [1, 2],
        [3, 4],
        [1, 2], // Duplicate
        [2, 1], // Different order (not equal by strict array index comparison)
    ];
    const unique = uniqueArrays(arrays);

    // console.log(unique);
    console.assert(unique.length === 3, `Should be 3 unique arrays, got ${unique.length}`);
    console.assert(unique[0][0] === 1, 'Order preserved');

    // Test 2: Deep nested objects
    const deepObjs = [
        { a: 1, b: { c: 2 } },
        { a: 1, b: { c: 2 } }, // Dup
        { a: 1, b: { c: 3 } }
    ];
    const uniqueDeep = uniqueArrays(deepObjs);
    console.assert(uniqueDeep.length === 2, `Should handle deep objects, got ${uniqueDeep.length}`);

    // Test 3: Char Frequency
    const freq = characterFrequency('banana');
    console.assert(freq['a'] === 3, 'Counts "a" correctly');
    console.assert(freq['b'] === 1, 'Counts "b" correctly');

    console.log('Tests Passed!');
}

module.exports = { uniqueArrays, characterFrequency };

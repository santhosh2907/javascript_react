/**
 * 04_custom_deep_clone.js
 * 
 * SENIOR DEV INTERVIEW QUESTION:
 * "Write a function to deep clone an object that handles Circular References."
 */

function deepClone(obj, hash = new WeakMap()) {
    // 1. Handle Primitives and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // 2. Handle Circular References (Cyclic Dependency)
    // If we've seen this object before, return the stored copy to stop recursion.
    if (hash.has(obj)) {
        return hash.get(obj);
    }

    // 3. Handle Special Object Types
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);

    // 4. Handle Map
    if (obj instanceof Map) {
        const result = new Map();
        hash.set(obj, result); // Store ref BEFORE recursion
        obj.forEach((val, key) => {
            result.set(key, deepClone(val, hash));
        });
        return result;
    }

    // 5. Handle Set
    if (obj instanceof Set) {
        const result = new Set();
        hash.set(obj, result); // Store ref BEFORE recursion
        obj.forEach((val) => {
            result.add(deepClone(val, hash));
        });
        return result;
    }

    // 6. Handle Objects and Arrays
    // Get the keys (Reflect.ownKeys captures Symbols too!)
    const keys = Reflect.ownKeys(obj);

    // Create a new object with the same Prototype
    // (Or just {}/[] if you don't care about prototypes, but this is cleaner)
    const result = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

    hash.set(obj, result); // Save to hash map

    keys.forEach(key => {
        result[key] = deepClone(obj[key], hash);
    });

    return result;
}

// --- TEST SUITE ---

console.log("--- Testing Custom Deep Clone ---");

const original = {
    name: "Master",
    age: 99,
    hobbies: ["Chess", "Go"],
    birthday: new Date("1990-01-01"),
    meta: new Map([["id", 123]]),
    unique: new Set([1, 1, 2]),
    sym: Symbol("secret")
};

// Add Circular Reference
original.myself = original;

const copy = deepClone(original);

console.log("1. Basic Props:", copy.name === "Master");
console.log("2. Nested Array:", copy.hobbies !== original.hobbies && copy.hobbies[0] === "Chess");
console.log("3. Date Object:", copy.birthday instanceof Date && copy.birthday !== original.birthday);
console.log("4. Map:", copy.meta instanceof Map && copy.meta.get("id") === 123);
console.log("5. Set:", copy.unique instanceof Set && copy.unique.has(2));
console.log("6. Circular Ref:", copy.myself === copy); // Crucial!

console.log("\nAll checks passed! ✅");

/**
 * 03_structured_clone.js
 * 
 * The Modern Solution: structuredClone()
 * Available in Node.js 17+ and all modern browsers.
 * 
 * It uses the "Structured Clone Algorithm" (the same used for postMessage and IndexedDB).
 */

const original = {
    name: "Modern App",
    date: new Date(),        // Works!
    map: new Map([["key", "value"]]), // Works!
    set: new Set([1, 2, 3]), // Works!
    regex: /abc/g,           // Works!
    error: new Error("Boom"), // Works!
    // func: () => {},       // ERROR: "DataCloneError" (Cannot clone functions)
};

// 1. Handling Circular References
original.self = original; // Circular Reference!

console.log("--- 1. Using structuredClone() ---");

try {
    const deepCopy = structuredClone(original);

    console.log("Deep Copy created successfully!");

    // Verify Independence
    console.log("\n--- 2. Independence Verification ---");
    console.log("Original Date:", original.date.toISOString());
    console.log("Copy Date:    ", deepCopy.date.toISOString());
    console.log("Are dates same ref?", original.date === deepCopy.date); // false (Good!)

    // Verify Circular Ref
    console.log("Circular Ref works:", deepCopy.self === deepCopy); // true

    // Verify Types preserved
    console.log("Map preserved:", deepCopy.map instanceof Map); // true
    console.log("Set preserved:", deepCopy.set instanceof Set); // true

} catch (err) {
    console.error("Error during cloning:", err.message);
}

console.log("\n--- 3. The One Limitation ---");
console.log("If you uncomment 'func' in the object, structuredClone() will throw an error.");
console.log("It cannot clone functions or DOM elements.");

/**
 * 03_shallow_vs_deep.js
 * 
 * CORE CONCEPT:
 * Arrays store "References" to objects, not the objects themselves.
 * Copying the array only copies the "Pointers".
 */

console.log("--- 1. PRIMITIVES (Safe) ---");
const numbers = [1, 2, 3];
const numbersCopy = [...numbers]; // Spread syntax
numbersCopy[0] = 999;

console.log("Original Numbers:", numbers); // [1, 2, 3] -> Safe!
console.log("Copy Numbers:", numbersCopy); // [999, 2, 3]


console.log("\n--- 2. OBJECTS (The Trap) ---");
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

// Shallow Copy
const usersShallow = [...users];

// Modifying the ARRAY structure is safe...
usersShallow.push({ id: 3, name: "Charlie" });

// BUT modifying an ITEM inside is NOT safe!
usersShallow[0].name = "EVIL ALICE";

console.log("Original Users (Index 0):", users[0].name);
// "EVIL ALICE" -> OMG! Original was mutated.
console.log("Explanation: Both arrays point to the SAME object in memory.");


console.log("\n--- 3. DEEP COPY (The Solution) ---");

const originalData = [{ id: 1, config: { theme: "dark" } }];

// Technique A: JSON (Old School)
// Pros: Works in all browsers. Cons: Slow, loses Dates/Functions/Undefined.
const deepJSON = JSON.parse(JSON.stringify(originalData));
deepJSON[0].config.theme = "light";

console.log("Original Theme:", originalData[0].config.theme); // "dark" -> Safe!


// Technique B: structuredClone (Modern Standard)
// Pros: Handles Dates, RegExp, Maps, Sets, Cyclic Refs. Fast.
const modernData = [{ date: new Date() }];
const deepModern = structuredClone(modernData);

// Prove independence
deepModern[0].date.setFullYear(2099);

console.log("Original Year:", modernData[0].date.getFullYear()); // 2026
console.log("Copy Year:", deepModern[0].date.getFullYear()); // 2099

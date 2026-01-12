/**
 * 02_methods_deep_dive.js
 * 
 * Iteration and Transformation
 */

const numbers = [1, 2, 3, 4, 5];

console.log("--- 1. TRANSFORMATION (map) ---");
// Returns a NEW array. Does not change original.
const squared = numbers.map(num => num * num);
console.log("Original:", numbers);
console.log("Squared:", squared);


console.log("\n--- 2. FILTERING (filter) ---");
// Returns NEW array with items that pass condition.
const evens = numbers.filter(num => num % 2 === 0);
console.log("Evens:", evens);


console.log("\n--- 3. ACCUMULATION (reduce) ---");
// Reduce array to a SINGLE value.
const sum = numbers.reduce((acc, current) => acc + current, 0);
console.log("Sum:", sum);


console.log("\n--- 4. SEARCHING ---");
// find: returns ITEM
const found = numbers.find(num => num > 3);
console.log("First > 3:", found); // 4

// includes: returns BOOLEAN
console.log("Has 10?", numbers.includes(10)); // false

// some: returns BOOLEAN (if ANY pass)
console.log("Has negative?", numbers.some(n => n < 0)); // false


console.log("\n--- 5. SORTING (Mutation Alert!) ---");
// sort() MUTATES the original array!
// Also, default sort converts to STRING (1, 10, 2...)
const unsorted = [10, 2, 5, 1];

// Copy first to avoid mutating original
const sortedSafe = [...unsorted].sort((a, b) => a - b);

console.log("Unsorted Original:", unsorted);
console.log("Sorted Copy:", sortedSafe);

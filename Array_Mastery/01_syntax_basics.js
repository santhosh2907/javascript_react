/**
 * 01_syntax_basics.js
 * 
 * Covering creation, access, and basic mutations.
 */

console.log("--- 1. CREATION ---");

// A. Array Literals (Best Practice)
const arr1 = [1, 2, 3];
console.log("Literal:", arr1);

// B. Array Constructor (Watch out!)
const arr2 = new Array(3); // Creates 3 EMPTY SLOTS, not [3]
console.log("new Array(3):", arr2); // [ <3 empty items> ]

const arr3 = new Array(1, 2, 3); // Creates [1, 2, 3]
console.log("new Array(1,2,3):", arr3);

// C. Array.of (Fixed constructor behavior)
const arr4 = Array.of(3);
console.log("Array.of(3):", arr4); // [3]

// D. Array.from (From array-like objects)
const set = new Set(["a", "b", "c", "a"]);
const arr5 = Array.from(set);
console.log("Array.from(Set):", arr5); // ["a", "b", "c"]


console.log("\n--- 2. ACCESS & MODIFICATION ---");

const fruits = ["Apple", "Banana", "Cherry"];

// Access
console.log("Last item:", fruits[fruits.length - 1]);
console.log("Negative (at):", fruits.at(-1)); // Modern syntax

// Mutation Methods
fruits.push("Date");   // Add to End
fruits.unshift("Fig"); // Add to Start
console.log("After Add:", fruits);

const removedEnd = fruits.pop(); // Remove End
const removedStart = fruits.shift(); // Remove Start
console.log("After Remove:", fruits);

// Splice (General Purpose Add/Remove)
// splice(startIndex, deleteCount, ...itemsToAdd)
fruits.splice(1, 1, "Blueberry", "Blackberry");
// Removed "Banana" (index 1), added 2 berries
console.log("After Splice:", fruits);

/**
 * 01_shallow_copy.js
 * 
 * "Shallow Copy" means creating a new object, but copying the REFERENCE of nested objects.
 * This is the #1 bug source when manipulating state in React/Redux.
 */

// 1. The Setup: A nested object
const originalUser = {
    name: "Alice",
    age: 30,
    details: {
        city: "New York",
        zip: 10001
    },
    hobbies: ["Reading", "Coding"]
};

console.log("--- 1. Creating Shallow Copies ---");

// Method A: Spread Operator (Modern Preferred)
const spreadCopy = { ...originalUser };

// Method B: Object.assign (Legacy/Compat)
const assignCopy = Object.assign({}, originalUser);

console.log("Original:", originalUser);
console.log("Spread Copy:", spreadCopy);

console.log("\n--- 2. PROOF: Top-level properties are safe ---");
spreadCopy.name = "Bob"; // Only changes the copy
console.log("Original Name:", originalUser.name); // 'Alice' (Safe!)
console.log("Copy Name:    ", spreadCopy.name);   // 'Bob'

console.log("\n--- 3. THE TRAP: Nested objects are SHARED references ---");
// Modifying a nested property in the COPY...
spreadCopy.details.city = "San Francisco";

// ...ALSO changes the ORIGINAL! 😱
console.log("Original City:", originalUser.details.city); // 'San Francisco' (CHANGED!)
console.log("Copy City:    ", spreadCopy.details.city);   // 'San Francisco'

// Same happens with Arrays (which are objects)
spreadCopy.hobbies.push("Gaming");
console.log("Original Hobbies:", originalUser.hobbies); // Includes 'Gaming'

/**
 * LESSON:
 * If your object has more than one level of depth,
 * a Shallow Copy is NOT enough to prevent mutations.
 */

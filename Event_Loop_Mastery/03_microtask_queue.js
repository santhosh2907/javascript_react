/**
 * 03_microtask_queue.js
 * 
 * Goal: Demonstrate Microtask (Promise) priority over Macrotasks (setTimeout).
 * 
 * Rule: 
 * All Microtasks must be processed before the NEXT Macrotask starts.
 */

console.log("1. Script Start");

// Macrotask
setTimeout(() => {
    console.log("5. Macrotask (setTimeout)");
}, 0);

// Microtask
Promise.resolve().then(() => {
    console.log("3. Microtask 1 (Promise)");
}).then(() => {
    // Chained microtasks also run in the same tick!
    console.log("4. Microtask 2 (Chained Promise)");
});

console.log("2. Script End");

/**
 * Expected Output:
 * 1. Script Start
 * 2. Script End
 * 3. Microtask 1 (Promise)
 * 4. Microtask 2 (Chained Promise)
 * 5. Macrotask (setTimeout)
 * 
 * Why?
 * Call Stack clears -> Check Microtasks (Runs 3, then 4) -> Check Macrotasks (Runs 5)
 */

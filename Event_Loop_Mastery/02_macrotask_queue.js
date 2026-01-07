/**
 * 02_macrotask_queue.js
 * 
 * Goal: Demonstrate how setTimeout pushes tasks to the Callback (Macrotask) Queue.
 * 
 * Explanation:
 * - Synchronous code runs first.
 * - setTimeout(..., 0) does NOT run immediately. It goes to the Queue.
 * - The Queue is processed ONLY after the Call Stack is empty.
 */

console.log("1. Start");

// This goes to the Macrotask Queue
setTimeout(() => {
    console.log("4. Timeout callback executed");
}, 0);

console.log("2. Middle");

function syncTask() {
    console.log("3. Sync task executed");
}
syncTask();

console.log("5. End of synchronous code");

/**
 * Expected Output:
 * 1. Start
 * 2. Middle
 * 3. Sync task executed
 * 5. End of synchronous code
 * 4. Timeout callback executed
 * 
 * Note: Even with 0ms delay, line 4 prints LAST because it had to wait 
 * for the stack to clear.
 */

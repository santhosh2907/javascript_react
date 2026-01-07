/**
 * 01_call_stack_blocking.js
 * 
 * Goal: Demonstrate that JavaScript is single-threaded and synchronous code blocks execution.
 * 
 * Explanation:
 * The "Blocking Operation" loop runs on the main stack.
 * Even if you click or try to do other things, the browser/runtime is frozen until this loop finishes.
 */

console.log("1. Start of script");

function heavyOperation() {
    console.log("3. Starting heavy operation...");

    // Simulate a heavy CPU task (blocking)
    const start = Date.now();
    while (Date.now() - start < 2000) {
        // Blocks for 2 seconds
    }

    console.log("4. Heavy operation finished");
}

console.log("2. Preparing to block...");
heavyOperation();

console.log("5. End of script");

/**
 * Expected Output:
 * 1. Start of script
 * 2. Preparing to block...
 * 3. Starting heavy operation...
 * (Pause for 2 seconds)
 * 4. Heavy operation finished
 * 5. End of script
 */

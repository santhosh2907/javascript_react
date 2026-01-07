/**
 * 04_complex_flow.js
 * 
 * Goal: A complex scenario combining Async/Await, Promises, and setTimeout.
 * This is a classic interview question pattern.
 */

console.log('1. Script Start');

setTimeout(() => {
    console.log('8. setTimeout');
}, 0);

async function async1() {
    console.log('2. async1 start');
    await async2();
    // IMPORTANT: 'await' roughly behaves like Promise.resolve().then(...)
    // So the rest of this function is put in the Microtask queue.
    console.log('6. async1 end');
}

async function async2() {
    console.log('3. async2');
}

async1();

new Promise((resolve) => {
    console.log('4. Promise Executor (Sync)');
    resolve();
}).then(() => {
    console.log('7. Promise then');
});

console.log('5. Script End');

/**
 * Execution Walkthrough:
 * 
 * 1. '1. Script Start' (Sync)
 * 2. setTimeout scheduled -> Macrotask Queue (Sync)
 * 3. async1() called (Sync)
 * 4. '2. async1 start' (Sync)
 * 5. async2() called (Sync)
 * 6. '3. async2' (Sync)
 * 7. await async2() yields control -> 'async1 end' part acts as a Microtask.
 * 8. Promise Executor runs '4. Promise Executor (Sync)'
 * 9. resolve() schedules .then callback -> Microtask Queue.
 * 10. '5. Script End' (Sync)
 * 
 * Call Stack Empty. Check Microtasks:
 * 11. Resume async1 -> '6. async1 end'
 * 12. Run Promise callback -> '7. Promise then'
 * 
 * Microtasks Empty. Check Macrotasks:
 * 13. Run setTimeout callback -> '8. setTimeout'
 */

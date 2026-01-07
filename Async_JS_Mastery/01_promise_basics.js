/**
 * 01_promise_basics.js
 * 
 * CORE CONCEPTS:
 * 1. A Promise is an object representing the eventual completion or failure of an asynchronous operation.
 * 2. States: 'pending', 'fulfilled' (resolved), 'rejected'.
 * 3. Consumers: .then() for success, .catch() for errors, .finally() for cleanup.
 */

// --- 1. Creating a Simple Promise ---
const coinToss = new Promise((resolve, reject) => {
    // Simulating an async operation (e.g., waiting 1 second)
    setTimeout(() => {
        const isHeads = Math.random() > 0.5;
        if (isHeads) {
            resolve("Heads! You win."); // Transition to 'fulfilled'
        } else {
            reject("Tails! You lose."); // Transition to 'rejected'
        }
    }, 1000);
});

console.log("1. Coin toss started...");

// --- 2. Consuming the Promise ---
coinToss
    .then((result) => {
        console.log(`2. Success: ${result}`);
        // Chaining: You can return a value to the next .then()
        return "Prize: 100 Gold";
    })
    .then((prize) => {
        console.log(`3. Claimed: ${prize}`);
    })
    .catch((error) => {
        console.error(`2. Error: ${error}`);
    })
    .finally(() => {
        console.log("4. Game Over (Cleanup happening here).");
    });

/**
 * INTERVIEW TIP:
 * - Remember that .then() always returns a NEW Promise.
 * - If you return a value, the next .then receives it.
 * - If you return a Promise, the next .then waits for it to settle.
 * - If you throw an error, it skips to the nearest .catch.
 */



// 1. Coin toss started...
// ERROR!
// 2. Error: Tails! You lose.
// 4. Game Over (Cleanup happening here).



// 1. Coin toss started...
// 2. Success: Heads! You win.
// 3. Claimed: Prize: 100 Gold
// 4. Game Over (Cleanup happening here).
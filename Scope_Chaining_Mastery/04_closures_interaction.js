/**
 * 04_closures_interaction.js
 * 
 * CONCEPT: Closures & Scope Chain Persistence
 * 
 * A Closure is NOT a magic snapshot. It is simply a function REMEMBERING its Outer Environment Reference.
 * Even when the outer function finishes execution and pops off the stack,
 * if an inner function survives (returned, passed as callback), 
 * the Outer Lexical Environment CANNOT be garbage collected because the inner function still points to it.
 */

function createCounter() {
    let count = 0; // This variable lives in the heap now, essentially.

    return function increment() {
        count++; // Accessing outer scope variable
        console.log(`Current Count:`, count);
    };
}

const counter1 = createCounter(); // Creates Environment A
const counter2 = createCounter(); // Creates Environment B (totally separate)

console.log("--- Counter 1 ---");
counter1(); // 1
counter1(); // 2

console.log("\n--- Counter 2 (Independent) ---");
counter2(); // 1 (Does not share state with counter1)

// ==========================================
// DEEP DIVE: The "Backpack" Analogy
// ==========================================
// When `increment` is returned, it carries a "backpack" (its closure).
// That backpack contains all the variables that were in scope when `increment` was created.

// ==========================================
// EXAMPLE 2: Closure in Loops (Classic)
// ==========================================

console.log("\n--- Closure Loop Fix ---");
// Problem: var i is shared.
for (var i = 1; i <= 3; i++) {
    // Immediate Invoked Function Expression (IIFE) creates a NEW scope for each iteration
    (function (capturedI) {
        setTimeout(function () {
            console.log(`Delayed: ${capturedI}`);
        }, 100);
    })(i);
}

// Without the IIFE, it would print "4, 4, 4" because `i` is function-scoped (or global here) 
// and the loop finishes before the timeout runs.

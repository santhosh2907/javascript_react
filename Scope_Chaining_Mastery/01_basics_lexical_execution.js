/**
 * 01_basics_lexical_execution.js
 * 
 * CONCEPT: Lexical Scoping (Static Scoping)
 * 
 * "Lexical" means "related to text" or "where the code is written".
 * JavaScript's scope is determined at the time you WRITE the code,
 * not at the time you CALL the function.
 * 
 * Execution Contexts represent the environment where the code IS RUNNING.
 * Lexical Environments represent the environment where the code WAS WRITTEN.
 */

// ==========================================
// EXAMPLE 1: Where is it written?
// ==========================================

const myVar = "Global";

function outer() {
    const myVar = "Outer";

    function inner() {
        // When `inner` is defined here, it's physically inside `outer`.
        // So its outer reference is `outer`'s environment.
        console.log("Inside inner:", myVar);
    }

    return inner;
}

const basicFunc = outer();
basicFunc(); // Output: "Outer"

// Why? Even though we call `basicFunc` (which is `inner`) here in the global scope,
// it remembers where it was born (inside `outer`).

// ==========================================
// EXAMPLE 2: The classic "Dynamic Scope" confusion
// ==========================================

const value = 10;

function foo() {
    console.log("In foo, value is:", value);
}

function bar() {
    const value = 20;
    // Calling foo inside bar.
    // If JS had "Dynamic Scoping", foo would see `value = 20`.
    // But JS has "Lexical Scoping", so foo sees `value = 10` (where foo was written).
    foo();
}

console.log("\n--- Lexical Scope Check ---");
bar(); // Output: 10
// Explanation: `foo` was defined in the Global Scope. Its outer reference is the Global Scope.
// It doesn't matter that `bar` called it. `bar`'s scope is NOT in `foo`'s chain.

// ==========================================
// SENIOR INTERVIEW TAKEAWAY
// ==========================================
// "The Scope Chain is defined by the physical nesting of functions in the source code.
// The Call Stack (execution context stack) is defined by how functions invoke each other.
// They are NOT the same thing."

/**
 * 03_block_vs_function_scope.js
 * 
 * CONCEPT: Block Scope vs Function Scope
 * 
 * - `var` is Function-scoped. It "leaks" out of blocks like if/for, but stops at function boundaries.
 * - `let` and `const` are Block-scoped. They die at the end of any block { }.
 */

// ==========================================
// EXAMPLE 1: The 'var' leakage
// ==========================================

function varTest() {
    if (true) {
        var leakedVar = "I am alive outside the calling block!";
        let safeVar = "I am trapped inside!";
    }

    console.log("varTest output:");
    console.log(leakedVar); // Works!

    try {
        console.log(safeVar); // Error!
    } catch (e) {
        console.log("Error caught: " + e.message); // ReferenceError
    }
}

varTest();

// ==========================================
// EXAMPLE 2: Block Scope creates a new Lexical Environment
// ==========================================

{
    // detailed scope analysis
    const outside = "Outside";
    {
        const inside = "Inside";
        // This inner block has a pointer to the outer block's environment.
        console.log("\nNested Block:", outside);
    }
    // console.log(inside); // ReferenceError
}

// ==========================================
// EXAMPLE 3: Temporal Dead Zone (TDZ)
// ==========================================
// The TDZ is the time between entering a scope and the actual declaration being evaluated.

console.log("\n--- TDZ Demo ---");

{
    // console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization
    // The variable EXISTS in memory (hoisted), but is uninitialized (in the TDZ).

    const tdzVar = "Now I am safe to use";
    console.log(tdzVar);
}

// ==========================================
// SENIOR NOTE:
// ==========================================
// `var` is hoisted and initialized with `undefined` immediately.
// `let`/`const` are hoisted but NOT initialized. They stay in TDZ.

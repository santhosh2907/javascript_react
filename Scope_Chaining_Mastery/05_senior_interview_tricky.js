/**
 * 05_senior_interview_tricky.js
 * 
 * CONCEPT: Senior Level Gotchas & Edge Cases
 * 
 * Testing knowledge of:
 * - Function declarations vs Expressions in hoisting
 * - Parameter shadowing
 * - Named Function Expressions
 */

// ==========================================
// TRICK 1: Parameter Shadowing and Arguments
// ==========================================
console.log("--- Trick 1 ---");

var x = 10;

function foo(x) {
    // This 'x' is a parameter (local variable).
    // It shadows the global 'x'.
    console.log(x); // 20 (passed value)
    x = 30; // Modifies local 'x'
}

foo(20);
console.log(x); // 10 (Global is untouched)

// ==========================================
// TRICK 2: Function Declaration vs Expression
// ==========================================
console.log("\n--- Trick 2 ---");

// Hoisting works differently
// console.log(declFunc()); // Works: "Declaration"
// console.log(exprFunc()); // TypeError: exprFunc is not a function (it's undefined)

function declFunc() {
    return "Declaration";
}

var exprFunc = function () {
    return "Expression";
};

// ==========================================
// TRICK 3: Named Function Expression Scope
// ==========================================
console.log("\n--- Trick 3 ---");

var baz = function bar() {
    console.log("Inside, bar exists:", typeof bar); // "function"
};

baz();

try {
    console.log("Outside, bar is:", typeof bar);
} catch (e) {
    console.log("Outside, bar is ReferenceError"); // bar is ONLY available inside itself!
}

// ==========================================
// TRICK 4: Accidental Global (Strict Mode Fix)
// ==========================================
console.log("\n--- Trick 4 ---");

function oops() {
    // "use strict"; // If you uncomment this, it throws ReferenceError
    y = 100; // No 'var/let/const'. Creates window.y (global pollution)
}

oops();
console.log("Global y:", global.y || "undefined (in Node strict mode might behave differently)");
// In a browser, this prints 100. In Node modules, it might behave strictly.

// ==========================================
// SENIOR TAKEAWAY
// ==========================================
// Always inspect:
// 1. Is there a parameter with the same name?
// 2. Is it a function expression or declaration?
// 3. Is "use strict" active?

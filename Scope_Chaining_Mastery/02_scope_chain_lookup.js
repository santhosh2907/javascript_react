/**
 * 02_scope_chain_lookup.js
 * 
 * CONCEPT: The Scope Chain & Shadowing
 * 
 * When a variable is accessed, the JS engine looks for it in the CURRENT execution context's
 * Lexical Environment. If not found, it traverses up the chain to the OUTER reference.
 */

const globalVar = "I am Global";

function level1() {
    const level1Var = "I am Level 1";
    const commonName = "Level 1 Common"; // Shadowing candidate

    function level2() {
        const level2Var = "I am Level 2";
        const commonName = "Level 2 Common"; // Shadows level1's commonName

        function level3() {
            const level3Var = "I am Level 3";

            globalVar = "dummy -- inside function"

            console.log("\n--- In Level 3 ---");
            console.log(level3Var); // Found in Level 3
            console.log(level2Var); // Found in Level 2 (1 step up)
            console.log(level1Var); // Found in Level 1 (2 steps up)
            console.log(globalVar); // Found in Global (3 steps up)

            // SHADOWING DEMO
            // It finds the nearest `commonName` in the chain.
            console.log("Shadowing Check:", commonName); // "Level 2 Common"
        }

        level3();
        console.log("\n--- In Level 2 ---");
        // console.log(level3Var); // ERROR! cannot look DOWN the chain.
    }

    level2();
    console.log("\n--- In Level 1 ---");
    console.log("Shadowing Check:", commonName); // "Level 1 Common" (The one in this scope)
}
globalVar = "dummy -- outside function"
console.log(globalVar)

level1();

// ==========================================
// CONCEPT: The Lookup is One-Way
// ==========================================
// You can look UP (outwards), but you can never look DOWN (inwards).
// A parent scope has NO access to variables declared inside its children.

try {
    console.log("\nTrying to access inner variable from global:");
    console.log(level1Var);
} catch (e) {
    console.error("Error caught:", e.message); // ReferenceError: level1Var is not defined
}

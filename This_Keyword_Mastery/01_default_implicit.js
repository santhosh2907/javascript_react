/**
 * 01_default_implicit.js
 * 
 * Rules Covered:
 * 4. Default Binding (Standalone execution)
 * 3. Implicit Binding (Dot notation)
 */

"use strict"; // Using strict mode affects Default Binding!

console.log("--- 1. DEFAULT BINDING ---");

function showGlobal() {
    // In strict mode, 'this' is undefined. 
    // In non-strict mode, it would be the global object (window/global).
    console.log("Standalone call 'this' is:", this);
}

showGlobal(); // Call site: Standalone (Rule 4)


console.log("\n--- 2. IMPLICIT BINDING ---");

const user = {
    name: "Santhosh",
    age: 25,
    logName: function () {
        console.log("Logged Name:", this.name);
    }
};

// Call site: Object dot Reference (Rule 3)
user.logName(); // 'this' points to 'user' object


console.log("\n--- 3. IMPLICIT LOST (The classic bug) ---");

const looseReference = user.logName;

// Call site: Standalone! The link to 'user' is severed.
// It falls back to Default Binding (undefined in strict mode).
try {
    looseReference();
} catch (e) {
    console.log("looseReference() failed because 'this' was undefined.");
}

// Another common trap: Callbacks
function executeCallback(fn) {
    // The implementation of this function executes fn() standalone.
    fn();
}

try {
    executeCallback(user.logName);
} catch (e) {
    console.log("Callback execution failed context check.");
}

/**
 * 04_arrow_functions.js
 * 
 * CONCEPT:
 * Arrow functions do NOT have their own 'this'.
 * They inherit 'this' from the enclosing (lexical) scope.
 * This is determined at WRITE time, not CALL time.
 */

console.log("--- ARROW FUNCTIONS ---");

const person = {
    firstName: "Tony",

    // Standard function: 'this' depends on caller
    sayHiStandard: function () {
        console.log("[Standard]", this.firstName);
    },

    // Arrow function: 'this' is inherited from scope (Global/Module)
    sayHiArrow: () => {
        // In Node.js module scope, 'this' is {}, in Browser it's window
        console.log("[Arrow]", this.firstName);
    },

    // Delayed call pattern
    delayedGreeting: function () {
        // Problem with Standard function in callback
        setTimeout(function () {
            // 'this' is now the Timeout object (or global/undefined)
            console.log("[Timeout Standard]", this.firstName);
        }, 100);

        // Solution with Arrow function
        setTimeout(() => {
            // inherits 'this' from 'delayedGreeting' scope (which is 'person')
            console.log("[Timeout Arrow]", this.firstName);
        }, 100);
    }
};

person.sayHiStandard(); // "Tony"
person.sayHiArrow();    // undefined (Parent scope of object literal is Global)

person.delayedGreeting();
// [Timeout Standard] undefined
// [Timeout Arrow] Tony

// --- CANNOT BE BOUND ---

const arrow = () => {
    console.log("Arrow this:", this);
};

const obj = { id: 999 };

console.log("\nAttempting to .call() an arrow function:");
arrow.call(obj);
// Output: Still Global/Module 'this'. .call() is ignored.

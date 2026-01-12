/**
 * 05_interview_questions.js
 * 
 * TRICKY SCENARIOS
 */

console.log("--- Q1: Variable vs Property ---");

var length = 10; // 'var' attaches to global object (in Browser)

function fn() {
    console.log(this.length);
}

const obj = {
    length: 5,
    method: function (fn) {
        // Arguments[0] is 'fn'
        fn(); // Call site 1: Standalone -> Global 'this' (10) (In strict mode: undefined)

        arguments[0](); // Call site 2: Implicit binding on 'arguments' object!
        // 'this' is 'arguments' object. 
        // It has a property 'length' (number of args passed).
    }
};

// NOTE: In Node.js, top-level 'var' does NOT attach to global, and 'this' behaves differently.
// This is a browser-specific interview classic. We simulate behavior:
console.log("Simulating Browser Environment for Q1...");
// obj.method(fn, 1); 
// Expected browser output: 10 (Global), then 2 (arguments.length)

console.log("Skipping Q1 execution (Node.js/Strict mode variance).");


console.log("\n--- Q2: The '2.method' Syntax Error? ---");
// Which of these work?
// 2.toString(); -> Syntax Error (Parser thinks dot is decimal point)
// 2..toString(); -> Works! (2.) .toString()
// (2).toString(); -> Works!

Number.prototype.foo = function () { return this; }
console.log((2).foo()); // [Number: 2] -> Primitive auto-boxed to Object


console.log("\n--- Q3: Method Assignment ---");

const hero = {
    name: "Batman",
    getHeroName: function () {
        return this.name;
    }
};

const stolenName = hero.getHeroName;

console.log("Stolen:", stolenName()); // undefined (Lost context)
console.log("Original:", hero.getHeroName()); // Batman
console.log("Bound Stolen:", stolenName.bind(hero)()); // Batman


console.log("\n--- Q4: Arrow Function Method ---");

const villain = {
    name: "Joker",
    getName: () => {
        return this.name;
    }
};

console.log("Villain Name:", villain.getName());
// undefined. Arrow function 'this' is Global/Module, NOT 'villain'.

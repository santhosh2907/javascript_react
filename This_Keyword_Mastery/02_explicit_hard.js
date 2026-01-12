/**
 * 02_explicit_hard.js
 * 
 * Rules Covered:
 * 2. Explicit Binding (call, apply, bind)
 */

console.log("--- EXPLICIT BINDING ---");

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

function greet(skill1, skill2) {
    console.log(`Hello, I am ${this.name}. I know ${skill1} and ${skill2}.`);
}

// 1. .call(context, arg1, arg2, ...)
// Executes immediately.
console.log("1. Using .call():");
greet.call(person1, "React", "Node.js");

// 2. .apply(context, [argsArray])
// Executes immediately.
console.log("\n2. Using .apply():");
greet.apply(person2, ["Java", "Docker"]);

// 3. .bind(context) -> Returns NEW function
// Does NOT execute immediately. Returns a Hard-Bound function.
console.log("\n3. Using .bind() (Hard Binding):");
const greetAlice = greet.bind(person1);

greetAlice("HTML", "CSS");
greetAlice("Redux", "TypeScript");

// KEY CONCEPT: Hard Binding is permanent!
// Trying to override 'this' of an already bound function doesn't work.
console.log("\n4. Hard Binding is Permanent:");
greetAlice.call(person2, "Python", "Go");
// Output will STILL say "Alice"! The .bind() wrapper internally performs person1.call() regardless.

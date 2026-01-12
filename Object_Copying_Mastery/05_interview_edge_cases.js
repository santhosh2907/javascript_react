/**
 * 05_interview_edge_cases.js
 * 
 * "Most deep clones miss these two things:
 *  1. Property Descriptors (getters, setters, read-only)
 *  2. Prototypes (methods inherited from a class/parent)"
 */

console.log("--- Edge Case 1: Property Descriptors ---");

const source = {};
Object.defineProperty(source, 'readOnly', {
    value: 42,
    writable: false, // Immutable!
    enumerable: true
});

// A standard spread copy ...
const copySpread = { ...source };
// ... resets the descriptor!
const descriptorSpread = Object.getOwnPropertyDescriptor(copySpread, 'readOnly');
console.log("Spread Copy Writable?", descriptorSpread.writable); // true (LOST the restriction!)

// How to fix? Use Object.getOwnPropertyDescriptors()
const preciseCopy = Object.defineProperties({}, Object.getOwnPropertyDescriptors(source));
const descriptorPrecise = Object.getOwnPropertyDescriptor(preciseCopy, 'readOnly');
console.log("Precise Copy Writable?", descriptorPrecise.writable); // false (PRESERVED!)


console.log("\n--- Edge Case 2: Prototypes ---");

class Person {
    constructor(name) { this.name = name; }
    greet() { return `Hi, I'm ${this.name}`; }
}

const alice = new Person("Alice");

// JSON Copy
const jsonCopy = JSON.parse(JSON.stringify(alice));
console.log("JSON Copy Prototype:", Object.getPrototypeOf(jsonCopy) === Person.prototype); // false (It's just Object.prototype)
// console.log(jsonCopy.greet()); // ERROR: jsonCopy.greet is not a function

// Custom Clone (from previous file) usually handles this by using:
// Object.create(Object.getPrototypeOf(obj))

const properClone = Object.create(Object.getPrototypeOf(alice));
Object.assign(properClone, alice); // Shallow copy props

console.log("Proper Clone Prototype:", Object.getPrototypeOf(properClone) === Person.prototype); // true
console.log("Proper Clone Greet:", properClone.greet()); // Works!

/**
 * INTERVIEW TAKEAWAY:
 * If the interviewer asks for a "Perfect" clone:
 * 1. Ask: "Do we need to preserve the Prototype Chain?"
 * 2. Ask: "Do we need to preserve Property Descriptors (read-only, getters)?"
 */

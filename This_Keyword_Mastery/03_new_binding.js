/**
 * 03_new_binding.js
 * 
 * Rules Covered:
 * 1. 'new' Binding (Highest Precedence)
 */

console.log("--- 'new' BINDING ---");

// This is a "Constructor Function"
function User(name, role) {
    // 1. A new object is created: {}
    // 2. 'this' is bound to that object

    this.name = name;
    this.role = role;
    this.isAdmin = false;

    // 3. The object is implicitly returned
}

const u1 = new User("Dave", "Manager");
const u2 = new User("Sarah", "Engineer");

console.log("User 1:", u1);
// Output: User { name: 'Dave', role: 'Manager', isAdmin: false }

console.log("User 2:", u2);

// --- OVERRIDING RETURN ---

function BrokenConstructor() {
    this.value = 100;

    // If a constructor returns an OBJECT, 'this' (the new object) is discarded.
    return { value: 999 };
}

function WorkingConstructor() {
    this.value = 100;

    // If a constructor returns a PRIMITIVE, it is ignored, and 'this' is returned.
    return "I am ignored";
}

console.log("\nConstructor returning Object:", new BrokenConstructor()); // { value: 999 }
console.log("Constructor returning String:", new WorkingConstructor()); // { value: 100 }


// --- PRECEDENCE: new vs bind ---
// new CAN override bind!
function foo(something) {
    this.a = something;
}

const obj1 = {};
const bar = foo.bind(obj1); // bar is hard-bound to obj1

bar(2);
console.log("\nHard Bound call:", obj1.a); // 2

const baz = new bar(3); // 'new' is called on hard-bound function
console.log("New Instance from Hard Bound:", baz.a); // 3
console.log("Original Hard Bound Object:", obj1.a); // Still 2
// Conclusion: 'new' creates a fresh object and overrides the hard-binding.

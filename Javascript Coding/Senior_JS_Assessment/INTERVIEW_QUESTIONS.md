# JavaScript Senior Interview Deep Dive

This guide provides in-depth explanations, internal mechanics, and "senior-level" nuances for 50 essential JavaScript questions.

---

## 1. Fundamentals & Execution Context

### 1. Key features of JavaScript?
**Deep Answer:** 
Beyond "dynamic and interpreted", a senior answer touches on:
- **Multi-paradigm**: Supports OOP (prototypal), Imperative, and Functional programming (first-class functions, closures).
- **Single-Threaded Event Loop**: Uses a non-blocking I/O model (Node.js/Browser) allowing high concurrency despite a single main thread.
- **JIT Compilation**: Modern engines (V8, SpiderMonkey) compile JS to bytecode and then optimize hot paths to machine code at runtime, making it near-native speed.

### 2. Difference between `var`, `let`, and `const`?
**Deep Answer:**
It's about **Scope** and **Hoisting**.
- **`var`**: Function-scoped. Hoisted and initialized with `undefined`. If declared globally, it attaches to the `window` object. 
- **`let` / `const`**: Block-scoped (`{}`). Hoisted but kept in the **Temporal Dead Zone (TDZ)** until the line of execution is reached. Accessing them before declaration throws `ReferenceError`.
- **`const` nuance**: It protects the *binding* (variable reference), not the *value*. You can mutate properties of a `const` object, you just can't reassign the variable itself.

### 3. What is Hoisting?
**Deep Answer:**
Hoisting is the behavior where variable and function declarations are moved to the top of their containing scope during the **Memory Creation Phase** (Compilation phase) before execution.
- **Function Declarations** are fully hoisted (body and name).
- **`var`** is hoisted but initialized as `undefined`.
- **`let`/`const`** are hoisted (allocated memory) but **uninitialized**, causing TDZ errors if accessed.
*Why it matters*: Understanding hoisting prevents referencing variables before they are ready and explains "weird" behavior in legacy code.

### 4. Explain Closures with an example.
**Deep Answer:**
A closure is a feature where an inner function preserves access to variables from its outer (enclosing) function’s scope, even after the outer function has finished execution.
**Mechanics**: Functions in JS carry a `[[Environment]]` reference to the Lexical Environment where they were created. This reference prevents the outer scope variables from being garbage collected.
**Use Cases**:
- Data Privacy/Emulating private methods.
- Partial Application / Currying.
- Event handlers/Callbacks preserving state.

### 5. Difference between `==` and `===`?
**Deep Answer:**
- **`==` (Abstract Equality)**: Performs **Type Coercion** if types differ. 
  - `null == undefined` (True).
  - `1 == '1'` (True).
  - `[1,2] == '1,2'` (True - calls `.toString()`).
- **`===` (Strict Equality)**: Checks type first. If types differ, returns `false` immediately.
*Senior Tip*: Always use `===`. Relying on coercion is a source of subtle bugs.

### 6. What is Event Bubbling and Capturing?
**Deep Answer:**
The **Event Propagation** model has 3 phases:
1.  **Capturing (Trickling)**: Event travels from `Window` → `Document` → `Target`.
2.  **Target**: Event triggers on the element itself.
3.  **Bubbling**: Event travels back up from `Target` → `Document` → `Window`.
*Why it matters*: **Event Delegation** relies on bubbling. Instead of adding listeners to 100 list items (memory heavy), add one to the parent `<ul>` and check `e.target`.

### 7. What is the DOM?
**Deep Answer:**
The Document Object Model is a language-agnostic API interface that treats HTML/XML documents as a tree structure where each node is an object representing a part of the document. JS uses the DOM API to modify the document structure, style, and content.

### 8. Difference between `null` and `undefined`?
**Deep Answer:**
- **`undefined`**: "I don't know what this is yet." The system default for uninitialized variables, missing arguments, or properties.
- **`null`**: "I know what this is, and it is empty." An explicit assignment by a programmer to clear a value.
*Edge Case*: `JSON.stringify({a: undefined, b: null})` results in `{"b":null}`. Undefined keys are stripped from JSON.

### 9. What are Arrow Functions?
**Deep Answer:**
Syntactic sugar introduced in ES6 with a functional twist.
- **Lexical `this`**: They capture `this` from the surrounding context at the time of creation. They do *not* have their own `this`, `arguments`, `super`, or `new.target`.
- **Use Case**: Perfect for callbacks (e.g., inside classes or React components) where you want `this` to remain bound to the class instance.

### 10. Explain Callback Functions.
**Deep Answer:**
A function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.
*Nuance*: Note the difference between "Synchronous Callbacks" (e.g., `Array.map`) which run immediately, and "Asynchronous Callbacks" (e.g., `setTimeout`, `fs.readFile`) which run later via the Event Loop.

---

## 2. Advanced Async & Engine Internals

### 11. What is a Promise?
**Deep Answer:**
An object representing the eventual completion (or failure) of an asynchronous operation. It solves "Callback Hell" (Inversion of Control) by providing a chainable API (`.then()`) and standard error handling (`.catch()`).
**Internal States**: 
1. `Pending` (Initial)
2. `Fulfilled` (Resolved with value)
3. `Rejected` (Error)
*Important*: Once settled, a Promise is immutable.

### 12. Explain `async`/`await`.
**Deep Answer:**
It is syntactic sugar over Promises, making async code look synchronous.
- An `async` function always returns a Promise.
- `await` effectively "pauses" the execution of the async function (yielding control back to the event loop) until the Promise settles.
*Error Handling*: Use `try/catch` blocks, which is cleaner than `.catch()` chains.

### 13. Call vs Apply vs Bind?
**Deep Answer:**
These methods allow you to control the execution context (`this`).
- **`call(ctx, arg1, arg2)`**: Invokes the function immediately with `ctx`.
- **`apply(ctx, [args])`**: Invokes immediately with arguments as an array. Useful for variadic functions before the spread operator existed (e.g., `Math.max.apply(null, largeArray)`).
- **`bind(ctx, ...args)`**: Returns a **new function** with `this` permanently locking to `ctx`. Good for event handlers or partial application.

### 14-15. Prototype & Prototypal Inheritance?
**Deep Answer:**
In JS, objects inherit from other objects.
- **Prototype Chain**: When you access `obj.prop`, the engine checks `obj` own properties. If not found, it looks at `obj.__proto__`. If not found, it looks at `obj.__proto__.__proto__`, until it hits `null`.
- **`Object.create()`**: The purest way to implement inheritance. `const child = Object.create(parent)`.
- **Classes**: ES6 Classes are just sugar over this prototypal pattern.

### 16. The `this` Keyword?
**Deep Answer:**
`this` depends on **how the function is called** (call-site), not where it is declared (unless it's an arrow function).
1. **Implicit Binding**: `obj.method()` -> `this` is `obj`.
2. **Explicit Binding**: `call/apply/bind` sets `this`.
3. **New Binding**: `new Constructor()` -> `this` is the new instance.
4. **Default Binding**: Standalone function call -> strict mode: `undefined`, non-strict: `global/window`.

### 17-18. Scope vs Lexical Scope?
**Deep Answer:**
- **Scope**: The bucket where variables live.
- **Lexical Scope**: Means scope is determined by **author-time** decisions (where you write the code). The engine compiles the code and decides which scopes exist before running. This is why a closure "remembers" its environment—because the scope linkage is baked in structurally.

### 19. Higher-Order Functions?
**Deep Answer:**
Any function that treats other functions as values—either taking them as arguments or returning them.
*Why it matters*: It enables functional programming patterns (Composition, Currying) and cleaner abstractions (e.g., `map`, `filter` vs `for` loops).

### 20. Pure Functions?
**Deep Answer:**
1. **Deterministic**: Same input always equals same output.
2. **No Side Effects**: No HTTP requests, DOM changes, or mutating global state.
*Benefit*: Easier to test, debug, and parallelize.

### 21-22. Event Loop, Microtasks, Macrotasks?
**Deep Answer:**
The JS Runtime (V8) + Browser Environment logic:
1. **Call Stack**: Executes synchronous code.
2. **Task Queue (Macrotasks)**: `setTimeout`, `setInterval`, I/O.
3. **Microtask Queue**: `Promise.then`, `queueMicrotask`, `MutationObserver`.
**The Loop**:
1. Execute entire Call Stack.
2. **Flush ALL Microtasks** (until empty—can block rendering!).
3. Render UI (if needed).
4. Run ONE Macrotask.
5. Repeat.

---

## 3. Storage, Web APIs & Modern Features

### 23. JSON?
**Deep Answer:**
Text-based data format derived from JS Object syntax.
* Limitations*: No functions, `undefined`, circular references, or comments.
* Performance*: `JSON.parse` is often faster than executing a huge object literal in JS code because the parsing grammar is simpler.

### 24. IIFE (Immediately Invoked Function Expression)?
**Deep Answer:**
Example: `(function(){ ... })()`.
Before ES6 Block Scope (`let`), IIFEs were the primary pattern to create **variable privacy** and avoid polluting scope. Modern use is rare but seen in module bundlers.

### 26. Memory Management?
**Deep Answer:**
JS manages memory automatically (Garbage Collection).
- **Reachability**: The root (Global) holds references. The GC "marks" reachable objects. Anything "unmarked" is "swept" (deleted).
- **Generational Collection**: Young objects are fast-tracked for deletion; survivors move to 'Old Space'.

### 28. Deep Copy vs. Shallow Copy?
**Deep Answer:**
- **Shallow**: `Object.assign` or `{...obj}`. Only copies the first layer. Nested objects are shared by reference.
- **Deep**: `structuredClone(obj)` (Modern & Efficient) or `JSON.parse(JSON.stringify(obj))` (Slow, loses Dates/Functions). Recursion is needed for custom deep cloning.

### 35-36. Error Handling (`try...catch`)?
**Deep Answer:**
Synchronous errors in `try` trigger `catch`.
*Crucial*: `try/catch` only works for **synchronous** code within the block. It will NOT catch an error happening asynchronously inside a `setTimeout` callback defined inside the `try` block. (Await fixes this for promises).

### 40. The Fetch API?
**Deep Answer:**
A Promise-based replacement for `XMLHttpRequest`.
*Gotcha*: `fetch` only rejects on **network failure** (DNS, loss of connection). It does **NOT** reject on HTTP 404/500 errors. You must manually check `if (!response.ok) throw ...`.

### 43. CORS (Cross-Origin Resource Sharing)?
**Deep Answer:**
Browser security policy. It prevents a site at `origin A` from reading data from `origin B` unless `origin B` explicitly allows it via HTTP Headers (`Access-Control-Allow-Origin`).
*Preflight*: For complex requests (like adding custom headers), the browser sends an `OPTIONS` request first to ask permission.

### 44. Memory Leaks?
**Deep Answer:**
Unintentional retention of memory.
1. **Accidental Globals**: (`window.x = ...`).
2. **Forgotten Timers**: `setInterval` running forever.
3. **Closures**: Keeping large scopes alive unnecessarily.
4. **Detached DOM**: Variables referencing removed DOM nodes prevent them from being GC'd.

### 49. Functional Programming in JS?
**Deep Answer:**
Using JS with:
- **Immutability**: Treating data as unchangeable (using spreads, `Object.freeze`).
- **Composition**: Combining small pure functions via `pipe`/`compose`.
- **Declarative Code**: Describing *what* to do (`map`, `reduce`) rather than *how* (`for` loops).

### 50. Debugging?
**Deep Answer:**
Beyond `console.log`:
- **Conditional Breakpoints**: Pause only when `i > 100`.
- **`debugger` keyword**: Hardcoded breakpoint.
- **Performance Profiler**: Finding layout thrashing or long-running scripts.
- **Network Waterfall**: Optimizing load times.

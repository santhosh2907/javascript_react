# Core ES6+ JavaScript Interview Questions

This guide covers purely **Vanilla JavaScript (ES6 and later)** features often asked in interviews, independent of any framework.

---

## 1. Scoping & Variables (`let`, `const`)
**Q: What is the Temporal Dead Zone (TDZ)?**
* **A:** Variables declared with `let` and `const` are hoisted to the top of the block, but are not initialized. Accessing them before the declaration line throws a `ReferenceError`. The period between the start of the block and the declaration is the TDZ.
   ```javascript
   {
     // TDZ starts
     console.log(x); // ReferenceError
     let x = 10; // TDZ ends
   }
   ```

**Q: Explain Block Scope.**
* **A:** Before ES6, JS only had Global and Function scope. `let` and `const` introduced Block scope, meaning variables declared inside `{ ... }` (if, for, while) do not leak out.

## 2. Arrow Functions
**Q: Can you use `new` with an arrow function? Why?**
* **A:** No. Arrow functions do not have a `[[Construct]]` method. They also lack the `prototype` property. Calling `new ArrowFn()` throws `TypeError: ArrowFn is not a constructor`.

**Q: How do Arrow Functions handle `arguments`?**
* **A:** They do not have their own `arguments` object. You must use the **Rest Parameter** (`...args`) to access variable arguments.
   ```javascript
   const sum = (...args) => args.reduce((a, b) => a + b);
   ```

## 3. Destructuring & Spreading
**Q: How do you swap two variables without a temp variable in ES6?**
* **A:** Array destructuring.
   ```javascript
   let a = 1, b = 2;
   [a, b] = [b, a];
   ```

**Q: What is the difference between Spread (`...`) and Rest (`...`)?**
* **Spread**: Expands an iterable into individual elements (Function calls, Array literals). `Math.max(...arr)`.
* **Rest**: Collects multiple elements into a single array (Function definitions, Destructuring). `function f(...args)`.

## 4. Classes (Syntactic Sugar)
**Q: How are ES6 Classes different from the Constructor Function pattern?**
* **A:**
  1. Classes require `new` to be called (constructors can technically be called as functions).
  2. Class methods are non-enumerable by default.
  3. Classes always run in Strict Mode.
  4. Inheritance (`extends`) is much cleaner syntax for setting up the prototype chain.

## 5. Modules (ESM)
**Q: How does `import` differ from `require` (CommonJS)?**
* **A:**
  1. `import` is static (analyzed at compile time), allowing Tree Shaking. `require` is dynamic (runtime).
  2. ESM imports are **live bindings** (read-only views of the exported value). If the exporting module updates the value, the importer sees the change. CommonJS imports are a copy of the value at the time of require.

## 6. Symbols
**Q: What is the main use case for `Symbol`?**
* **A:** To create unique property keys that do not clash with other keys (avoiding name collisions) and are "hidden" from standard loops like `for...in` or `Object.keys()`.
   ```javascript
   const ID = Symbol('id');
   user[ID] = 123; // Won't show up in Object.keys(user)
   ```

## 7. Iterators & Generators
**Q: What makes an object "Iterable" (usable in `for...of` loops)?**
* **A:** It must implement the `[Symbol.iterator]` method, which returns an object with a `next()` method.

**Q: What is a Generator Function?**
* **A:** A function declared with `function*` that can be paused and resumed using the `yield` keyword. It returns a Generator Object (which is both an Iterator and Iterable).

## 8. Map & Set (New Collections)
**Q: Why use `Map` over a regular Object?**
* **A:**
  1. **Keys**: Map keys can be *any* type (objects, functions). Object keys are converted to Strings/Symbols.
  2. **Order**: Map preserves insertion order.
  3. **Size**: `map.size` is O(1). `Object.keys(obj).length` is O(N).
  4. **Performance**: Map is optimized for frequent additions/removals.

**Q: What is `WeakMap`?**
* **A:** A Map where keys must be objects and are held "weakly". If the key object is deleted elsewhere, the entry in the WeakMap is garbage collected. Useful for caching private data or DOM node metadata without memory leaks.

## 9. Promises & Async/Await
**Q: What happens if you `await` a non-promise value?**
* **A:** JS wraps it in `Promise.resolve()`. It pauses execution for a microtask tick, then resumes with the value.

**Q: What is the difference between `Promise.all` and `Promise.allSettled`?**
* **`Promise.all`**: Rejects immediately as soon as *one* promise rejects (fail-fast).
* **`Promise.allSettled`**: Waits for *all* promises to finish, regardless of success or failure. Returns an array of status objects `{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`.

## 10. Template Literals
**Q: What are Tagged Template Literals?**
* **A:** An advanced form where a function parses the template literal.
   ```javascript
   function tag(strings, ...values) { ... }
   tag`Hello ${name}!`;
   ```
   Used by libraries like `styled-components` or `graphql-tag`.

## 11. Optional Chaining & Nullish Coalescing
**Q: Difference between `||` and `??`?**
* **`||` (OR)**: Returns the right-side if the left is *falsy* (false, 0, "", null, undefined).
* **`??` (Nullish)**: Returns the right-side ONLY if the left is `null` or `undefined`.
   ```javascript
   const count = 0;
   console.log(count || 10); // 10 (Bad execution if 0 is valid)
   console.log(count ?? 10); // 0 (Good)
   ```

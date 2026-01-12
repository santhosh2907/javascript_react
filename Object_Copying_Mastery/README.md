# 🧬 Object Copying Mastery: Shallow vs Deep Copy

> "In JavaScript, variable assignment for objects is not a copy of the value, but a copy of the reference."

This guide covers everything you need to know about copying objects in JavaScript, from basic spread syntax to handling circular references in deep clones—essential knowledge for any Senior Frontend Developer.

---

## 🧠 Memory Management: The "Why"

To understand copying, we must first understand how JavaScript mimics memory management.

### Stack vs Heap
1.  **Primitives** (String, Number, Boolean, null, undefined, Symbol):
    *   Stored in the **Stack**.
    *   **Pass by Value**: When you assign `a = b`, a *new copy* of the value is created. Modifying one does not affect the other.

2.  **Reference Types** (Object, Array, Function, Date):
    *   Stored in the **Heap** (because they can grow in size).
    *   The **Stack** holds a *pointer* (reference) to the location in the Heap.
    *   **Pass by Reference**: When you assign `obj1 = obj2`, you are copying the *pointer*, not the actual object. Both variables now point to the **same** memory address.

---

## 1. Shallow Copy
A **Shallow Copy** creates a new object, but it only copies the property values of the first level.
*   If a property is a **primitive**, it copies the value.
*   If a property is a **reference** (assignment), it copies the **reference** (memory address).

**Effect:** Modifying a nested object in the copy **will affect** the original!

### Methods
1.  **Spread Operator (`...`)** (ES6+) - *Preferred*
    ```javascript
    const copy = { ...original };
    ```
2.  **`Object.assign()`** (ES5)
    ```javascript
    const copy = Object.assign({}, original);
    ```
3.  **Array Methods** (`slice()`, `concat()`, `from()`)
    ```javascript
    const copy = arr.slice();
    ```

### ✅ Pros
*   Fast and efficient.
*   Preserves prototype chain (sometimes, depending on method).

### ❌ Cons
*   **Fails for nested objects.** (The "Shallow" part).

---

## 2. Deep Copy
A **Deep Copy** creates a completely new object and recursively copies every nested object found within the original. The copy and the original share **zero** memory references.

### Method 1: `JSON.parse(JSON.stringify())`
The quick and dirty "poor man's deep clone".

```javascript
const copy = JSON.parse(JSON.stringify(original));
```

*   ✅ **Pros:** Works for simple JSON data (Numbers, Strings, Arrays, Objects).
*   ❌ **Cons:**
    *   **Data Loss:** Ignores `undefined`, `Symbol`, and `Function`.
    *   **Mutation:** Converts `Date` to string. Converts `Infinity`/`NaN` to `null`.
    *   **Crash:** Throws error on **Circular References**.

### Method 2: `structuredClone()` (Modern Native)
The new standard API available in modern browsers (Node 17+).

```javascript
const copy = structuredClone(original);
```

*   ✅ **Pros:**
    *   Handles `Date`, `Set`, `Map`, `RegExp`, `ArrayBuffer`.
    *   Supports **Circular References**.
*   ❌ **Cons:**
    *   Cannot clone `Function` or DOM nodes.
    *   Does not preserve the prototype chain (proto is not copied).

### Method 3: Recursive Custom Implementation
The "Senior Interview" solution. Manually traversing keys and handling types.
Required for specialized cases like preserving Prototypes or cloning Functions (rare).

### Method 4: Libraries
*   **Lodash (`_.cloneDeep`)**: Battle-tested, handles edge cases extensively.
*   **Ramda / Immer**: Functional approaches.

---

## ⚖️ Comparison Cheat Sheet

| Feature | Spread / Assign | JSON | structuredClone | Lodash cloneDeep |
| :--- | :---: | :---: | :---: | :---: |
| **Speed** | ⚡️ Fastest | 🐢 Slow | 🚀 Fast | 🐢 Slow |
| **Nested Objects** | ❌ (Shared) | ✅ (New) | ✅ (New) | ✅ (New) |
| **Dates** | ✅ (Ref) | ❌ (String) | ✅ (Object) | ✅ |
| **Undefined / Func** | ✅ | ❌ (Deleted) | ❌ (Error on Func) | ✅ |
| **Circular Refs** | ✅ | 💥 **CRASH** | ✅ | ✅ |
| **Map / Set** | ✅ (Ref) | ❌ ({}) | ✅ | ✅ |

---

## 🧪 Experiments

1.  **`01_shallow_copy.js`**: See how nested mutations break your app.
2.  **`02_deep_copy_json.js`**: Watch Data Loss happen in real-time.
3.  **`03_structured_clone.js`**: The modern savior.
4.  **`04_custom_deep_clone.js`**: Build it yourself (Interview Mode).
5.  **`05_interview_edge_cases.js`**: Advanced tricky questions.

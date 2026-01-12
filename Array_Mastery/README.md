# Array Mastery: Syntax, Methods, and Copying

Arrays in JavaScript are dynamic, resizable lists. Understanding how they work in memory is critical for preventing bugs.

## 1. Creation Syntax
```javascript
const arr1 = [];                 // Literal (Preferred)
const arr2 = new Array(5);       // Creates empty slots (Avoid!)
const arr3 = Array.of(1, 2, 3);  // [1, 2, 3]
const arr4 = Array.from("hi");   // ['h', 'i'] (From iterable)
```

## 2. Copying Mechanics (The Tricky Part)

### Primitive vs Reference
- **Primitives** (Number, String, Boolean) are copied **by value**.
- **Objects/Arrays** are copied **by reference** (pointer).

### Shallow Copy
Creates a new array, but the *contents inside* are still shared references if they are objects.
- **Methods:** `[...arr]`, `arr.slice()`, `arr.concat()`, `Array.from(arr)`

**Example:**
```javascript
const original = [{ id: 1 }];
const shallow = [...original];

shallow[0].id = 999; 
// original[0].id is ALSO 999! Because they point to the SAME object in memory.
```

### Deep Copy
Creates a completely new array AND recursively creates new copies of every object inside.
- **Methods:** 
  1. `JSON.parse(JSON.stringify(arr))` (Classic hack, fails on functions/Date)
  2. `structuredClone(arr)` (Modern standard, fast & robust)
  3. Custom recursive function (Lodash `_.cloneDeep`)

**Example:**
```javascript
const original = [{ id: 1 }];
const deep = structuredClone(original);

deep[0].id = 999;
// original[0].id is STILL 1. Safe!
```

## 3. Method Cheatsheet

| Category | Methods | Mutates Original? | Returns |
| :--- | :--- | :---: | :--- |
| **Add/Remove** | `push`, `pop`, `shift`, `unshift`, `splice` | ✅ YES | Changed Element / Length |
| **Subsetting** | `slice` | ❌ NO | New Array |
| **Combine** | `concat` | ❌ NO | New Array |
| **Iterate** | `forEach` | ❌ NO | undefined |
| **Transform** | `map` | ❌ NO | New Array |
| **Filter** | `filter` | ❌ NO | New Array |
| **Find** | `find`, `findIndex`, `includes`, `some` | ❌ NO | Item / Boolean / Index |
| **Sort** | `sort`, `reverse` | ✅ YES | Reference to Sorted Array |
| **Reduce** | `reduce` | ❌ NO | Accumulated Value |

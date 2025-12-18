# ES6 Interview Questions for React Developers

This guide focuses on **ECMAScript 2015+ (ES6+)** features that are critical for React development. Interviewers ask these to ensure you can write modern, clean, and efficient React code.

---

## 1. Arrow Functions & `this`
**Q: Why are arrow functions commonly used in React? How do they differ from regular functions?**
* **Lexical `this`**: Arrow functions do not have their own `this`. They capture it from the surrounding scope. In Class Components, this eliminates the need to manually `bind(this)` methods in the constructor.
* **Conciseness**: Implicit return makes functional components and inline render logic cleaner.
   ```javascript
   // Regular
   const App = function() { return <div>Hi</div> };
   // Arrow
   const App = () => <div>Hi</div>;
   ```

## 2. Destructuring (Object & Array)
**Q: Explain destructuring and give a practical React use case.**
* **Definition**: Unpacking values from arrays or properties from objects into distinct variables.
* **React Use Case**:
   * **Props**: `const MyComponent = ({ name, age }) => ...` instead of `props.name`.
   * **State (Hooks)**: `const [count, setCount] = useState(0);` (Array destructuring).
   * **Renaming**: `const { user: currentUser } = props;` to avoid naming conflicts.

## 3. The Spread Operator (`...`)
**Q: How is the spread operator used in React? Provide examples.**
* **Props Spreading**: Passing all properties of an object to a child object.
   ```javascript
   <Component {...props} /> // Careful with passing unnecessary props!
   ```
* **Immutability (State Updates)**: React state should be treated as immutable.
   ```javascript
   // Updating an object state
   setUser(prev => ({ ...prev, name: 'Alice' }));
   
   // Updating an array state
   setItems(prev => [...prev, newItem]);
   ```

## 4. Modules (Import/Export)
**Q: What is the difference between `default` and `named` exports? When to use which?**
* **Named Export** (`export const Button = ...`):
   * Can accept multiple per file.
   * Import must use exact name in braces: `import { Button } from './Button'`.
   * *Best for*: Utility libraries, UI Kits (e.g., `import { Button, Input } from '@mui/material'`).
* **Default Export** (`export default Button`):
   * One per file.
   * Can be imported with any name: `import MyBtn from './Button'`.
   * *Best for*: Components (One component per file principle).

## 5. Template Literals
**Q: How do template literals help in React?**
* Dynamic class names (though libraries like `clsx` are preferred for complex logic).
   ```javascript
   <div className={`btn ${isActive ? 'active' : ''}`}>
   ```
* String interpolation without concatenation.

## 6. Map, Filter, Reduce
**Q: Why is `map` used over `for` loops in React JSX?**
* **Expressions vs Statements**: JSX only accepts *expressions* within `{}`. `map` returns a new array (an expression), whereas `for` is a statement and returns nothing.
   ```javascript
   {items.map(item => <li key={item.id}>{item.name}</li>)}
   ```
* **Uniqueness**: `map` pairs perfectly with the `key` prop requirement.

## 7. Promises & Async/Await
**Q: How do you handle async operations in `useEffect`?**
* You cannot make the callback passed to `useEffect` async directly because it expects to optionally return a cleanup function, not a Promise.
* **Pattern**:
   ```javascript
   useEffect(() => {
     const fetchData = async () => {
       try {
         const data = await api.get();
         setState(data);
       } catch (err) { ... }
     };
     fetchData();
   }, []);
   ```

## 8. Optional Chaining (`?.`) & Nullish Coalescing (`??`)
**Q: How do these simplify React rendering code?**
* **Optional Chaining (`?.`)**: Safely accessing nested properties of API data that might be null/undefined.
   ```javascript
   // Old: user && user.address && user.address.city
   // New: user?.address?.city
   ```
* **Nullish Coalescing (`??`)**: Providing fallbacks only for `null` or `undefined` (not `0` or `false`).
   ```javascript
   // Renders 0 correctly, unlike || which would render '-'
   <div>Count: {count ?? '-'}</div>
   ```

## 9. Classes (Legacy vs Modern)
**Q: Do we still need ES6 Classes in React?**
* Mostly **No**. Since React 16.8 (Hooks), Functional Components are the standard.
* However, understanding Classes (`extends React.Component`, `constructor`, `this`, `super`) is crucial for maintaining legacy codebases and Error Boundaries (which still require classes).

## 10. `const` vs `let` in React**
**Q: When would you use `let` in a React component?**
* Ideally **never** for state. State should be managed via `useState`.
* **Exceptions**: Loop counters, or temporary variables inside `useEffect` or helper functions logic. Variables defined with `const` in a functional component body are re-created on every render anyway.

## 11. Immutability & Reference Equality
**Q: Why is `const x = {a:1}; const y = {a:1}; x === y` false? How does this affect React.memo?**
* Objects are reference types. 
* **React.memo** checks props shallowly. If you pass a new object literal `<Child conf={{val:1}} />`, it creates a new reference every render, causing Child to re-render despite matching values.
* **Fix**: Use `useMemo` to preserve the reference.

---
**Summary**: For a React role, focus on **Immutability (Spread)**, **Arrow Functions**, **Destructuring**, and **Async patterns**.

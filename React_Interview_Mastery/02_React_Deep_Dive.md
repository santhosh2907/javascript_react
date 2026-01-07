# React Interview Mastery: Deep Dive Concepts

This section covers the "How" and "Why" of React internals, architecture, and advanced patterns.

## Part 1: Architecture & Internals

### 1. What is the React Fiber architecture and what problem does it solve?
<details>
<summary>Answer</summary>

**Core Problem:**
Prior to React 16 (Stack Reconciler), the reconciliation process was recursive and synchronous. Once it started rendering a tree, it couldn't stop until it finished. For deep component trees, this could block the main thread for >16ms, causing dropped frames (jank) and unresponsive inputs.

**Solution (Fiber):**
React Fiber is a complete rewrite of the reconciliation algorithm. 
- **Unit of Work:** It breaks rendering work into small units called "fibers".
- **Concurrency:** It allows React to pause work, prioritize different types of updates (e.g., user input > data fetch), reuse work, or abort work that is no longer needed.
- **Two Phases:**
    1. **Render Phase (Async/Interruptible):** React traverses the fiber tree, calculates changes, and builds a "work-in-progress" tree. No DOM mutations happen here.
    2. **Commit Phase (Sync/Uninterruptible):** React applies the calculated changes to the DOM and runs layout effects/effects.
</details>

### 2. Explain the difference between `Shadow DOM` and `Virtual DOM`.
<details>
<summary>Answer</summary>

- **Virtual DOM:** A lightweight JavaScript representation of the DOM used by libraries like React to optimize updates. It is a concept/programming pattern, not a browser standard. It enables the diffing algorithm (Reconciliation) to minimize direct DOM manipulation.
- **Shadow DOM:** A browser standard (Web Components) that offers component style and markup encapsulation. It basically hides a sub-tree of DOM elements from the main document, preventing global CSS from leaking in or out.
</details>

### 3. How does React's Reconciliation algorithm work? (The Diffing Algorithm)
<details>
<summary>Answer</summary>

React compares the new Virtual DOM tree with the previous one to determine the minimum number of operations to update the real DOM. Being O(n^3) generally, React employs a heuristic O(n) algorithm based on two assumptions:
1. **Different Types:** Two elements of different types (e.g., `<div>` vs `<span>`, or `<Header>` vs `<Footer>`) will produce different trees. React tears down the old tree and builds the new one from scratch.
2. **Keys:** The developer can hint at which child elements may be stable across different renders with a `key` prop.

**Process:**
- It compares types.
- It compares props.
- It recurses on children.
- It uses keys to identify moved/inserted/deleted items in lists efficiently.
</details>

### 4. Why should you not define a component inside another component?
<details>
<summary>Answer</summary>

```jsx
function Parent() {
  // Bad!
  function Child() { return <div>Child</div> } 
  return <Child />;
}
```

**Reason:**
- Every time `Parent` renders, the `Child` function is re-created.
- React perceives this new function as a *completely different component type* because function reference `!==` function reference.
- Result: React unmounts the old `Child`, destroys its state/DOM, and mounts the new `Child`.
- **Consequences:** Loss of focus in inputs, loss of internal state, performance issues due to constant remounting.
</details>

---

## Part 2: Advanced Hooks & Patterns

### 5. When would you use `useImperativeHandle`?
<details>
<summary>Answer</summary>

**Use Case:**
When a parent component needs to imperatively call a function or access a value inside a child component, bypassing the typical data-down flow.

**Common Scenarios:**
- Managing focus (e.g., exposing a `focus()` method on a custom generic Input component).
- Triggering imperative animations.
- Scroll management.

**Code:**
```jsx
const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    shake: () => {
       // trigger animation
    }
  }));
  return <input ref={inputRef} />;
});
```
</details>

### 6. What is "State Colocation" and why is it important?
<details>
<summary>Answer</summary>

**Definition:**
Keeping a state variable as close as possible to the components that actually use it, rather than hoarding everything in a global store (Redux/Context) or a top-level Parent.

**Benefits:**
- **Performance:** Updating state only re-renders the component that owns it (and its children). Lifting state too high causes unnecessary re-renders of the entire tree.
- **Maintainability:** Easier to delete code. If you delete the component, the state dies with it. No "zombie" state left in Redux.
</details>

### 7. What is the difference between `useMemo` and `useCallback`?
<details>
<summary>Answer</summary>

- `useMemo`: Caches the **result** of a function execution. Use it for expensive calculations tasks.
  - `const value = useMemo(() => compute(a, b), [a, b]);`
- `useCallback`: Caches the **function definition** itself. Use it to prevent a function from being re-created on every render, which is useful when passing that function to optimized child components (React.memo) or hooks to avoid breaking referential equality.
  - `const fn = useCallback(() => { ... }, [dependencies]);`
  
*Technically:* `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.
</details>

### 8. Designing a Custom Hook: `usePrevious`
How would you implement a hook that returns the *previous* value of a state?

<details>
<summary>Answer</summary>

```jsx
import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]); // Updates AFTER render

  return ref.current; // Returns value from BEFORE render
}
```

**Walkthrough:**
1. Component renders with `value = 1`.
2. `usePrevious` returns `ref.current` (undefined initially).
3. Render finishes.
4. `useEffect` runs, updating `ref.current = 1`.
5. Update state `value = 2`.
6. Component renders with `value = 2`.
7. `usePrevious` returns `ref.current` (which is 1).
8. Render finishes.
9. `useEffect` runs, updating `ref.current = 2`.
</details>

---

## Part 3: Performance Optimization

### 9. What are the 3 main ways to prevent unnecessary re-renders in React?
<details>
<summary>Answer</summary>

1. **State Structure:** "Push state down". If only a small part of the UI updates, move that state into a smaller child component so the parent doesn't re-render.
2. **Component Memoization:** Use `React.memo` (for functional components) or `PureComponent` to prevent re-renders if props haven't changed.
    - *Caveat:* Requires props to maintain referential equality (use `useCallback`/`useMemo` for objects/functions passed as props).
3. **Children as Props:** If a component has state that updates frequently but its children are static, pass the children as a `children` prop (or named prop) rather than nesting them in JSX. The children element is created in the parent scope and remains referentially stable when the wrapper's state changes.

```jsx
// Good
function Wrapper({ children }) {
  const [color, setColor] = useState('red');
  return <div style={{ color }}>{children}</div>;
}
// When Wrapper re-renders due to color change, 'children' prop is referentially same, so React skips re-rendering it if it's memoized or just diffs it cheaply.
```
</details>

### 10. When should you *NOT* use `React.memo`?
<details>
<summary>Answer</summary>

- **Cheap Renders:** If a component is simple and renders fast, the overhead of comparing props (shallow comparison) might be more expensive than just re-rendering it.
- **Unstable Props:** If you constantly pass new references (inline functions `() => {}`, new objects `{}`) to the component without `useCallback`/`useMemo` in the parent, `React.memo` will never hit the cache, making it pure overhead.
- **Children Prop:** If you casually pass children, they are usually new objects every render, breaking memoization unless specifically optimized.
</details>

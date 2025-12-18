# React Hooks: The Complete Interview Guide

This guide covers the theory, "under-the-hood" details, and common interview questions for every major React hook. Use this to prepare for Senior React Developer interviews.

---

## 🏗️ Basic Hooks

### 1. `useState`

**Theory:**
`useState` allows functional components to manage state. Unlike class components `this.state` (which was an object), `useState` can handle primitives (strings, numbers) and objects.

**Under the Hood:**
*   **Fiber Nodes:** React stores hook state in a linked list attached to the component's Fiber node (Fiber is React's internal unit of work).
*   **Closure:** Each render function has its own "slice" of state. When you call `setState`, React schedules a re-render. The next render sees the *new* state value.
*   **Batching:** React 18+ automatically batches multiple state updates into a single re-render for performance, even in promises or timeouts (Automatic Batching).

**Advanced Concepts:**
*   **Functional Updates:** Use `setCount(prev => prev + 1)` when the new state depends on the old one. This avoids "stale closure" issues where a callback has access to an old version of `count`.
*   **Lazy Initialization:** `useState(() => heavyComputation())`. Passing a function ensures the computation only runs on the *first* render.
*   **Object Updates:** Unlike class `setState`, Hook `useState` *replaces* objects. You must manually spread: `setUser(prev => ({ ...prev, name: 'New' }))`.

**Interview Question:**
> *Why does `console.log(count)` show the old value immediately after `setCount(count + 1)`?*
> **Answer:** `setCount` is asynchronous in nature (it schedules a render). The current function execution (render) still holds the `count` value from *when it was called* (closure). The new value is available only in the *next* render cycle.

---

### 2. `useEffect`

**Theory:**
Used for side effects (API calls, subscriptions, DOM manipulation). It replaces `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

**Gotchas:**
*   **Dependency Array (`[]`):**
    *   No array: Runs every render.
    *   `[]`: Runs only on mount (and cleanup on unmount).
    *   `[prop, state]`: Runs when `prop` or `state` changes (referential equality check).
*   **Race Conditions:** If you fetch data, ensure you handle cases where requests return out of order. Use `AbortController` or a boolean flag in the cleanup function.
*   **Strict Mode:** runs effects *twice* in development to catch cleanup bugs.

**Interview Question:**
> *What is the difference between `useEffect` and `useLayoutEffect`?*
> **Answer:** `useEffect` runs **asynchronously** after the browser has painted the screen (good for non-blocking updates). `useLayoutEffect` runs **synchronously** immediately after DOM mutations but *before* the browser paints (good for measuring DOM layout to prevent visual flickering).

--- 

### 3. `useContext`

**Theory:**
Solves "Prop Drilling". It limits the scope of state globally or to a specific subtree.

**Performance Trap:**
If you pass an object `{{ user, theme }}` as a value, every consumer re-renders whenever *either* changes.
**Fix:**
1.  **Split Contexts:** `UserContext` and `ThemeContext`.
2.  **Memoize Value:** `useMemo(() => ({ user, theme }), [user, theme])` in the provider.

---

## ⚡️ Ref & Memoization

### 4. `useRef`

**Theory:**
Holds a mutable value that persists across renders *without* causing a re-render when updated.

**Use Cases:**
1.  **DOM Access:** Focus inputs, measure elements.
2.  **Mutable Variables:** Store `setInterval` IDs, previous props, or flags (e.g., `isMounted`).

**Interview Question:**
> *Why use `useRef` instead of a regular variable `let x = 0` outside the component?*
> **Answer:** A variable outside the component is shared by *all instances* of that component (global). `useRef` is unique per component instance. A variable *inside* the component function resets on every render. `useRef` persists within the instance.

---

### 5. `useMemo` & `useCallback`

**Theory:**
Performance optimization tools.
*   `useMemo`: Caches the **result** of a function. `const value = useMemo(() => compute(x), [x])`.
*   `useCallback`: Caches the **function definition** itself. `const fn = useCallback(() => {}, [])`.

**When to use:**
Only when:
1.  Checking **Referential Equality**: Passing an object/array/function to a child wrapped in `React.memo` or as a dependency to `useEffect`.
2.  **Expensive Calculation:** Thousands of items being filtered/sorted.

**Trap:**
Don't use them prematurely. They add memory overhead.

---

## 🛠️ Advanced State

### 6. `useReducer`

**Theory:**
Alternative to `useState` for complex state logic (nested objects, multiple sub-values depend on each other).

**Pattern:**
Good for "State Machines" (transitioning from `IDLE` -> `LOADING` -> `SUCCESS` -> `ERROR`).

**Interview Question:**
> *When should I use `useReducer` over `useState`?*
> **Answer:** When the next state depends on complex logic or multiple previous values, or when you want to decouple state logic (in the reducer) from UI logic (in the component), making testing easier.

---

### 7. `useImperativeHandle`

**Theory:**
Customizes the instance value that is exposed to parent components when using `ref`.

**Use Case:**
Instead of exposing the entire DOM node (like an `<input>`), you typically only want to expose specific methods like `focus()` or `reset()` to the parent to maintain encapsulation.

---

## 🚀 Concurrent Features (React 18)

### 8. `useTransition`

**Theory:**
Marks a state update as **non-urgent** ("transition").
*   Urgent updates (typing) interrupt non-urgent ones (rendering a list).
*   Keeps the UI responsive.

### 9. `useDeferredValue`

**Theory:**
Similar to `useTransition` but wraps a *value* instead of a function. Useful when you receive a value from a parent and want to "debounce" its rendering effect without writing custom timeout logic.

---

## 🧪 Other Hooks

### 10. `useId`
Generates unique IDs that are consistent between Server-Side Rendering (SSR) and Client-Side hydration. Essential for Accessibility (`aria-describedby`).

### 11. `useSyncExternalStore`
The correct way to subscribe to external stores (Redux, Zustand, Browser Window size) to prevent "Tearing" (where different parts of the UI show different values for the same state during concurrent rendering).

### 12. `useInsertionEffect`
Runs *before* `useLayoutEffect`. Strictly for CSS-in-JS libraries to inject `<style>` tags before layout calculation happens, preventing style recalculations. Applications almost never use this directly.

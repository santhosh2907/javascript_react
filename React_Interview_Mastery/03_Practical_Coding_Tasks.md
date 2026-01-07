# React Interview Mastery: Practical Coding Tasks

These tasks cover common "Take Home" or "Live Coding" interview scenarios.

## 1. Build a "useDebounce" Hook
**Task:** Create a hook `useDebounce(value, delay)` that returns a debounced version of the value.
**Constraint:** It should delay updating the value until `delay` ms have passed since the last change.

<details>
<summary>Solution Reference</summary>

```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```
</details>

---

## 2. Implement a "Stopwatch" Component
**Task:** Build a stopwatch with:
- Start/Pause button
- Reset button
- Display time in `mm:ss:ms` format.

**Key Challenges:**
- Using `setInterval` correctly with state or ref.
- preventing memory leaks.
- Formatting the time.

<details>
<summary>Solution Reference</summary>

```jsx
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div>
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={() => { setIsRunning(false); setTime(0); }}>Reset</button>
    </div>
  );
};
```
</details>

---

## 3. Create a "Click Outside" Hook (`useOnClickOutside`)
**Task:** Create a hook that detects clicks outside of a specified element (useful for closing modals/dropdowns).

<details>
<summary>Solution Reference</summary>

```jsx
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
```
</details>

---

## 4. Build an "Infinite Scroll" List
**Task:** Fetch items from a mock API (or JSONPlaceholder) and load more items when the user scrolls to the bottom of the page.
**Constraint:** Use `IntersectionObserver` API if possible.

**Mock API:** `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`

<details>
<summary>Solution Reference (Concept)</summary>

1. State for `items`, `page`, `loading`.
2. Ref for the `lastElementRef`.
3. `useCallback` for the observer callback to ensure it reconnects when new items are added.
4. When `lastElement` is visible -> `setPage(p => p + 1)`.

```jsx
// Simplified snippet
const observer = useRef();
const lastPostElementRef = useCallback(node => {
  if (loading) return;
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && hasMore) {
      setPageNumber(prev => prev + 1);
    }
  });
  if (node) observer.current.observe(node);
}, [loading, hasMore]);
```
</details>

---

## 5. Implement a "Todo List" with Optimistic Updates
**Task:**
- Add Todo (simulate API call).
- Optimistically update UI (show new item immediately).
- If API fails, roll back the change and show error.

<details>
<summary>Solution Reference</summary>

```jsx
const addTodo = async (text) => {
  const newTodo = { id: Date.now(), text, status: 'pending' };
  
  // Optimistic update
  setTodos(prev => [...prev, newTodo]);

  try {
    await mockApi.addTodo(text);
    // Success - maybe update status to 'synced' or do nothing if re-fetching
  } catch (err) {
    // Rollback
    setTodos(prev => prev.filter(t => t.id !== newTodo.id));
    alert("Failed to add todo");
  }
};
```
</details>

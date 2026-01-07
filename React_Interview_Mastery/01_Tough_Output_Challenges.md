# React Interview Mastery: Tough Output Challenges

Test your understanding of React's internals, rendering behavior, and JavaScript closures.

## Question 1: The Stale Closure Trap
What will be logged when you click the button 3 times quickly (within 1 second)?

```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(`Count is: ${count}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Note the empty dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Output:**
It will repeatedly log `Count is: 0` every second, no matter how many times you click the button.

**Explanation:**
This is a classic "Stale Closure" problem. 
- The `useEffect` runs only once on mount because of the `[]` dependency array.
- The closure created for the `setInterval` callback captures the value of `count` from the initial render, which is `0`.
- Even when `count` updates in the state and the component re-renders, the effect does *not* re-run, so the interval continues to use the old callback with the enclosed `count` value of `0`.

**Fix:**
Add `[count]` to the dependency array, or use the functional update form `setCount(c => c + 1)` and a ref for the logging if you don't want to reset the interval.
</details>

---

## Question 2: State Updates & Batching (React 18 Automatic Batching)
What gets logged to the console when you click the "Update" button?

```jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [val, setVal] = useState(0);

  const handleClick = () => {
    console.log('Click handler start');
    
    setVal(v => v + 1);
    setVal(v => v + 1);
    
    setTimeout(() => {
      console.log('Timeout start');
      setVal(v => v + 1);
      setVal(v => v + 1);
      console.log('Timeout end');
    }, 0);
    
    console.log('Click handler end');
  };

  console.log('Render:', val);

  return <button onClick={handleClick}>Update</button>;
}
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Detailed Output Sequence:**

1. **Initial Render:** `Render: 0`
2. **Click:** `Click handler start`
3. **Click:** `Click handler end`
4. **Re-render (Batch 1):** `Render: 2` (React batches the first two updates together)
5. **Timeout:** `Timeout start`
6. **Timeout:** `Timeout end`
7. **Re-render (Batch 2):** `Render: 4` (React 18 automatic batching covers timeouts too)

**Note on Pre-React 18:**
Before React 18, updates inside `setTimeout` were *not* batched automatically, so you would see `Render: 3` then `Render: 4`. In React 18, automatic batching covers promises, timeouts, and native event handlers.

**Explanation:**
- `setVal` is asynchronous-like. Calling it doesn't immediately update state.
- React batches multiple state updates in a single event loop tick to minimize renders.
</details>

---

## Question 3: The `useLayoutEffect` vs `useEffect` Timing
What is the order of console logs?

```jsx
import React, { useState, useEffect, useLayoutEffect } from 'react';

function Child() {
  console.log('Child Render');
  
  useEffect(() => {
    console.log('Child useEffect');
  }, []);

  useLayoutEffect(() => {
    console.log('Child useLayoutEffect');
  }, []);

  return <div>Child</div>;
}

function Parent() {
  console.log('Parent Render');
  
  useEffect(() => {
    console.log('Parent useEffect');
  }, []);

  return (
    <div>
      <Child />
    </div>
  );
}
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Output Order:**
1. `Parent Render`
2. `Child Render`
3. `Child useLayoutEffect`
4. `Child useEffect`
5. `Parent useEffect`

**Explanation:**
1. **Render Phase**: Parent renders, then Child renders.
2. **Commit Phase (Layout)**: `useLayoutEffect` runs synchronously *after* DOM mutations but *before* the browser paints. Children's layout effects run before Parents' (bottom-up).
3. **Commit Phase (Passive)**: `useEffect` runs asynchronously *after* the paint. Children's effects run before Parents' (bottom-up).

**Crucial Detail**: `useLayoutEffect` blocks visual updates. `useEffect` does not.
</details>

---

## Question 4: Immediate State Update in Render
What happens in this component?

```jsx
function BadComponent() {
  const [count, setCount] = useState(0);

  if (count < 5) {
    setCount(count + 1);
  }

  console.log('Render:', count);

  return <div>{count}</div>;
}
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Output:**
`Render: 0`
`Render: 1`
`Render: 2`
`Render: 3`
`Render: 4`
`Render: 5`
(And then it stops stable)

**Explanation:**
- Updating state *during* render is technically allowed in React but discouraged.
- If you call a state setter while rendering, React will immediately restart the render with the new state *before* exiting the function completely/committing to DOM.
- It acts like a loop until the condition `count < 5` is false.
- **Warning**: If you don't have a condition (infinite loop), React will throw a "Too many re-renders" error.
</details>

---

## Question 5: Object Dependency in `useEffect`
Why does this infinite loop happen?

```jsx
function App() {
  const [count, setCount] = useState(0);
  
  // Mistake: Literal object creation in render
  const options = { step: 1 }; 

  useEffect(() => {
    console.log('Effect running');
    setCount(c => c + options.step);
  }, [options]); // <--- Dependency is the object

  return <div>{count}</div>;
}
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Output:**
It crashes or causes an infinite loop of re-renders and log "Effect running" continuously.

**Explanation:**
1. Component renders. `options` is a *new* object reference every time `{ step: 1 } !== { step: 1 }`.
2. `useEffect` checks dependencies. `options` has changed (referentially).
3. Effect runs -> calls `setCount`.
4. State update triggers re-render.
5. Back to step 1.

**Fix:**
- Wrap `options` in `useMemo`.
- Or move `options` outside the component if it doesn't depend on props/state.
- Or pass `options.step` primitive to dependency array.
</details>

---

## Question 6: Closure with `setTimeout` and State
What gets logged after 3 seconds?

```jsx
function App() {
  const [count, setCount] = useState(0);

  const handleAlert = () => {
    setTimeout(() => {
      alert('Count is: ' + count);
    }, 3000);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment to 5</button>
      <button onClick={handleAlert}>Show Alert</button>
    </div>
  );
}
```
*Scenario:*
1. User clicks "Increment" until count is 5.
2. User clicks "Show Alert".
3. User quickly clicks "Increment" again to make count 6 before the alert shows.

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Output:**
Alert says: `Count is: 5`

**Explanation:**
- The `handleAlert` function captures the scope (closure) created during the *render* where the button was clicked.
- At that moment, `count` was 5.
- Even though `count` became 6 later, the `setTimeout` callback "closed over" the value 5.
- This is distinctive behavior of Functional Components compared to Class Components (where `this.state.count` would read the *current* fresh value).

**To fix (if you want current value):**
Use `useRef` to keep track of the latest value.
</details>

---

## Question 7: `useRef` vs `useState` Re-renders
Which buttons cause a re-render?

```jsx
function App() {
  console.log('Rendered');
  
  const [stateCount, setStateCount] = useState(0);
  const refCount = React.useRef(0);

  const updateState = () => {
    setStateCount(prev => prev + 1);
  };

  const updateRef = () => {
    refCount.current += 1;
    console.log('Ref is:', refCount.current);
  };

  return (
    <>
      <button onClick={updateState}>State: {stateCount}</button>
      <button onClick={updateRef}>Ref: {refCount.current}</button>
    </>
  );
}
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Answer:**
- **State Button**: Causes a re-render. You will see "Rendered" in console. The UI updates.
- **Ref Button**: Does **NOT** cause a re-render. You will see "Ref is: X" logs, but "Rendered" will NOT appear, and the button text `Ref: 0` will **stay 0** on screen until something else triggers a render.

**Explanation:**
- `useRef` updates are synchronous mutations of a mutable object. They do not maintain immutability and do not trigger the reconciliation process.
- `useState` updates trigger React's render cycle.
</details>

---

## Question 8: Strict Mode Double Invocation
In development mode (Strict Mode enabled), you see your `useEffect` running twice. Why? How do you fix it?

```jsx
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  console.log('Connected');

  return () => {
    connection.disconnect();
    console.log('Disconnected');
  };
}, []);
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Output (Dev Mode):**
1. `Connected`
2. `Disconnected`
3. `Connected`

**Explanation:**
- React Strict Mode intentionally mounts, unmounts, and remounts components to stress-test your cleanup logic.
- It ensures that your effect is resilient to being mounted/unmounted multiple times (reusability, Fast Refresh correctness).

**Fix:**
- **Do not "fix" it by removing StrictMode.** This is a feature, not a bug.
- Ensure your cleanup function properly undoes whatever the setup function did. If your cleanup is correct, the double invocation is harmless.
</details>

---

## Question 9: Synthetic Events vs Native Events
What is the order of logs when you click the button?

```jsx
useEffect(() => {
  document.body.addEventListener('click', () => {
    console.log('Body Native Click');
  });
}, []);

const handleClick = (e) => {
  console.log('React Button Click');
  // e.nativeEvent.stopPropagation(); // Hint: What if this was uncommented?
};

return <button onClick={handleClick}>Click Me</button>;
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Order (React 17+):**
1. `React Button Click`
2. `Body Native Click`

**Explanation:**
- In React 17+, acts delegation is attached to the *root container* (e.g., `#root`), not `document`.
- The event bubbles up from the button -> root (React handlers fire) -> body -> document.
- So React's `onClick` fires first as it's "lower" in the DOM perceived by React's delegation system than the `body` listener.

**Wait, what about `e.stopPropagation()`?**
- If you call `e.stopPropagation()` in the React handler, the event stops bubbling at the root. It will **never reach `document.body`**.
</details>

---

## Question 10: Derived State vs `useEffect`
Is this good code? If not, why?

```jsx
function List({ items }) {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(items.filter(i => i.active));
  }, [items]);

  return <ul>{filteredItems.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}
```

<details>
<summary><strong>Answer & Explanation</strong></summary>

**Answer:** No, this is an anti-pattern (Redundant State).

**Why:**
- You are storing data (`filteredItems`) in state that can be fully derived from props (`items`).
- This causes **two renders** every time `items` changes:
    1. Prop change triggers Render 1.
    2. Effect runs, updates state.
    3. State update triggers Render 2.

**Better Approach:**
Calculate it during render.

```jsx
function List({ items }) {
  // Memoize if expensive, otherwise just calculate
  const filteredItems = useMemo(() => items.filter(i => i.active), [items]);

  return <ul>{filteredItems.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}
```
</details>

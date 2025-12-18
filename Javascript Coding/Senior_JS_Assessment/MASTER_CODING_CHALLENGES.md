# Master JavaScript Coding Challenges

This is a comprehensive list of coding questions frequently asked in Senior JavaScript Interviews. Practical implementation is expected for all of these.

## 1. Native Polyfills (Re-implementing Built-ins)
*Demonstrates understanding of language internals.*

1.  **Map / Filter / Reduce**: Implement `Array.prototype.myMap`, `myFilter`, `myReduce` without using the originals.
2.  **Bind / Call / Apply**: Implement `Function.prototype.myBind` handling `this` context and argument currying.
3.  **Promise**: Implement a fully A+ compliant `Promise` class (resolve, reject, then, chaining).
4.  **Promise Static Methods**: Implement `Promise.all`, `Promise.allSettled`, `Promise.any`, `Promise.race`.
5.  **JSON.stringify**: Implement a function that serializes values to JSON string (handling recursion, types).
6.  **Function.prototype.bind**: Implement polyfill if missing.
7.  **Object.create**: Implement simple polyfill.
8.  **SetInterval**: Implement `mySetInterval` using `setTimeout`.
9.  **ClearAllTimers**: Implement a function to clear all active timeouts/intervals on the page.

## 2. Functional Programming & Lodash-style Utilities
*Demonstrates logic and recursion skills.*

10. **Deep Clone**: Clone an object deeply (`JSON.parse` is not accepted). Handle Cycles, Dates, Regex.
11. **Deep Equal**: Compare two objects deeply.
12. **Flatten**:
    *   **Flatten Array**: `[1, [2, [3]]]` -> `[1, 2, 3]` (generic depth).
    *   **Flatten Object**: `{a: {b: 1}}` -> `{'a.b': 1}`.
13. **Get/Set by Path**: `get(obj, 'a.b.c')` and `set(obj, 'a.b.c', value)`.
14. **Curry**: Implement `curry(fn)` that allows `sum(1)(2)(3)` call style.
15. **Compose / Pipe**: Combine multiple functions `f(g(h(x)))`.
16. **Memoize**: Implement a function that caches results of expensive calls.
17. **Once**: Wraps a function so it can only be called once.
18. **Throttle**: Limit function execution to once every N ms (with leading/trailing options).
19. **Debounce**: Delay function execution until N ms have passed since last call.
20. **Partial Application**: Pre-fill arguments.
21. **GroupBy**: Group array of objects by key. `groupBy(array, 'category')`.
22. **Shuffle**: Randomly shuffle an array (Fisher-Yates).

## 3. Asynchronous Patterns
*Demonstrates control flow mastery.*

23. **Task Runner**: Execute async tasks with max concurrency X.
24. **Retry Logic**: Implement `fetchWithRetry(url, retries)`.
25. **Timeout Fetch**: Wrap a promise with a timeout rejection.
26. **Sequence Runner**: Run array of promises strictly sequentially `asyncSeries([p1, p2, p3])`.
27. **Async Cache**: specific to caching API responses with expiration.
28. **Traffic Light**: Simulate Red(3s) -> Yellow(1s) -> Green(2s) loop using Promises.
29. **PubSub (Event Emitter)**: Implement `on`, `off`, `emit`.
30. **Observable**: Implement a basic RxJS-style Observable.

## 4. DOM & UI Challenges
*Demonstrates rendering and browser API knowledge.*

31. **Virtual DOM Render**: Write a function that converts a JS Object (`vNode`) to a real DOM Node.
32. **Identify DOM Depth**: Find the max nesting depth of an HTML document.
33. **Event Delegation**: Attach one listener to a list to handle clicks on items.
34. **Glimmer / Infinite Scroll**: Implement logic for detecting when to load more items.
35. **Drag and Drop**: Basic logic for swapping items in a list.
36. **Find Corresponding Node**: Given two identical DOM Trees A and B, and a node `nA` in A, find the corresponding `nB` in B.
37. **CSS Class Manipulation**: Implement `addClass`, `removeClass`, `toggleClass` manually.

## 5. Array & String Logic (Data Structures)
*Classic algorithmic questions with JS twists.*

38. **Array Deduplication**: Remove duplicates (primitives & objects).
39. **Flatten Array Iterative**: Flatten without recursion.
40. **Anagrams**: Check if strings are anagrams / Group anagrams.
41. **Palindrome**: Check palindrome (considering non-alphanumeric chars).
42. **Longest Substring Without Repeating Characters**: Sliding window.
43. **LRU Cache**: Implement Least Recently Used cache with `get` and `put` in O(1) (Map + Doubly Linked List).
44. **Queue using Stacks**: Implement Queue using two Arrays.
45. **Balanced Parentheses**: Stack solution.
46. **Intersection of Arrays**: Find common elements in N arrays.
47. **Move Zeros**: Move all 0s to end in-place.
48. **Two Sum**: Find indices summing to target (Map optimization).

## 6. Tricky Language Quirks
*Demonstrates deep language knowledge.*

49. **Private Counter**: Create a counter that cannot be modified directly (Closure).
50. **Method Chaining**: `calculator.add(10).subtract(5).value()`.
51. **Array.prototype.flat** polyfill (recurse vs stack).
52. **Object.assign** polyfill.
53. **Promisify**: Convert callback-style function to Promise-style.

---
**Note**: For Senior roles, focus heavily on **Category 2 (Utilities)**, **Category 3 (Async)**, and **Category 6 (Tricky)**.

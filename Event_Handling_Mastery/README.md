# Event Handling & Propagation Mastery 🎓

This module covers the core concepts of JavaScript Event Handling, specifically designed for interview preparation and deep understanding.

## 📚 Core Concepts

### 1. The Event Propagation Model
When an event occurs on a DOM element (like a click), it doesn't just happen on that single element. It travels through the DOM tree in three phases:

1.  **Capturing Phase (Trickling)**: The event moves down from the `window` -> `document` -> `html` -> `body` -> ... -> **Target Element**.
2.  **Target Phase**: The event reaches the element that triggered the event (the `target`).
3.  **Bubbling Phase**: The event bubbles up from the **Target Element** -> ... -> `body` -> `html` -> `document` -> `window`.

> **Analogy**: Imagine you throw a stone into a pond (the click). The splash happens at the center (Target), but ripples travel outwards (Bubbling). Or, imagine a CEO (Window) ordering a task down the hierarchy to a worker (Capture), the worker does it (Target), and reports back up to the CEO (Bubbling).

### 2. Event Bubbling 🫧
-   **Default behavior**: Most events bubble up by default.
-   **Why?**: It allows you to catch an event on a parent element even if it originated from a child.
-   **Exceptions**: Some events like `focus`, `blur`, `load`, `unload` do NOT bubble.

### 3. Event Capturing 🕸️
-   **Default behavior**: Disabled by default in `addEventListener`.
-   **How to enable**: Pass `{ capture: true }` or `true` as the third argument to `addEventListener`.
    ```javascript
    element.addEventListener('click', handler, { capture: true });
    ```
-   **Use case**: Rarely used in day-to-day apps, but crucial for analytics tracking or overriding behavior before it reaches the target.

### 4. Event Delegation ⚡
A pattern where you attach **one** listener to a parent element to handle events for all its children (even those added dynamically in the future).
-   **Benefits**:
    -   Less memory usage (fewer listeners).
    -   No need to re-attach listeners when adding new child elements.
-   **How**: Use `event.target` to check which child was clicked.

## 🛑 Control Methods

| Method | Description |
| :--- | :--- |
| `event.stopPropagation()` | Stops the event from moving to the next node in the propagation path (stops bubbling or capturing). |
| `event.stopImmediatePropagation()` | Like `stopPropagation()`, BUT also prevents *other* listeners on the *same* element from running. |
| `event.preventDefault()` | Prevents the browser's default behavior (e.g., submitting a form, following a link), but does *not* stop propagation. |

## ❓ Common Interview Questions

1.  **What is Event Bubbling?**
    *Answer: It's the process where an event triggered on a child element propagates upward through its ancestors in the DOM tree.*

2.  **What is Event Delegation?**
    *Answer: It's a technique of leveraging event bubbling to handle events at a higher level in the DOM than the element on which the event originated.*

3.  **Difference between `target` and `currentTarget`?**
    -   `event.target`: The element that **actually triggered** the event (e.g., the specific button clicked).
    -   `event.currentTarget`: The element that the **event listener is attached to** (e.g., the parent div)

4.  **Difference between `stopPropagation` and `stopImmediatePropagation`?**
    -   `stopPropagation` stops the event from traversing the DOM further.
    -   `stopImmediatePropagation` does that AND stops any other listeners attached to the *same specific element* from executing.

5.  **How to detect if a click is outside an element?**
    -   Attach a click listener to `document` or `body`. Check if `!element.contains(event.target)`.

## 📂 File Guide

- [01_basics_and_listeners](01_basics_and_listeners.html): Basic setup and removing listeners.
- [02_propagation_model](02_propagation_model.html): Interactive Bubbling vs Capturing visualizer.
- [03_event_delegation](03_event_delegation.html): The "Todo List" pattern (Delegation).
- [04_advanced_control](04_advanced_control.html): `stopPropagation` deeply explained.

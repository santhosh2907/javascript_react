# Senior JavaScript Assessment Evaluation Guide

This guide outlines strictly what distinguishes a "Senior" solution from a Junior/Mid-level solution for each challenge in this suite.

## 1. Core: Deep Clone (`core/deep-clone.js`)
**The Challenge**: Clone complex objects including nested structures, special types (Date, Map), and circular references.

**Senior/Strong Indicators**:
- **Circular Reference Handling**: Must use `WeakMap` (or `Map`) to track visited objects. Failure to do this causes stack overflow on circular structures.
- **Prototype preservation**: Uses `new obj.constructor()` instead of hardcoded `{}` or `[]` to preserve custom classes.
- **Special Types**: explicitly handles `Date`, `RegExp`, `Map`, `Set`. A `JSON.parse(JSON.stringify(x))` solution is **FAIL** for a senior role.

## 2. Core: Flatten Object (`core/flatten.js`)
**The Challenge**: Flatten a deep object into dot-notation keys.

**Senior/Strong Indicators**:
- **Recursion API**: Clean separation of recursion (passing a `prefix` accumulator).
- **Edge Cases**: Handles null/undefined non-destructively.

## 3. Async: Promise Polyfills (`async/promise-polyfills.js`)
**The Challenge**: Implement `Promise.all` or `Promise.allSettled`.

**Senior/Strong Indicators**:
- **Error Propagation**: `Promise.all` must reject *immediately* upon the first error (short-circuit).
- **Ordering**: The output array must match the *input* order, not the completion order.
- **Non-Promise Values**: Correctly wraps valus with `Promise.resolve()`.

## 4. Async: Task Runner (`async/task-runner.js`)
**The Challenge**: Run async tasks with a maximum concurrency limit.

**Senior/Strong Indicators**:
- **Queue Management**: Uses a FIFO queue.
- **Recursion/Trigger**: Automatically triggers the next task in the `finally` block to prevent stalls.

## 5. System: Event Emitter (`system/event-emitter.js`)
**The Challenge**: Implement Pub/Sub.

**Senior/Strong Indicators**:
- **Memory Leak Protection**: The `off` (unsubscribe) method is critical.
- **Once Implementation**: Correctly wraps the listener and *removes itself* after execution.

## 6. System: Observable Store (`system/observable-store.js`)
**The Challenge**: Reactive state (Mini-Redux/MobX).

**Senior/Strong Indicators**:
- **Proxy Usage**: Using `Proxy` for transparent detection of get/set/delete.
- **Deep Observation**: Recursively wrapping nested objects in Proxies.

## 7. Fundamentals & Logic (`basics/`)
**The Challenges**: Unique Arrays & Conceptual Quiz

**Senior/Strong Indicators**:
- **Array Unique**: Realizing `Set` only works for primitives. Must serialize (JSON.stringify) or do O(N^2) deep comparison for objects/arrays.
- **Map vs Object**: Using `Map` for frequency counts if keys can be non-strings, or for cleaner iteration.
- **Closure/Scope**: Detailed explanation of *why* `var` loops fail (function scope vs block scope).
- **This**: Understanding arrow functions bind lexically (cannot be re-bound), whereas regular functions are dynamic.
- **Coercion**: Acknowledging it's bad practice to rely on obscure coercion (`[] == ![]`) in production code, even if they know the answer.

## General "Senior" Signals
- **Code Style**: Consistent formatting, meaningful variable names.
- **Testing**: Writes their own test cases or asks about edge cases before coding.
- **Performance**: Mentions Big-O or memory implications (e.g., "Recursion might stack overflow on very deep objects").

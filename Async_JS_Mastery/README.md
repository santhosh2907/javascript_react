# Async JavaScript Mastery (Interview Prep)

This folder contains focused examples to help you master Promises and Async/Await for interviews. Each file covers a specific topic with commented "Interview Tips".

## 📂 File Guide

### 1. [01_promise_basics.js](01_promise_basics.js)
**Topic:** Core Promise concepts.
- How to create a new Promise.
- `resolve` vs `reject`.
- Chaining `.then()` and catching errors with `.catch()`.

### 2. [02_async_await_real_world.js](02_async_await_real_world.js)
**Topic:** Real-world simulation (The Modern Way).
- Simulates fetching a **User**, then using that user's ID to fetch **Orders**.
- Shows how `async/await` makes dependent logic clean and readable.
- Proper `try/catch` error handling.

### 3. [03_advanced_promises.js](03_advanced_promises.js)
**Topic:** Working with multiple Promises (Combniators).
- `Promise.all()`: Run tasks in parallel (Fail-fast).
- `Promise.allSettled()`: Wait for all, regardless of success.
- `Promise.race()`: First one to finish wins.
- `Promise.any()`: First **successful** one wins.

### 4. [04_common_interview_patterns.js](04_common_interview_patterns.js)
**Topic:** Patterns you are likely to be asked to write.
- **Sequential vs Parallel**: Why `await` in a loop is often slow, and how to fix it with `Promise.all`.
- **Retry Logic**: A robust function to retry failed network requests automatically.

## 🚀 How to Run
Open your terminal in this directory and run:

```bash
node 01_promise_basics.js
node 02_async_await_real_world.js
node 03_advanced_promises.js
node 04_common_interview_patterns.js
```

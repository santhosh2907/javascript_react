/**
 * 06_senior_challenges.js
 * 
 * SCENARIO: The "Stale Response" Race Condition.
 * 
 * PROBLEM:
 * You have a debounced search input. 
 * User types "A" -> API Request 1 starts (slow network, takes 3s)
 * User types "AB" -> API Request 2 starts (fast network, takes 0.5s)
 * 
 * Request 2 arrives FIRST. UI updates with results for "AB".
 * Request 1 arrives LATER. UI updates with results for "A".
 * 
 * Result: User sees "AB" in input box, but results for "A". BROKEN UI.
 * 
 * CHALLENGE: Fix this using a closure-based "Request ID" or similar pattern.
 */

// --- BROKEN IMPLEMENTATION ---
function mockSearchAPI(query, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Results for "${query}"`);
        }, delay);
    });
}

// Fixed Debounce with Race Condition Protection
function createSafeSearch() {
    let currentQueryId = 0; // Closure state to track latest request

    return async function (query) {
        // 1. Assign ID to ONLY this function call
        const myId = ++currentQueryId;

        console.log(`[Start] Request #${myId} for "${query}"`);

        // Simulate network delay (random to cause race conditions)
        const randomDelay = Math.random() * 2000;

        // 2. Perform Async Operation
        const result = await mockSearchAPI(query, randomDelay);

        // 3. CHECK: Is this still the latest request?
        if (myId === currentQueryId) {
            console.log(`✅ [UI UPDATE] ${result}`);
        } else {
            console.log(`❌ [IGNORED] Stale response for "${query}" (Request #${myId})`);
        }
    };
}

// --- SIMULATION ---

const safeSearch = createSafeSearch();

// Simulate rapid typing
// "React" (takes long)
safeSearch("React");

// "ReactJS" (starts later, matches currentQueryId > previous)
setTimeout(() => {
    safeSearch("ReactJS");
}, 200);

/*
 * EXPECTED OUTPUT:
 * [Start] Request #1 for "React"
 * [Start] Request #2 for "ReactJS"
 * 
 * If #2 finishes first:
 * ✅ [UI UPDATE] Results for "ReactJS"
 * 
 * When #1 finally finishes:
 * ❌ [IGNORED] Stale response for "React" (Request #1)
 * 
 * This ensures the UI always shows the LATEST INTENT, regardless of network speed.
 */

/**
 * 02_basic_throttle.js
 * 
 * CONCEPT:
 * Throttling enforces a maximum number of times a function can be called over time. 
 * As if "pacing" the execution. 
 * 'Run at most once every X milliseconds'
 */

// 1. The Wrapper Function
function throttle(func, delay) {
    let lastTime = 0;

    return function (...args) {
        const now = Date.now();
        const context = this;

        if (now - lastTime >= delay) {
            func.apply(context, args);
            lastTime = now;
        } else {
            // Optional: Log ignored calls or handle trailing edge (not in basic version)
            // console.log("Throttled (Ignored)");
        }
    }
}

// --- DEMONSTRATION ---

const logScroll = () => {
    console.log(`[Executed] Scroll Event Processed at ${Date.now()}`);
};

const throttledScroll = throttle(logScroll, 1000);

console.log("Simulating scroll events every 200ms...");

// Simulation loop
let counter = 0;
const interval = setInterval(() => {
    counter++;
    throttledScroll();
    if (counter === 10) {
        clearInterval(interval);
        console.log("Simulation finished.");
    }
}, 200);

// Output expectation:
// Should execute immediately, then approx every 1000ms.
// The intermediate calls (every 200ms) should be ignored.

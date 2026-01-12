/**
 * 04_advanced_throttle.js
 * 
 * ADVANCED FEATURES:
 * 1. Leading: Execute on the first call.
 * 2. Trailing: Execute one final time after the throttle period if called during the cool-down.
 * 
 * This is closer to Lodash's _.throttle implementation.
 */

function throttleAdvanced(func, wait, options = {}) {
    let timeout = null;
    let previous = 0;

    // Default options
    // leading: false -> disable execution on the very first call
    // trailing: false -> disable execution on the trailing edge after wait
    const { leading = true, trailing = true } = options;

    return function (...args) {
        const now = Date.now();

        // If leading is false and this is the first call, pretend we just executed
        if (!previous && leading === false) previous = now;

        const remaining = wait - (now - previous);
        const context = this;

        // If time expired or system clock went backwards
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout && trailing !== false) {
            // Schedule trailing call
            timeout = setTimeout(() => {
                previous = leading === false ? 0 : Date.now();
                timeout = null;
                func.apply(context, args);
            }, remaining);
        }
    };
}

// --- DEMONSTRATION ---

const trackMouse = (x, y) => console.log(`[TRACK] Mouse at ${x},${y} | Time: ${Date.now()}`);

// Throttle 1000ms, Leading & Trailing enabled
const efficientTracker = throttleAdvanced(trackMouse, 1000, { leading: true, trailing: true });

console.log("Start Moving Mouse...");
let time = 0;
const interval = setInterval(() => {
    time += 200;
    console.log(`Event fired at ${time}ms`);
    efficientTracker(time, time); // Simulating x,y as time

    if (time >= 3000) {
        clearInterval(interval);
        console.log("Stopped.");
    }
}, 200);

/**
 * EXPECTED TIMELINE (Throttle 1000ms):
 * 0ms:   Called. Leading=true. EXECUTE immediately.
 * 200ms: Called. In cooldown. Scheduled trailing.
 * 400ms: Called. In cooldown. Rescheduled trailing? (Usually just ignores or keeps existing schedule)
 * 800ms: Called.
 * 1000ms: Trailing timer fires? Or next call at 1000? 
 *         Actually, if we call at 1000, remaining <= 0. EXECUTE.
 * 
 * Complex logic ensures we don't double invoke if leading edge just fired.
 */

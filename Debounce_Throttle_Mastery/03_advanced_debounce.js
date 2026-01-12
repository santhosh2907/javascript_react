/**
 * 03_advanced_debounce.js
 * 
 * ADVANCED FEATURES:
 * 1. 'immediate' (Leading Edge): Execute the function on the STARTED edge of the timeout, not just the end.
 *    Useful for "Submit" buttons (submit immediately, then ignore double clicks).
 * 2. 'cancel': Method to manually clear the timer.
 *    Useful for cleanup in React useEffect return or if the user cancels an action.
 */

function debounceAdvanced(func, wait, immediate) {
    let timeout;
    let result;

    const debounced = function (...args) {
        const context = this;

        const later = function () {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            result = func.apply(context, args);
        }

        return result;
    };

    // Add cancel method to the function object
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

// --- DEMONSTRATION ---

console.log("--- TEST 1: Leading Edge (Immediate) ---");
const onBtnClick = (btnName) => console.log(`[CLICKED] ${btnName} at ${new Date().toISOString()}`);

// Immediate = true. Will fire on FIRST call, then wait.
const safeSubmit = debounceAdvanced(onBtnClick, 2000, true);

console.log("User mashes submit button 5 times...");
safeSubmit("Submit-1"); // Fires immediately
safeSubmit("Submit-2"); // Ignored (timer reset)
safeSubmit("Submit-3"); // Ignored (timer reset)
safeSubmit("Submit-4"); // Ignored (timer reset)
safeSubmit("Submit-5"); // Ignored (timer reset, starts 2s wait)

// After 2 seconds execution ends, but since immediate=true, it doesn't fire trailing edge logic in this simple impl.
// (Standard Lodash behavior for immediate is to ONLY fire leading unless configured otherwise).

setTimeout(() => {
    console.log("--- TEST 2: Trailing Edge (Standard) with Cancel ---");
    const autoSave = debounceAdvanced((data) => console.log(`[SAVED] ${data}`), 1000);

    autoSave("Draft 1");
    autoSave("Draft 2");
    console.log("User navigates away, cancelling save...");
    autoSave.cancel();
    // Expectation: NO save should happen.
}, 2500);

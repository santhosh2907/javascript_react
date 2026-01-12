/**
 * 01_basic_debounce.js
 * 
 * CONCEPT:
 * Debouncing enforces that a function not be called again until a certain 
 * amount of time has passed without it being called. 
 * As if "grouping" multiple sequential calls into a single one.
 */

// 1. The Wrapper Function
function debounce(func, delay) {
    let timerId;

    return function (...args) {
        // preserve 'this' context
        const context = this;

        // Reset the timer if it was already running
        if (timerId) {
            clearTimeout(timerId);
        }

        // Set a new timer
        timerId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

// --- DEMONSTRATION ---

const expensiveOperation = (args) => {
    console.log(`[Executed] API Call with search term: "${args}" at ${new Date().toISOString()}`);
};

const debouncedSearch = debounce(expensiveOperation, 1000);

console.log("Typing 'React'...");
debouncedSearch("R");
debouncedSearch("Re");
debouncedSearch("Rea");
debouncedSearch("Reac");
debouncedSearch("React");

// Output expectation:
// Only ONE execution should happen after 1 second of silence.
// "API Call with search term: "React""

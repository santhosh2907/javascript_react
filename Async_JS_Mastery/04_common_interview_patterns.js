/**
 * 04_common_interview_patterns.js
 * 
 * PATTERNS:
 * 1. Sequential vs Parallel Execution
 * 2. Implementing Retry Logic (Very Common Question!)
 */

const util = {
    wait: (ms) => new Promise(r => setTimeout(r, ms)),
    failSometimes: () => new Promise((resolve, reject) => {
        if (Math.random() > 0.7) resolve("Success!");
        else reject("Network Error");
    })
};

// --- Pattern 1: Sequential vs Parallel ---

// Bad (Sequential) - total time = 1s + 1s = 2s
async function fetchSequential() {
    console.time("Sequential");
    await util.wait(1000);
    await util.wait(1000);
    console.timeEnd("Sequential");
}

// Good (Parallel) - total time = max(1s, 1s) = 1s
async function fetchParallel() {
    console.time("Parallel");
    const p1 = util.wait(1000);
    const p2 = util.wait(1000);
    await Promise.all([p1, p2]);
    console.timeEnd("Parallel"); // Should be approx 1s
}

// --- Pattern 2: Retry Logic Implementation ---
// "Write a function that retries a promise N times before failing."

async function fetchWithRetry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            console.log(`Attempt ${i + 1} failed. Retrying...`);
            if (i < retries - 1) {
                await util.wait(delay); // Wait before retrying
            }
        }
    }
    throw new Error(`Failed after ${retries} attempts`);
}

// --- Demo execution ---
async function runDemo() {
    console.log("--- 1. Sequential vs Parallel ---");
    await fetchParallel();
    // await fetchSequential(); // Uncomment to see the difference

    console.log("\n--- 2. Retry Logic ---");
    try {
        const result = await fetchWithRetry(util.failSometimes, 5, 500);
        console.log("Final Result:", result);
    } catch (e) {
        console.log("Final Error:", e.message);
    }
}

runDemo();

/**
 * INTERVIEW TIP:
 * - When asked to implement "Retry", always ask about the "delay" between retries.
 * - Mention "Exponential Backoff" (increasing delay after each failure) as a bonus point.
 */

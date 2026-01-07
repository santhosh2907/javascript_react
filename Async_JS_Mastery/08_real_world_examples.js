/**
 * REAL WORLD ASYNC/AWAIT EXAMPLES
 * 
 * 1. Retry Logic (Exponential Backoff)
 * 2. Polling (Waiting for a status to change)
 * 3. Timeout / Cancellation pattern
 */

const wait = (ms) => new Promise(r => setTimeout(r, ms));

// ==========================================
// 1. RETRY LOGIC (Exponential Backoff)
// ==========================================
// Use case: Network request failing intermittently.

async function fetchWithRetry(fn, retries = 3, delay = 500) {
    try {
        return await fn();
    } catch (err) {
        if (retries === 0) throw err;

        console.warn(`⚠️ Failed. Retrying in ${delay}ms... (${retries} left)`);
        await wait(delay);

        // Recurse with decremented retries and doubled delay (Exponential Backoff)
        return fetchWithRetry(fn, retries - 1, delay * 2);
    }
}

async function unstableApi() {
    const chance = Math.random();
    if (chance < 0.7) { // 70% chance of failure
        console.log("  -> [API] 500 Server Error");
        throw new Error("Server Error");
    }
    console.log("  -> [API] 200 OK");
    return "Data Received";
}

async function demoRetry() {
    console.log("\n--- 1. Retry Logic Demo ---");
    try {
        const result = await fetchWithRetry(unstableApi, 4, 200);
        console.log("✅ Success:", result);
    } catch (e) {
        console.error("❌ Failed after all retries:", e.message);
    }
}


// ==========================================
// 2. POLLING (Long polling)
// ==========================================
// Use case: Waiting for a file upload to process or a payment to clear.

let serverStatus = "PENDING";
// Simulate server changing status after 2 seconds
setTimeout(() => { serverStatus = "COMPLETED"; }, 2000);

async function checkStatus() {
    console.log(`  -> Checking status: ${serverStatus}`);
    return serverStatus;
}

async function pollForCompletion(fn, interval = 500, maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
        const status = await fn();
        if (status === "COMPLETED") return status;

        await wait(interval);
    }
    throw new Error("Polling timed out");
}

async function demoPolling() {
    console.log("\n--- 2. Polling Demo ---");
    // Reset simulation
    serverStatus = "PENDING";
    setTimeout(() => { serverStatus = "COMPLETED"; }, 1500);

    try {
        const finalStatus = await pollForCompletion(checkStatus);
        console.log("✅ Polling finished:", finalStatus);
    } catch (e) {
        console.error("❌ Polling failed:", e.message);
    }
}


// ==========================================
// 3. TIMEOUT / CANCELLATION (using AbortController)
// ==========================================
// Use case: User navigates away or request takes too long.
// Note: AbortController is the modern standard for canceling fetch/events.

async function fetchWithTimeout(url, timeMs) {
    // 1. Create a controller
    const controller = new AbortController();
    const { signal } = controller;

    // 2. Set the fail timeout
    const timeoutId = setTimeout(() => {
        controller.abort(); // Triggers the 'abort' signal
    }, timeMs);

    try {
        console.log(`  -> Fetching ${url} with ${timeMs}ms timeout...`);
        // In real node (v18+)/browser, you pass { signal } to fetch()
        // Here we simulate it:
        await new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                resolve("Response Data");
            }, 1000); // Server takes 1000ms

            // Listen for abort
            signal.addEventListener('abort', () => {
                clearTimeout(timer);
                reject(new Error("Request Timed Out (Aborted)"));
            });
        });

        clearTimeout(timeoutId); // Clear the kill switch if we succeeded
        return "Success!";

    } catch (error) {
        if (error.name === 'AbortError' || error.message.includes('Aborted')) {
            throw new Error("Request cancelled due to timeout");
        }
        throw error;
    }
}

async function demoTimeout() {
    console.log("\n--- 3. Timeout/Cancel Demo ---");

    // Attempt 1: Timeout is shorter than request (Fail)
    try {
        await fetchWithTimeout("https://slow-api.com", 500);
    } catch (e) {
        console.log("Expected Failure:", e.message);
    }

    // Attempt 2: Timeout is longer than request (Success)
    try {
        const res = await fetchWithTimeout("https://fast-api.com", 2000);
        console.log("Expected Success:", res);
    } catch (e) {
        console.error("Unexpected Fail:", e);
    }
}


// EXECUTION
async function run() {
    await demoRetry();
    await demoPolling();
    await demoTimeout();
}

run();

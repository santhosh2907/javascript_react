/**
 * 03_advanced_promises.js
 * 
 * CONCEPTS:
 * - Promise.all(): Wait for ALL to succeed. Fails if ANY fail.
 * - Promise.allSettled(): Wait for ALL to finish, regardless of success/failure.
 * - Promise.race(): Returns first one to settle (win or fail).
 * - Promise.any(): Returns first one to SUCCESS.
 */

// Helper functions to simulate API calls
const getSlowApi = () => new Promise(r => setTimeout(() => r("Slow API Data (3s)"), 3000));
const getFastApi = () => new Promise(r => setTimeout(() => r("Fast API Data (1s)"), 1000));
const getErrorApi = () => new Promise((_, reject) => setTimeout(() => reject("API Failed!"), 2000));

async function demonstrateAdvancedPatterns() {
    console.log("--- Starting Demonstration ---");

    // 1. Promise.all: Critical for performance when requests are independent.
    // Example: Fetching Profile, Settings, and Notifications at once for a page load.
    console.log("\n1. Promise.all (Parallel Execution):");
    try {
        const [slow, fast] = await Promise.all([getSlowApi(), getFastApi()]);
        console.log(`   Result: ${slow}, ${fast}`);
    } catch (e) {
        console.log("   One failed, so all failed.");
    }

    // 2. Promise.allSettled: Good when you want partial results.
    // Example: Bulk uploading 10 images. If 1 fails, you still want to know the other 9 succeeded.
    console.log("\n2. Promise.allSettled (Handling Failures Gracefully):");
    const results = await Promise.allSettled([getFastApi(), getErrorApi()]);
    results.forEach(res => {
        if (res.status === 'fulfilled') console.log(`   Success: ${res.value}`);
        else console.log(`   Error: ${res.reason}`);
    });

    // 3. Promise.race: Timeouts
    // Example: "Fetch data but give up if it takes more than 5 seconds."
    console.log("\n3. Promise.race (First one wins):");
    try {
        const winner = await Promise.race([getFastApi(), getSlowApi()]);
        console.log(`   Winner: ${winner}`);
    } catch (e) {
        console.log(`   Race Error: ${e}`);
    }

    // 4. Promise.any (ES2021): First successful one.
    // Example: Ping 3 mirrors of a CDN, use whichever responds first.
    console.log("\n4. Promise.any (First SUCESS wins, ignores errors unless all fail):");
    try {
        const firstSuccess = await Promise.any([getErrorApi(), getFastApi(), getSlowApi()]);
        console.log(`   First Success: ${firstSuccess}`);
        // Note: 'errorApi' finished at 2s with error, but 'fastApi' finished at 1s with success, so 'fastApi' wins.
    } catch (e) {
        console.log("   All promises failed.");
    }
}

demonstrateAdvancedPatterns();

/**
 * INTERVIEW TIP:
 * - Know the difference between `race` (first result) and `any` (first SUCCESS).
 * - `Promise.all` is "fail-fast".
 */

/**
 * ADVANCED PROMISE COMBINATORS
 * 
 * This file demonstrates the 4 major Promise combinators:
 * 1. Promise.all()       - Wait for ALL to succeed (Fail-fast behavior)
 * 2. Promise.allSettled()- Wait for ALL to finish, regardless of success/failure
 * 3. Promise.race()      - Return result of the FIRST one to settle (win/lose)
 * 4. Promise.any()       - Return result of the FIRST one to SUCCEED
 */

// Helpers to simulate async work
const simulateSuccess = (label, delay) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`✅ [${label}] Resolved after ${delay}ms`);
            resolve(`Success: ${label}`);
        }, delay);
    });
};

const simulateFailure = (label, delay) => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            console.log(`❌ [${label}] Rejected after ${delay}ms`);
            reject(`Error: ${label}`);
        }, delay);
    });
};


// 1. Promise.all()
// Use case: Dependent data fetching. If one fails, everything is useless.
async function demoPromiseAll() {
    console.log("\n--- Demo: Promise.all() ---");
    console.log("(Scenario: Fetching User, Posts, and Metrics options in parallel)");

    try {
        const results = await Promise.all([
            simulateSuccess("User Profile", 1000),
            simulateSuccess("User Posts", 1500),
            simulateSuccess("App Settings", 500)
        ]);
        console.log("🎉 Promise.all Result:", results);
    } catch (error) {
        console.error("🔥 Promise.all Failed:", error);
    }
}

async function demoPromiseAllFail() {
    console.log("\n--- Demo: Promise.all() with Failure ---");
    console.log("(Scenario: One critical request fails)");

    try {
        await Promise.all([
            simulateSuccess("Service A", 1000),
            simulateFailure("Service B (Critical)", 500), // Fails fast!
            simulateSuccess("Service C", 2000)
        ]);
    } catch (error) {
        console.error("🔥 Promise.all Catch:", error);
    }
}


// 2. Promise.allSettled()
// Use case: Batch processing where some failures are acceptable.
async function demoAllSettled() {
    console.log("\n--- Demo: Promise.allSettled() ---");
    console.log("(Scenario: Uploading multiple images - some might fail)");

    const results = await Promise.allSettled([
        simulateSuccess("Image 1", 1000),
        simulateFailure("Image 2", 500),
        simulateSuccess("Image 3", 1500)
    ]);

    // Process results
    const successful = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    const failed = results.filter(r => r.status === 'rejected').map(r => r.reason);

    console.log(`📊 Report: ${successful.length} Success, ${failed.length} Failed`);
    console.log("Detailed Results:", results);
}


// 3. Promise.race()
// Use case: Timeout handling. Race your fetch against a timer.
async function demoRace() {
    console.log("\n--- Demo: Promise.race() (Timeout Example) ---");

    const slowApiCall = simulateSuccess("Heavy Query", 3000); // Takes 3s
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject("TIMEOUT: Operation took too long"), 1000) // Timeout after 1s
    );

    try {
        const result = await Promise.race([slowApiCall, timeout]);
        console.log("Win:", result);
    } catch (error) {
        console.error("Race Lost:", error);
    }
}


// 4. Promise.any() [ES2021]
// Use case: Redundant mirrors (CDN). You just want the fastest SUCCESS.
async function demoAny() {
    console.log("\n--- Demo: Promise.any() ---");
    console.log("(Scenario: Fetching from multiple CDNs (US, EU, ASIA))");

    try {
        const firstSuccess = await Promise.any([
            simulateFailure("CDN US (Down)", 500),
            simulateSuccess("CDN EU", 1000), // Winner (first success)
            simulateSuccess("CDN ASIA", 1500)
        ]);
        console.log("🎉 Fastest successful response:", firstSuccess);
    } catch (error) {
        console.error("All failed:", error);
    }
}


// 5. COMPARISON: RACE vs ANY
// Use case: Understanding the critical difference.
async function demoRaceVsAnyComparison() {
    console.log("\n--- Demo: Race vs Any (The Critical Difference) ---");
    console.log("Scenario: Quick failure (100ms) vs Slow success (500ms)");

    const p1 = simulateFailure("Fast Error", 100);
    const p2 = simulateSuccess("Slow Success", 500);

    // Promise.race() will SEE the error first and FAIL immediately.
    // It's like a race where if the first runner trips, the race stops.
    try {
        await Promise.race([p1, p2]);
    } catch (e) {
        console.log("🏎️ Promise.race() Result: [REJECTED] " + e);
        console.log("   (Reason: The error happened first, so race settled with error)");
    }

    // Promise.any() will IGNORE the error and wait for the success.
    // It's like saying "I don't care about errors, give me the first winner."
    try {
        const result = await Promise.any([p1, p2]);
        console.log("✨ Promise.any()  Result: [RESOLVED] " + result);
        console.log("   (Reason: It ignored the fast error and waited for the slow success)");
    } catch (e) {
        console.log("Failed:", e);
    }
}


// MAIN EXECUTION FLOW
async function runAllDemos() {
    // await demoPromiseAll();
    // await demoPromiseAllFail();
    // await demoAllSettled();
    // await demoRace();
    // await demoAny();
    await demoRaceVsAnyComparison(); // Focused run
    console.log("\n✨ Done with Advanced Promises");
}

runAllDemos();

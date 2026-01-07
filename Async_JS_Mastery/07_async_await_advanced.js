/**
 * ADVANCED ASYNC/AWAIT PATTERNS
 * 
 * This file explores deeper concepts:
 * 1. Sequential vs Parallel execution traps in async/await
 * 2. Advanced Error Handling scopes
 * 3. Async Iterators (for await...of)
 */

const delay = (ms) => new Promise(r => setTimeout(r, ms));


// ==========================================
// 1. THE "SEQUENTIAL TRAP" vs PARALLELISM
// ==========================================

async function slowSequential() {
    console.time("Sequential");
    // ⚠️ These run one after another. Total time = 1s + 1s = 2s
    const val1 = await delay(1000).then(() => "A");
    const val2 = await delay(1000).then(() => "B");
    console.timeEnd("Sequential");
    console.log(`Results: ${val1}, ${val2}`);
}

async function fastParallel() {
    console.time("Parallel");
    // ✅ Both start immediately. We await their RESULTS, not their creation.
    const p1 = delay(1000).then(() => "A");
    const p2 = delay(1000).then(() => "B");

    // Now blocked until both finish. Total time = Max(1s, 1s) = 1s
    const val1 = await p1;
    const val2 = await p2;
    console.timeEnd("Parallel");
    console.log(`Results: ${val1}, ${val2}`);
}

// ==========================================
// 2. ADVANCED ERROR HANDLING
// ==========================================

async function riskyBusiness() {
    // This will succeed 50% of the time, fail 50%
    if (Math.random() > 0.5) throw new Error("Boom!");
    return "Safe";
}

async function preciseErrorHandling() {
    console.log("\n--- preciseErrorHandling ---");

    // Pattern 1: Wrap individual awaits if you want the rest to continue
    try {
        await riskyBusiness();
    } catch (e) {
        console.warn("Recoverable: Task A failed, but continuing...");
    }

    try {
        const result = await riskyBusiness();
        console.log("Task B Success:", result);
    } catch (e) {
        console.error("Critical: Task B failed completely.");
        // Rethrow if you want to bubble up
        // throw e; 
    }
}


// ==========================================
// 3. ASYNC ITERATION (for await...of)
// ==========================================

async function* numberGenerator() {
    // A generator that yields promises over time
    for (let i = 1; i <= 3; i++) {
        await delay(500);
        yield i;
    }
}

async function processStream() {
    console.log("\n--- Async Iterator ---");
    // Regular 'for...of' doesn't work well with async generators.
    // 'for await...of' waits for each yield to resolve.
    for await (const num of numberGenerator()) {
        console.log(`Received chunk: ${num}`);
    }
    console.log("Stream finished.");
}


// MAIN EXECUTION
async function run() {
    console.log("1. Demonstrating Sequential Trap (Wait 2s)...");
    await slowSequential();

    console.log("\n2. Demonstrating Parallel Fix (Wait 1s)...");
    await fastParallel();

    await preciseErrorHandling();
    await processStream();
}

run();

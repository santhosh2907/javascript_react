/**
 * 02_async_await_real_world.js
 * 
 * REAL WORLD SIMULATION:
 * Scenario: We need to fetch a user's profile, and THEN fetch their recent orders.
 * This is a dependent query: Request 2 needs data (userId) from Request 1.
 */

// --- database / api simulation ---
const db = {
    users: { 1: { id: 1, name: "Alice", email: "alice@example.com" } },
    orders: { 1: [{ orderId: 101, item: "Laptop" }, { orderId: 102, item: "Mouse" }] }
};

// Simulated Network Call 1: Fetch User
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = db.users[userId];
            if (user) {
                console.log(`[API] Fetched User: ${user.name}`);
                resolve(user);
            } else {
                reject(`User with ID ${userId} not found.`);
            }
        }, 1000);
    });
}

// Simulated Network Call 2: Fetch Orders by User ID
function fetchOrders(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orders = db.orders[userId];
            if (orders) {
                console.log(`[API] Fetched ${orders.length} orders for User ${userId}`);
                resolve(orders);
            } else {
                // It's possible a user has no orders, which isn't always an error, 
                // but let's simulate success with empty array usually.
                resolve([]);
            }
        }, 1000);
    });
}

// --- Using Async/Await (The Modern Way) ---

async function getUserDashboard(userId) {
    try {
        console.log("--- Loading Dashboard ---");

        // 1. await allows us to write async code that looks synchronous
        const user = await fetchUser(userId);

        // 2. We can use the result of the previous await immediately
        console.log(`Processing dashboard for ${user.name}...`);

        const orders = await fetchOrders(user.id);

        // 3. Final logic with all data
        console.log("--- Dashboard Data Ready ---");
        console.log({ user, orders });

        return { user, orders };

    } catch (error) {
        // 4. One catch block handles potential errors from ANY of the awaited promises
        console.error("Dashboard Error:", error);
    }
}

// Execute
getUserDashboard(1);
// Try changing to getUserDashboard(99) to see the catch block in action!

/**
 * INTERVIEW TIP:
 * - `async` functions ALWAYS return a Promise.
 * - `await` pauses the execution of the function ONLY, not the main thread.
 * - It makes reading sequential async logic much easier than nested .then() chains (callback hell).
 */

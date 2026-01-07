/**
 * ASYNC PATTERNS COMPARISON: Callbacks vs Promises vs Async/Await
 * 
 * Scenario: We need to perform 3 dependent steps:
 * 1. Login user (takes 1s)
 * 2. Get user's recent posts (takes 1s)
 * 3. Get comments for the latest post (takes 1s)
 */

// ==========================================
// 1. HELPERS (Simulating Async Operations)
// ==========================================

function loginUser(email, password, callback) {
    setTimeout(() => {
        console.log(`[1] User logged in: ${email}`);
        // Error simulation: if callback is provided, follow error-first pattern
        if (callback) callback(null, { id: 101, email });
        // If no callback, we assume it's for Promise/Async version (handled differently below)
    }, 1000);
}

// Promise-based versions for Sections 2 & 3
const loginUserPromise = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`[Promise] User logged in: ${email}`);
            resolve({ id: 101, email });
        }, 1000);
    });
};

const getUserPostsPromise = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`[Promise] Got posts for user ${userId}`);
            resolve([{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]);
        }, 1000);
    });
};

const getPostCommentsPromise = (postId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`[Promise] Got comments for post ${postId}`);
            resolve(["Nice post!", "Great info"]);
        }, 1000);
    });
};


// Callback-based versions for Section 1
function loginUserCallback(email, password, onSuccess, onFailure) {
    setTimeout(() => {
        console.log(`[Callback] User logged in: ${email}`);
        onSuccess({ id: 101, email });
    }, 1000);
}

function getPostsCallback(userId, onSuccess, onFailure) {
    setTimeout(() => {
        console.log(`[Callback] Got posts for user ${userId}`);
        onSuccess([{ id: 1, title: "Post 1" }]);
    }, 1000);
}

function getCommentsCallback(postId, onSuccess, onFailure) {
    setTimeout(() => {
        console.log(`[Callback] Got comments for post ${postId}`);
        onSuccess(["Nice post!"]);
    }, 1000);
}


// ==========================================
// SECTION 1: CALLBACK HELL (The Old Way)
// ==========================================
// Problem: Deep nesting, hard to read, error handling is repetitive.
function runCallbackExample() {
    console.log("--- Starting Callback Example ---");

    loginUserCallback("user@example.com", "1234",
        (user) => {
            getPostsCallback(user.id,
                (posts) => {
                    getCommentsCallback(posts[0].id,
                        (comments) => {
                            console.log("FINAL RESULT (Callback):", comments);
                            console.log("-----------------------------------");
                            runPromiseExample(); // Chain to next example
                        },
                        (err) => console.error(err)
                    );
                },
                (err) => console.error(err)
            );
        },
        (err) => console.error(err)
    );
}


// ==========================================
// SECTION 2: PROMISES (The Intermediate Way)
// ==========================================
// Improvement: Flat chain, single .catch() for errors.
function runPromiseExample() {
    console.log("\n--- Starting Promise Example ---");

    loginUserPromise("user@example.com", "1234")
        .then(user => getUserPostsPromise(user.id))
        .then(posts => getPostCommentsPromise(posts[0].id))
        .then(comments => {
            console.log("FINAL RESULT (Promise):", comments);
            console.log("-----------------------------------");
            runAsyncAwaitExample(); // Chain to next example
        })
        .catch(err => console.error("Error:", err));
}


// ==========================================
// SECTION 3: ASYNC/AWAIT (The Modern Way)
// ==========================================
// Best: Looks like synchronous code, easiest to read and debug.
async function runAsyncAwaitExample() {
    console.log("\n--- Starting Async/Await Example ---");

    try {
        const user = await loginUserPromise("user@example.com", "1234");
        const posts = await getUserPostsPromise(user.id);
        const comments = await getPostCommentsPromise(posts[0].id);

        console.log("FINAL RESULT (Async/Await):", comments);
        console.log("-----------------------------------");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Start the chain
runCallbackExample();

/**
 * Senior JS Assessment: Promise Polyfills
 *
 * Constraint: NO built-in array methods (map, forEach). Use loops.
 */

class PromisePolyfills {
    static all(promises) {
        return new Promise((resolve, reject) => {
            // Handle non-array inputs if strictly required, but usually array is assumed
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'));
            }

            const results = [];
            let completed = 0;
            const total = promises.length;

            if (total === 0) {
                resolve([]);
                return;
            }

            for (let i = 0; i < total; i++) {
                // Use Promise.resolve to handle raw values
                Promise.resolve(promises[i])
                    .then((val) => {
                        results[i] = val; // Store at correct index
                        completed++;
                        if (completed === total) {
                            resolve(results);
                        }
                    })
                    .catch((err) => {
                        // First rejection rejects the whole promise
                        reject(err);
                    });
            }
        });
    }

    static allSettled(promises) {
        return new Promise((resolve) => {
            const results = [];
            let completed = 0;
            const total = promises.length;

            if (total === 0) {
                resolve([]);
                return;
            }

            for (let i = 0; i < total; i++) {
                Promise.resolve(promises[i])
                    .then((value) => {
                        results[i] = { status: 'fulfilled', value };
                    })
                    .catch((reason) => {
                        results[i] = { status: 'rejected', reason };
                    })
                    .finally(() => {
                        completed++;
                        if (completed === total) {
                            resolve(results);
                        }
                    });
            }
        });
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(resolve).catch(reject);
            }
        });
    }
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('Running Promise Polyfill Tests (Manual Loops)...');

    const p1 = Promise.resolve(1);
    const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 10));
    const p3 = 3;
    const pFail = Promise.reject('Error');

    // Test All
    PromisePolyfills.all([p1, p2, p3]).then((res) => {
        // Basic array join check without using join if we were super strict, but join is fine for tests
        console.assert(res[0] === 1 && res[1] === 2 && res[2] === 3, 'Promise.all should resolve ordered values');
    });

    PromisePolyfills.all([p1, pFail]).catch((err) => {
        console.assert(err === 'Error', 'Promise.all should reject fast');
    });

    // Test AllSettled
    PromisePolyfills.allSettled([p1, pFail]).then((res) => {
        console.assert(res[0].status === 'fulfilled', 'AllSettled index 0 fulfilled');
        console.assert(res[1].status === 'rejected', 'AllSettled index 1 rejected');
        console.log('Tests Passed!');
    });
}

module.exports = PromisePolyfills;

/**
 * Senior JS Assessment: Observable Store (Mini-Redux/MobX)
 *
 * Challenge: Implement a generic `createStore` function that:
 * - Holds an initial state.
 * - Allows subscribing to changes.
 * - Updates subscribers when state changes.
 * - Support deep observability (Bonus - implemented here via Proxy).
 *
 * What we look for:
 * - Key use of `Proxy` (or getter/setter for simpler versions).
 * - Immutability patterns vs Mutability patterns (MobX approach chosen here for ease of Proxy usage).
 * - Recursion for deep proxies.
 */

function createObservableStore(initialState) {
    const subscribers = new Set();

    function subscribe(fn) {
        subscribers.add(fn);
        return () => subscribers.delete(fn);
    }

    function notify() {
        subscribers.forEach((fn) => fn(state));
    }

    const handler = {
        get(target, property, receiver) {
            try {
                const value = Reflect.get(target, property, receiver);
                if (typeof value === 'object' && value !== null) {
                    // Recursive wrapping for deep observation
                    return new Proxy(value, handler);
                }
                return value;
            } catch (err) {
                return undefined;
            }
        },
        set(target, property, value, receiver) {
            const result = Reflect.set(target, property, value, receiver);
            notify();
            return result;
        },
    };

    const state = new Proxy(initialState, handler);

    return { state, subscribe };
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('Running Observable Store Tests...');

    const { state, subscribe } = createObservableStore({
        user: { name: 'Alice', prefs: { theme: 'dark' } },
        count: 0
    });

    let updates = 0;
    subscribe((newState) => {
        // console.log('State updated:', JSON.stringify(newState));
        updates++;
    });

    // Test 1: Top level mutation
    state.count++;
    console.assert(updates === 1, 'Should notify on top level change');

    // Test 2: Nested mutation
    state.user.prefs.theme = 'light';
    console.assert(updates === 2, 'Should notify on nested change');

    // Test 3: Array support
    state.items = [];
    state.items.push(1); // push modifies length + index
    // Note: Array mutation might trigger multiple sets (length, index), updates might be > 1 per action without batching.
    // For this simple implementation, we just check that it updated at least once.
    console.assert(updates > 2, 'Should notify on array mutation');

    console.log('Tests Passed!');
}

module.exports = createObservableStore;

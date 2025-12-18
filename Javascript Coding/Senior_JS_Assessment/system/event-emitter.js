/**
 * Senior JS Assessment: Event Emitter
 *
 * Challenge: Implement an EventEmitter class with:
 * - `on(event, listener)`: Add listener
 * - `off(event, listener)`: Remove listener
 * - `once(event, listener)`: Add one-time listener
 * - `emit(event, ...args)`: Trigger listeners
 *
 * Bonus: Support wildcard events ('*') or namespaced events ('users:login').
 * (This implementation supports basic wildcards: listening to '*' receives all events).
 *
 * What we look for:
 * - Map/Object usage for listener storage.
 * - Proper cleanup (removing listeners).
 * - Handling `once` wrapper logic correctly without leaking memory.
 */

class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
        return () => this.off(event, listener); // Return unsubscribe function
    }

    off(event, listener) {
        if (!this.events.has(event)) return;
        const listeners = this.events.get(event);
        const index = listeners.indexOf(listener);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    }

    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }

    emit(event, ...args) {
        // 1. Emit specific listeners
        if (this.events.has(event)) {
            this.events.get(event).forEach((cb) => {
                try {
                    cb(...args);
                } catch (err) {
                    console.error(`Error in event listener for ${event}:`, err);
                }
            });
        }

        // 2. Emit global wildcard listeners (if implemented)
        if (this.events.has('*')) {
            this.events.get('*').forEach((cb) => {
                try {
                    cb(event, ...args);
                } catch (err) {
                    console.error(`Error in wildcard listener:`, err);
                }
            });
        }
    }
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('Running EventEmitter Tests...');

    const ee = new EventEmitter();
    let count = 0;

    const inc = () => count++;

    // Test 1: On/Emit
    ee.on('click', inc);
    ee.emit('click');
    console.assert(count === 1, 'Event should trigger listener');

    // Test 2: Off
    ee.off('click', inc);
    ee.emit('click');
    console.assert(count === 1, 'Event off should remove listener');

    // Test 3: Once
    ee.once('fire', inc);
    ee.emit('fire');
    ee.emit('fire');
    console.assert(count === 2, 'Once should trigger only once');

    // Test 4: Wildcard
    let wildcardArgs = [];
    ee.on('*', (evt, arg) => wildcardArgs.push([evt, arg]));
    ee.emit('user:login', 'alice');

    console.assert(wildcardArgs[0][0] === 'user:login', 'Wildcard should capture event name');
    console.assert(wildcardArgs[0][1] === 'alice', 'Wildcard should capture arguments');

    console.log('Tests Passed!');
}

module.exports = EventEmitter;

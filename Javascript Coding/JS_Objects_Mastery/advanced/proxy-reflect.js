/**
 * JS Objects Mastery: Proxy & Reflect
 *
 * Proxy: Wraps an object and intercepts operations (traps).
 * Reflect: Forwards operations to original object (default behavior).
 */

// 1. Validation Proxy
// Intercepts set operations to validate data types
const validator = {
    set(target, key, value) {
        if (key === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('Age must be an integer');
            }
            if (value > 200) {
                throw new RangeError('Age seems invalid');
            }
        }
        console.log(`Setting ${key} = ${value}`);
        // Forward to default
        return Reflect.set(target, key, value);
    }
};

const person = new Proxy({}, validator);

// 2. Logging/Tracing Proxy
// Intercepts get operations to track access
function createTracer(target) {
    return new Proxy(target, {
        get(target, key, receiver) {
            console.log(`[Read] Accessing property: "${String(key)}"`);
            return Reflect.get(target, key, receiver);
        }
    });
}

const dbConfig = createTracer({
    host: 'localhost',
    port: 5432
});

// --- TEST SUITE ---
if (require.main === module) {
    console.log('--- Proxy & Reflect ---');

    try {
        person.age = 100; // OK
        console.log('Age set to 100');
        person.age = 'young'; // Error
    } catch (e) {
        console.log('Caught expected error:', e.message);
    }

    console.log('--- Tracer ---');
    const h = dbConfig.host; // Logs [Read]
    const p = dbConfig.port; // Logs [Read]
}

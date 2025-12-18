/**
 * JS Objects Mastery: Deep Freeze
 *
 * Object.freeze is shallow. It only prevents adding/removing/modifying props of the immediate object.
 * Deep Freeze recursively freezes all children property objects.
 */

function deepFreeze(obj) {
    // 1. Retrieve the property names defined on object
    const propNames = Reflect.ownKeys(obj);

    // 2. Freeze properties before freezing self
    for (const name of propNames) {
        const value = obj[name];

        if ((value && typeof value === 'object') || typeof value === 'function') {
            // Recursively freeze if it's not already frozen to handle cycles
            if (!Object.isFrozen(value)) {
                deepFreeze(value);
            }
        }
    }

    // 3. Freeze self
    return Object.freeze(obj);
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('--- Deep Freeze ---');

    const config = {
        db: {
            host: 'localhost',
            options: {
                pool: 5
            }
        }
    };

    deepFreeze(config);

    console.log('Is config frozen?', Object.isFrozen(config));
    console.log('Is config.db frozen?', Object.isFrozen(config.db));
    console.log('Is config.db.options frozen?', Object.isFrozen(config.db.options));

    try {
        config.db.options.pool = 100;
    } catch (e) {
        console.log('Error modifying deep property (Expected in strict mode):', e.message);
    }
}

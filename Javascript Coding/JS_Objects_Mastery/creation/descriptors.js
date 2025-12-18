/**
 * JS Objects Mastery: Property Descriptors
 *
 * Understanding attributes:
 * - value
 * - writable: Can happen via assignment?
 * - enumerable: Shows up in for..in / Object.keys?
 * - configurable: Can be deleted or type changed?
 * - get/set: Accessor functions.
 */

const user = {};

// 1. Data Descriptor
Object.defineProperty(user, 'id', {
    value: 12345,
    writable: false,     // Read-only
    enumerable: true,    // Shows in keys
    configurable: false  // Cannot delete or redefine
});

// 2. Accessor Descriptor
let internalAge = 25;
Object.defineProperty(user, 'age', {
    get() {
        console.log('Accessing age...');
        return internalAge;
    },
    set(val) {
        if (val < 0) throw new Error('Invalid age');
        console.log('Updating age...');
        internalAge = val;
    },
    enumerable: true,
    configurable: true
});

// 3. Hidden Property
Object.defineProperty(user, 'secret', {
    value: 'shhh',
    enumerable: false, // Hidden from loops
    writable: true
});

// --- TEST SUITE ---
if (require.main === module) {
    console.log('--- Property Descriptors ---');

    console.log('User:', user); // { id: 12345, age: [Getter/Setter] } (secret hidden)

    // Writable Check
    try {
        user.id = 99999;
    } catch (e) {
        console.log('Error writing to ID (Strict mode would throw)');
    }
    console.log('ID after write attempt:', user.id); // Should be 12345

    // Enumerable Check
    console.log('Keys:', Object.keys(user)); // ['id', 'age'] (secret missing)
    console.log('Secret access:', user.secret); // 'shhh' (still accessible)

    // Configurable Check
    delete user.id;
    console.log('ID after delete attempt:', user.id); // Still 12345

    // Getter/Setter
    user.age = 30; // 'Updating age...'
    console.log('Current age:', user.age); // 'Accessing age...' -> 30
}

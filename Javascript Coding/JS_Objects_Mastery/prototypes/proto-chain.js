/**
 * JS Objects Mastery: Prototype Chain
 *
 * Concepts:
 * - __proto__ vs prototype (The Great Confusion)
 * - Object.getPrototypeOf / setPrototypeOf
 * - Manual inheritance
 * - Custom instanceof check
 */

// 1. The Parent (Prototype)
const grandParents = {
    asset: 'House',
    surname: 'Doe'
};

// 2. The Child
const parents = Object.create(grandParents);
parents.car = 'Sedan';

// 3. The Grandchild
const me = {
    name: 'Junior'
};

// Manually link me -> parents
// Modern way: Object.setPrototypeOf (Slow but standard)
Object.setPrototypeOf(me, parents);

// --- Custom InstanceOf ---
// Algorithm: Walk up the chain of 'obj' looking for 'constructor.prototype'
function myInstanceOf(obj, constructor) {
    if (obj === null || typeof obj !== 'object') return false;

    let currentProto = Object.getPrototypeOf(obj);
    while (currentProto) {
        if (currentProto === constructor.prototype) {
            return true;
        }
        currentProto = Object.getPrototypeOf(currentProto);
    }
    return false;
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('--- Prototype Chain ---');

    console.log('Hierarchy: me -> parents -> grandParents -> Object.prototype -> null');
    console.log('Has name?', me.name);          // Junior (Own)
    console.log('Has car?', me.car);            // Sedan (Parent)
    console.log('Has surname?', me.surname);    // Doe (Grandparent)
    console.log('Has toString?', me.toString);  // Function (Object.prototype)

    // Verification
    console.log('Proto of me is parents?', Object.getPrototypeOf(me) === parents);

    // Testing myInstanceOf
    function Dog() { }
    const d = new Dog();

    console.log('--- Custom instanceof ---');
    console.log('d instanceof Dog?', myInstanceOf(d, Dog)); // true
    console.log('d instanceof Object?', myInstanceOf(d, Object)); // true
    console.log('me instanceof Dog?', myInstanceOf(me, Dog)); // false
}

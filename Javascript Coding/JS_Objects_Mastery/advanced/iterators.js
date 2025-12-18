/**
 * JS Objects Mastery: Iterators & Generators
 *
 * Objects are not iterable by default (no for..of).
 * We can make them iterable by implementing Symbol.iterator.
 */

// 1. Making an Object Iterable
const range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ };
        } else {
            return { done: true };
        }
    }
};

// 2. Using Generator (Easier syntax)
const team = {
    lead: 'Alice',
    devs: ['Bob', 'Charlie'],

    *[Symbol.iterator]() {
        yield this.lead;
        for (const dev of this.devs) {
            yield dev;
        }
    }
};

// --- TEST SUITE ---
if (require.main === module) {
    console.log('--- Iterators ---');

    console.log('Range 1..5:');
    for (const num of range) {
        console.log(num); // 1, 2, 3, 4, 5
    }

    console.log('--- Generator ---');
    console.log('Team Members:');
    for (const member of team) {
        console.log(member); // Alice, Bob, Charlie
    }

    console.log('Spread syntax works too:', [...team]);
}

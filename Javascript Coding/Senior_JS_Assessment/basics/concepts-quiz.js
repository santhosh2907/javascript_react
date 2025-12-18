/**
 * Senior JS Assessment: Concepts Quiz
 * 
 * Candidates should predict the output of these snippets.
 * This file serves as a runner to verify the answers.
 */

// 1. Hoisting & Scope (TDZ)
function testHoisting() {
    console.log('--- Hoisting Test ---');

    // var is hoisted, initialized with undefined
    console.log(typeof a); // 'undefined'
    var a = 1;

    // let is hoisted but in TDZ (Temporal Dead Zone)
    try {
        console.log(typeof b);
    } catch (e) {
        console.log('Error accessing let variable before init (TDZ)'); // Correct
    }
    let b = 2;
}

// 2. Closure in Loops
function testClosure() {
    console.log('--- Closure Test ---');
    const results = [];

    // var has function scope, loop variable 'i' is shared
    for (var i = 0; i < 3; i++) {
        results.push(() => i);
    }

    // let has block scope, loop variable 'j' is fresh per iteration
    const resultsLet = [];
    for (let j = 0; j < 3; j++) {
        resultsLet.push(() => j);
    }

    // Verification
    const varRes = results.map(f => f());
    console.assert(varRes.every(val => val === 3), 'var loop should capture final value');

    const letRes = resultsLet.map(f => f());
    console.assert(letRes[0] === 0 && letRes[2] === 2, 'let loop should capture block value');
}

// 3. 'this' Context
function testThis() {
    console.log('--- This Context Test ---');

    const obj = {
        value: 42,
        regularFn: function () { return this.value; },
        arrowFn: () => this.value, // 'this' captured from lexical scope (module/global)
    };

    console.assert(obj.regularFn() === 42, 'Regular method has obj context');
    console.assert(obj.arrowFn() === undefined, 'Arrow function should NOT have obj context');

    const detached = obj.regularFn;
    // In strict mode (modules), 'this' is undefined in detached calls
    try {
        detached();
    } catch (e) {
        console.log('Detached method loses context (or strict mode throws)');
    }
}

// 4. Coercion
function testCoercion() {
    console.log('--- Coercion Test ---');

    console.assert(('b' + 'a' + + 'a' + 'a').toLowerCase() === 'banana', 'ba + NaN + a -> banana');
    console.assert([] == ![], '[] == false -> 0 == 0 -> true');
    console.assert(null != 0, 'null is only loosely equal to undefined');
}

// --- RUNNER ---
if (require.main === module) {
    testHoisting();
    testClosure();
    testThis();
    testCoercion();
    console.log('All Conceptual Tests Passed/Verified!');
}

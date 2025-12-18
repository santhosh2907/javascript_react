/**
 * Senior JS Assessment: Function Composition (Pipe & Compose)
 *
 * Constraint: NO built-in array methods (reduce, reduceRight). 
 * Use loops.
 */

// Right-to-Left execution
const compose = (...fns) => (initialValue) => {
    let result = initialValue;
    // Loop backwards
    for (let i = fns.length - 1; i >= 0; i--) {
        result = fns[i](result);
    }
    return result;
};

// Left-to-Right execution
const pipe = (...fns) => (initialValue) => {
    let result = initialValue;
    for (let i = 0; i < fns.length; i++) {
        result = fns[i](result);
    }
    return result;
};

// Async Pipe (Sequential)
const pipeAsync = (...fns) => async (initialValue) => {
    let result = initialValue;
    for (let i = 0; i < fns.length; i++) {
        // Wait for the previous result before passing to next function
        // Result might be a promise or value, await handles both
        result = await fns[i](result);
    }
    return result;
};

// --- TEST SUITE ---
if (require.main === module) {
    console.log('Running Composition Tests (Manual Loops)...');

    const add2 = (x) => x + 2;
    const double = (x) => x * 2;

    // Compose: double(add2(5)) -> 7 * 2 = 14
    const composed = compose(double, add2);
    console.assert(composed(5) === 14, 'Compose should work right-to-left');

    // Pipe: add2(5) -> 7 -> double(7) -> 14
    const piped = pipe(add2, double);
    console.assert(piped(5) === 14, 'Pipe should work left-to-right');

    // Async Pipe
    const asyncDouble = async (x) => {
        return new Promise(resolve => setTimeout(() => resolve(x * 2), 10));
    };

    (async () => {
        const asyncPiped = pipeAsync(add2, asyncDouble);
        const result = await asyncPiped(5); // (5+2)*2 = 14
        console.assert(result === 14, 'Async Pipe should handle promises');
        console.log('Tests Passed!');
    })();
}

module.exports = { compose, pipe, pipeAsync };

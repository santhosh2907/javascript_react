/**
 * Senior JS Assessment: Debounce & Throttle
 *
 * Challenge: Implement `debounce` and `throttle` with support for `leading` and `trailing` execution options.
 *
 * What we look for:
 * - Timer management.
 * - Correct context (`this`) and argument passing.
 * - Handling complexity of leading/trailing calls.
 */

function debounce(func, wait, { leading = false } = {}) {
    let timeout;

    return function (...args) {
        const context = this;
        const callNow = leading && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = null;
            if (!leading) {
                func.apply(context, args);
            }
        }, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
}

function throttle(func, wait) {
    let inThrottle;
    let lastFn;
    let lastTime;

    return function (...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if (Date.now() - lastTime >= wait) {
                    func.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('Running Debounce/Throttle Tests...');

    const log = (msg) => console.log(Date.now(), msg);

    const debounced = debounce(() => log('Debounced!'), 100);
    debounced();
    debounced();
    debounced(); // Should only fire once after 100ms

    const throttled = throttle(() => log('Throttled!'), 100);
    throttled();
    setTimeout(throttled, 50); // Should be ignored/delayed
    setTimeout(throttled, 120); // Should fire
}

module.exports = { debounce, throttle };

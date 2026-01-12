/**
 * 05_signature_examples.js
 * 
 * Demonstrating the specific overrides and optional arguments found in signatures.
 */

// --- 1. Array.from(items, mapFn, thisArg) ---
console.log("\n--- Array.from Overloads ---");

const set = new Set([1, 2, 3]);

// A. Standard: Array.from(items)
console.log("Standard:", Array.from(set));

// B. With Map: Array.from(items, mapFn)
console.log("With Map:", Array.from(set, x => x * 2));

// C. With thisArg: Array.from(items, mapFn, thisArg)
const multiplier = { factor: 10 };
const result = Array.from(set, function (x) {
    return x * this.factor;
}, multiplier);
console.log("With thisArg:", result); // [10, 20, 30]


// --- 2. copyWithin(target, start, end) ---
console.log("\n--- copyWithin Overloads ---");

const arr1 = ['a', 'b', 'c', 'd', 'e'];

// A. copyWithin(target, start) -> Copies everything starting from 'start' to 'target'
// Target: Index 0 ('a'), Source Start: Index 3 ('d') -> Copies 'd','e' to index 0,1
console.log("2 args:", [...arr1].copyWithin(0, 3)); // ['d', 'e', 'c', 'd', 'e']

// B. copyWithin(target, start, end)
// Target: Index 1 ('b'), Source: Index 3 to 4 ('d' only)
console.log("3 args:", [...arr1].copyWithin(1, 3, 4)); // ['a', 'd', 'c', 'd', 'e']


// --- 3. every(callbackFn, thisArg) ---
console.log("\n--- every Overloads ---");

const nums = [10, 20, 30];
const limit = { min: 5 };

// Using 'thisArg' inside callback
const allAboveMin = nums.every(function (n) {
    return n > this.min;
}, limit);

console.log("All above min (5)?", allAboveMin); // true


// --- 4. fill(value, start, end) ---
console.log("\n--- fill Overloads ---");

const empty = new Array(5);

// fill(value)
console.log("1 arg:", [...empty].fill(0));

// fill(value, start)
console.log("2 args:", [...empty].fill(0, 2)); // [empty, empty, 0, 0, 0]

// fill(value, start, end)
console.log("3 args:", [...empty].fill(0, 1, 3)); // [empty, 0, 0, empty, empty]


// --- 5. reduce(callback, initialValue) ---
console.log("\n--- reduce Overloads ---");

const list = [1, 2, 3];

// Without initialValue: Accumulator starts as Index 0 (1), Current starts at Index 1 (2)
const sum1 = list.reduce((acc, curr) => {
    console.log(`[No Init] Acc: ${acc}, Curr: ${curr}`);
    return acc + curr;
});
console.log("Sum1:", sum1);

// With initialValue: Accumulator starts as Init (100), Current starts at Index 0 (1)
const sum2 = list.reduce((acc, curr) => {
    console.log(`[With Init] Acc: ${acc}, Curr: ${curr}`);
    return acc + curr;
}, 100);
console.log("Sum2:", sum2);


// --- 6. toLocaleString(locales, options) ---
console.log("\n--- toLocaleString Overloads ---");

const prices = [1000, 2000.5, 5000];
const dates = [new Date('2024-01-01'), new Date('2024-12-25')];

// A. Standard (Browser Default)
console.log("Standard:", prices.toLocaleString());

// B. With Locales (e.g., German uses comma for decimals)
console.log("German (de-DE):", prices.toLocaleString('de-DE'));

// C. With Locales & Options (Currency)
const currencyOptions = { style: 'currency', currency: 'USD' };
console.log("USD Currency:", prices.toLocaleString('en-US', currencyOptions));
// Expected: "$1,000.00, $2,000.50, $5,000.00"

// D. Mixed Types (Dates working efficiently)
const dateOptions = { month: 'long', year: 'numeric' };
console.log("Dates:", dates.toLocaleString('en-US', dateOptions));
// Expected: "January 2024, December 2024"

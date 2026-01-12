/**
 * 02_deep_copy_json.js
 * 
 * The "Poor Man's Deep Clone": JSON.parse(JSON.stringify(obj))
 * It breaks the references completely, but at what cost?
 */

const complexObject = {
    name: "Santhosh",
    joinedAt: new Date(),        // Special Type: Date
    sayHello: function () {       // Function
        console.log("Hello!");
    },
    symbol: Symbol("id"),        // Symbol
    val: undefined,              // undefined
    num: NaN,                    // NaN
    infinity: Infinity,          // Infinity
    details: {
        level: 1
    }
};

console.log("--- 1. Original Object ---");
console.log(complexObject);

// The Deep Copy
const jsonCopy = JSON.parse(JSON.stringify(complexObject));

console.log("\n--- 2. JSON Deep Copy Result ---");
console.log(jsonCopy);

console.log("\n--- 3. Analysis of Data Loss ---");

// 1. Nested Mutation Check (Success!)
jsonCopy.details.level = 99;
console.log("Original Level:", complexObject.details.level); // 1 (Safe!)
console.log("Copy Level:    ", jsonCopy.details.level);     // 99

// 2. Date Object -> String (FAIL) ❌
console.log("Date Type:", typeof jsonCopy.joinedAt); // 'string' (Not a Date object anymore)

// 3. Function -> Gone (FAIL) ❌
console.log("Function:", jsonCopy.sayHello); // undefined

// 4. Undefined -> Gone (FAIL) ❌
console.log("Undefined:", 'val' in jsonCopy); // false

// 5. Symbol -> Gone (FAIL) ❌
console.log("Symbol:", 'symbol' in jsonCopy); // false

// 6. NaN / Infinity -> null (FAIL) ❌
console.log("NaN becomes:", jsonCopy.num);       // null
console.log("Infinity becomes:", jsonCopy.infinity); // null

/**
 * CONCLUSION:
 * JSON hack is okay for simple data (API responses),
 * but dangerous for application state containing Rich Types.
 */

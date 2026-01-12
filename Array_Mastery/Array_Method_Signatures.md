# JavaScript Array Method Signatures

## Static Methods

**Array.from()**
> Creates a new Array from an array-like or iterable object.
```javascript
Array.from(arrayLike)
// Array.from('foo') -> ["f", "o", "o"]

Array.from(arrayLike, mapFn)
// Array.from([1, 2], x => x + x) -> [2, 4]

Array.from(arrayLike, mapFn, thisArg)
// Array.from([1], function(x){ return x + this.v }, {v: 1}) -> [2]
```

**Array.of()**
> Creates a new Array instance with a variable number of arguments.
```javascript
Array.of(element0)
// Array.of(7) -> [7]

Array.of(element0, element1, /* ... ,*/ elementN)
// Array.of(1, 2, 3) -> [1, 2, 3]
```

**Array.isArray()**
> Returns true if the argument is an array.
```javascript
Array.isArray(value)
// Array.isArray([1, 2]) -> true
// Array.isArray({foo: 123}) -> false
```

---

## Instance Methods: Access & Search

**at()**
> Takes an integer value and returns the item at that index. Support relative indexing (negative).
```javascript
at(index)
// ['a', 'b', 'c'].at(-1) -> 'c'
```

**find()**
> Returns the first element in the provided array that satisfies the testing function.
```javascript
find(callbackFn)
// [5, 12, 8].find(x => x > 10) -> 12

find(callbackFn, thisArg)
// [5, 12].find(function(x) { return x > this.min }, {min: 10}) -> 12
```

**findIndex()**
> Returns the index of the first element in the array that matches the test.
```javascript
findIndex(callbackFn)
// [5, 12, 8].findIndex(x => x > 10) -> 1

findIndex(callbackFn, thisArg)
```

**includes()**
> Determines whether an array includes a certain value.
```javascript
includes(searchElement)
// [1, 2, 3].includes(2) -> true

includes(searchElement, fromIndex)
// [1, 2, 3].includes(2, 2) -> false (Search starts at index 2)
```

**indexOf()**
> Returns the first index at which a given element can be found.
```javascript
indexOf(searchElement)
// [2, 9, 9].indexOf(2) -> 0

indexOf(searchElement, fromIndex)
// [2, 9, 9].indexOf(2, 2) -> -1
```

---

## Instance Methods: Mutation

**push()**
> Adds elements to the end. Returns new length.
```javascript
push(element0)
// arr.push(1) -> returns 1

push(element0, element1, /* ... ,*/ elementN)
// ['a'].push('b', 'c') -> returns 3, arr is ['a', 'b', 'c']
```

**pop()**
> Removes the last element. Returns that element.
```javascript
pop()
// ['a', 'b', 'c'].pop() -> 'c'
```

**unshift()**
> Adds elements to the front. Returns new length.
```javascript
unshift(element0)
// arr.unshift(1)

unshift(element0, element1, /* ... ,*/ elementN)
// ['a'].unshift('b', 'c') -> returns 3, arr is ['b', 'c', 'a']
```

**shift()**
> Removes the first element. Returns that element.
```javascript
shift()
// ['a', 'b', 'c'].shift() -> 'a'
```

**splice()**
> Changes the contents of an array by removing or replacing existing elements.
```javascript
splice(start)
// ['a', 'b', 'c'].splice(1) -> returns ['b', 'c'], arr is ['a']

splice(start, deleteCount)
// ['a', 'b', 'c'].splice(1, 1) -> returns ['b'], arr is ['a', 'c']

splice(start, deleteCount, item1, /*...*/)
// ['a', 'b', 'c'].splice(1, 1, 'x') -> returns ['b'], arr is ['a', 'x', 'c']
```

**fill()**
> Changes all elements in an array to a static value.
```javascript
fill(value)
// [1, 2, 3].fill(4) -> [4, 4, 4]

fill(value, start)
// [1, 2, 3].fill(4, 1) -> [1, 4, 4]

fill(value, start, end)
// [1, 2, 3].fill(4, 1, 2) -> [1, 4, 3]
```

**copyWithin()**
> Shallow copies part of an array to another location in the same array.
```javascript
copyWithin(target, start)
// ['a', 'b', 'c', 'd'].copyWithin(0, 2) -> ['c', 'd', 'c', 'd']

copyWithin(target, start, end)
// ['a', 'b', 'c', 'd'].copyWithin(0, 2, 3) -> ['c', 'b', 'c', 'd']
```

**sort()**
> Sorts elements in place.
```javascript
sort()
// [2, 10, 1].sort() -> [1, 10, 2] (String sort!)

sort(compareFn)
// [2, 10, 1].sort((a,b) => a-b) -> [1, 2, 10] (Numeric sort)
```

**reverse()**
> Reverses an array in place.
```javascript
reverse()
// [1, 2, 3].reverse() -> [3, 2, 1]
```

---

## Instance Methods: Transformation (Return New Array)

**map()**
> Creates a new array populated with the results of calling a provided function.
```javascript
map(callbackFn)
// [1, 2].map(x => x * 2) -> [2, 4]

map(callbackFn, thisArg)
```

**filter()**
> Creates a shallow copy of a portion of a given array.
```javascript
filter(callbackFn)
// [1, 2, 3].filter(x => x > 1) -> [2, 3]

filter(callbackFn, thisArg)
```

**slice()**
> Returns a shallow copy of a portion of an array.
```javascript
slice()
// Copies entire array

slice(start)
// ['a', 'b', 'c'].slice(1) -> ['b', 'c']

slice(start, end)
// ['a', 'b', 'c'].slice(1, 2) -> ['b']
```

**concat()**
> Merges two or more arrays.
```javascript
concat(value0)
// ['a'].concat('b') -> ['a', 'b']

concat(value0, value1)
// ['a'].concat(['b'], ['c']) -> ['a', 'b', 'c']
```

**flat()**
> Creates a new array with all sub-array elements concatenated recursively.
```javascript
flat()
// [1, [2, 3]].flat() -> [1, 2, 3]

flat(depth)
// [1, [2, [3]]].flat(2) -> [1, 2, 3]
```

**flatMap()**
> Returns a new array formed by applying a callback function to each element.
```javascript
flatMap(callbackFn)
// [1, 2].flatMap(x => [x, x * 2]) -> [1, 2, 2, 4]
```

---

## Instance Methods: Iteration

**forEach()**
> Executes a provided function once for each array element.
```javascript
forEach(callbackFn)
// ['a', 'b'].forEach(x => console.log(x))
```

**reduce()**
> Executes a reducer function on each element (left-to-right).
```javascript
reduce(callbackFn)
// [1, 2, 3].reduce((acc, cur) => acc + cur) -> 6

reduce(callbackFn, initialValue)
// [1, 2, 3].reduce((acc, cur) => acc + cur, 10) -> 16
```

**reduceRight()**
> Executes a reducer function on each element (right-to-left).
```javascript
reduceRight(callbackFn)
// ['a', 'b', 'c'].reduceRight((acc, cur) => acc + cur) -> 'cba'
```

**some()**
> Tests whether at least one element passes the test.
```javascript
some(callbackFn)
// [1, 2, 3].some(x => x > 2) -> true
```

**every()**
> Tests whether ALL elements pass the test.
```javascript
every(callbackFn)
// [1, 2, 3].every(x => x > 2) -> false
```

---

## Instance Methods: Utilities

**join()**
> Returns a new string by concatenating all elements.
```javascript
join()
// ['a', 'b'].join() -> "a,b"

join(separator)
// ['a', 'b'].join('-') -> "a-b"
```

**toString()**
> Returns a string representing the specified array and its elements.
```javascript
toString()
// [1, 2, 'a'].toString() -> "1,2,a"
```

**toLocaleString()**
> Returns a localized string representing the elements of the array.
```javascript
toLocaleString() // Standard
// [1000, new Date()].toLocaleString() -> "1,000, 1/1/2024..."

toLocaleString(locales)
// [1000.5].toLocaleString('de-DE') -> "1.000,5"

toLocaleString(locales, options)
// [1000].toLocaleString('en-US', {style: 'currency', currency: 'USD'}) -> "$1,000.00"
```

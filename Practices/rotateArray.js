input: [1,2,3,4,5], k = 2
output: [4,5,1,2,3]

function rotateArray(arr, k) {
    return arr.slice(-k).concat(arr.slice(0, arr.length - k))

}
console.log(rotateArray([1,2,3,4,5], 2))



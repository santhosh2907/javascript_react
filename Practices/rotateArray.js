input: [1,2,3,4,5], k = 2
output: [4,5,1,2,3]

function rotateArray(arr, k) {
    return arr.slice(-k).concat(arr.slice(0, arr.length - k))

}
console.log(rotateArray([1,2,3,4,5], 2))



function rotateArray(arr, k) {
  const n = arr.length;
  k = k % n; // handle large k
  const result = [];
  

  // take last k elements
  for (let i = n - k; i < n; i++) {
    result.push(arr[i]);
  }
  console.log(result)

  // take remaining elements
  for (let i = 0; i < n - k; i++) {
    result.push(arr[i]);
  }
  console.log(result)

//   return result;
}

console.log(rotateArray([1,2,3,4,5], 2));

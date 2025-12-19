//Not: Math formaula was sum = N * (N+1)/2

//1. Find the missing values from 1 to N
function findMissingValues(arr) {
    let n = arr.length + 1;
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    let result = (n * (n + 1)) / 2;
    return result - sum;

}
console.log(findMissingValues([1, 2, 3, 5, 6, 7, 8]));


//2. Find the missing values from 1 to N in non sequential order
function findMissingNumbers(arr) {
  let result = [];

  for (let i = 0; i < arr.length - 1; i++) {
    let current = arr[i];
    let next = arr[i + 1];

    // check numbers between current and next
    for (let num = current + 1; num < next; num++) {
      result.push(num);
    }
  }

  return result;
}

console.log(findMissingNumbers([1, 2, 4, 6, 8, 10]));

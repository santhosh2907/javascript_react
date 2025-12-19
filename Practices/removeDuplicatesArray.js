//Method 1
// function removeDuplicates(arr) {
//     return arr.filter((val, index, array) => {
//         return array.indexOf(val) === index;
//     });
// }
// console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));


//Method 2
function removingDupliactes(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        let isDuplicate = false;
        for (let j = 0; j < result.length; j++) {
            if (arr[i] === result[j]) {
                isDuplicate = true;
                break
            }
        }
        if (!isDuplicate) {
            result.push(arr[i]);
        }
    }
    return result;
}


console.log(removingDupliactes([1, 2, 2, 3, 4, 4, 5]))

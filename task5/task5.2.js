'use strict';

// O(n)

const chunkArray = function (arr, size) {
    if (arr.length === 0 || size <= 0) {
        return arr;
    }

    const chunkedArray = [];
    let index = 0;

    while (index < arr.length) {
        chunkedArray.push(arr.slice(index, index + size));
        index += size;
    }

    return chunkedArray;
}

console.log(chunkArray([1, 2, 3, 4, 5], 1));    // [[1], [2], [3], [4], [5]]
console.log(chunkArray([1, 2, 3, 4, 5], 2));    // [[1, 2], [3, 4], [5]]
console.log(chunkArray([1, 2, 3, 4, 5], -1));   // [1, 2, 3, 4, 5]
console.log(chunkArray([], 5));                 // []

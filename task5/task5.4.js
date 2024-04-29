'use strict';

const getArrayIntersection = function (arr1, arr2) {
    const intersectedArray = [];

    for (const el of arr2) {
        if (arr1.includes(el)) {
            intersectedArray.push(el);
        }
    }

    return intersectedArray;
};

const getArrayUnion = function (arr1, arr2) {
    const unionArray = [...arr1];

    for (const el of arr2) {
        if (!arr1.includes(el)) {
            unionArray.push(el);
        }
    }

    return unionArray;
};

console.log(getArrayIntersection([1, 2, 3, 4], [3, 4, 5, 6]));          // [3, 4]
console.log(getArrayIntersection([1, 2, 3, 3, 4], [3, 3, 4, 5, 6]));    // [3, 3, 4]
console.log(getArrayUnion([1, 2, 3, 4], [3, 4, 5, 6]));                 // [1, 2, 3, 4, 5, 6]
'use strict';

function measureArrayPerformance(fn, arr) {
    const start = performance.now();
    fn(arr);
    const end = performance.now();
    return Number((end - start).toFixed(4));
}

const mapFn = x => x * 2;

const customMapFn = function (fn, arr) {
    const mappedArr = [];
    arr.forEach((el) => {
        let result = fn(el);
        mappedArr.push(result);
    });
    return mappedArr;
};

const filterFn = x => x > 4;

const customFilterFn = function (fn, arr) {
    const filteredArr = [];
    arr.forEach((el) => {
        let result = fn(el);

        if (result) {
            filteredArr.push(el);
        }
    });
    return filteredArr;
};

const sortFn = arr => [...arr].sort((a, b) => a - b);

const customSortFn = function (arr) {
    const arrCopy = [...arr];
    for (let i = 0; i < arrCopy.length - 1; i++) {
        for (let j = 0; j < arrCopy.length - 1 - i; j++) {
            if (arrCopy[j] > arrCopy[j + 1]) {
                const temp = arrCopy[j];
                arrCopy[j] = arrCopy[j + 1];
                arrCopy[j + 1] = temp;
            }
        }
    }
    return arrCopy;
};

console.log(measureArrayPerformance(mapFn, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(measureArrayPerformance(arr => customMapFn(x => x * 2, arr), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

console.log(measureArrayPerformance(filterFn, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(measureArrayPerformance(arr => customFilterFn(x => x > 4, arr), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

console.log(measureArrayPerformance(sortFn, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
console.log(measureArrayPerformance(arr => customSortFn(arr), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

'use strict';

const lazyMapHelper = function (arr, cb) {
    let i = 0;

    return () => {
        if (i < arr.length) {
            return {value: cb(arr[i++]), done: false};
        } else {
            return {done: true};
        }
    };
};

const lazyMap = function (arr, cb) {
    const mappedArray = [];
    let value;

    const mapFunc = lazyMapHelper(arr, cb);

    while (true) {
        value = mapFunc();
        if (value.done) {
            break;
        }
        mappedArray.push(value.value);
    }

    return mappedArray;
};

const fibonacciGeneratorHelper = function (n) {
    let a = 0;
    let b = 1;
    let i = 0;

    return () => {
        if (i < n + 1) {
            const result = a;
            [a, b] = [b, a + b];
            i++;
            return {value: result, done: false};
        } else {
            return {done: true};
        }
    };
};

const fibonacciGenerator = function (n) {
    let result = [];
    let fbh;

    const fgFn = fibonacciGeneratorHelper(n);

    while (true) {
        fbh = fgFn();
        if (fbh.done) {
            break;
        }
        result.push(fbh.value);
    }

    return result.toString();
};

console.log(lazyMap([1, 2, 3, 4], x => x + 'lm'));      // [ '1lm', '2lm', '3lm', '4lm' ]

console.log(fibonacciGenerator(8));     // 0,1,1,2,3,5,8,13,21

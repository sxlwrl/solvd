'use strict';

function multiply(a, b, c) {
    return a * b * c;
}

const curry = function (fn, arity) {
    return function next(...args) {
        return args.length >= arity ? fn(...args) : (...nextArgs) => next(...args, ...nextArgs)
    };
};

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2);
const step2 = step1(3);
const result = step2(4);

console.log("Result:", result); // 24
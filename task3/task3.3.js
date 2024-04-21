'use strict';

const createCounter = function () {
    let counter = 0;

    return () => ++counter;
};

const repeatFunction = function (fn, num) {
    return () => {
        if (num >= 0) {
            for (let i = 0; i < num; i++) {
                fn();
            }
        } else {
            while (true) {
                fn();
            }
        }
    };
};

const counter = createCounter();

console.log(counter());     // 1
console.log(counter());     // 2
console.log(counter());     // 3
console.log(counter());     // 4
console.log(counter());     // 5

console.log();

const repeatFunc1 = repeatFunction(() => console.log(1), 10);
const repeatFunc2 = repeatFunction(() => console.log(1), -10);

repeatFunc1();      // print 1 (10 times)
repeatFunc2();      // Infinite loop

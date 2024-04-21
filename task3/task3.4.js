'use strict';

const factorialHelper = function (number, total) {
    if (number === 0 || number === 1) {
        return total;
    } else {
        return factorialHelper(number - 1, total * number);
    }
}

const calculateFactorial = function (number) {
    try {
        if (number < 0) {
            throw new Error('The number must be positive');
        }

        return factorialHelper(number, 1);
    } catch (err) {
        return err.message;
    }
};

const power = function (base, exp) {
    if (base === 0) {
        return 0;
    }

    if (base === 1) {
        return 1;
    }

    if (exp === 0) {
        return 1;
    }

    return base * power(base, exp - 1);
}

console.log(calculateFactorial(5));     // 120
console.log(calculateFactorial(1));     // 1
console.log(calculateFactorial(-3));    // Error

console.log(power(2, 3));   // 8
console.log(power(-3, 3));  // -27
console.log(power(1, 3));   // 1


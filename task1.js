const checkType = function (val) {
    if (typeof val !== 'string') {
        throw new Error('Invalid argument type');
    }
};

const checkValue = function (val1, val2) {
    if (Number.isNaN(+val1) || Number.isNaN(+val2)) {
        throw new Error('Invalid number');
    }
};

const checkIsPositive = function (val1, val2) {
    if (parseInt(val1) < 0 || parseInt(val2) < 0) {
        throw new Error('An argument is less then 0');
    }
};

String.prototype.plus = function (str) {
    try {
        checkType(str);
        checkValue(this, str);
        checkIsPositive(this, str);

        /*
            1. Select the largest number by length
            2. Loop through the length of the largest number
                a. Choose the last digit of both numbers
                b. Calculate the sum of two numbers with a remainder
                c. Add the last digit of the calculated sum to the beginning of the resulted string
                d. Find a new remainder
            3. Check if the remainder is greater than 0
            4. If the result starts with 0 -> replace them with an empty string with RegEx
         */

        let result = '';
        let remainder = 0;
        let biggestLength = Math.max(this.length, str.length);

        for (let i = 1; i <= biggestLength; i++) {
            const lastDigitFirst = parseInt(this[this.length - i] || 0);
            const lastDigitSecond = parseInt(str[str.length - i] || 0);
            const sum = lastDigitFirst + lastDigitSecond + remainder;
            result = (sum % 10) + result;
            remainder = Math.floor(sum / 10);
        }

        if (remainder > 0) {
            result = remainder + result;
        }

        return result.replace(/^0+(?=\d)/, '');
    } catch (err) {
        return err.message;
    }
};

String.prototype.minus = function (str) {
    try {
        checkType(str);
        checkValue(this, str);
        checkIsPositive(this, str);

        if (parseInt(this) < parseInt(str)) {
            throw new Error('The first argument is less than the second');
        }

        /*
            1. Select the biggest number in length
            2. Loop through the length of the biggest number
                a. Select the last digit of both numbers
                b. Calculate a subtraction of two digits with remainder
                c. If subtraction less than 0 -> add 10 and set remainder to 1, else -> set remainder to 0
                d. Push the digit to the beginning of the resulted string
            3. Check if remainder is greater than 0
            4. If the result starts with 0 -> replace them with an empty string
         */

        let result = '';
        let remainder = 0;
        let biggestLength = Math.max(this.length, str.length);

        for (let i = 1; i <= biggestLength; i++) {
            const digitFirst = parseInt(this[this.length - i] || 0);
            const digitSecond = parseInt(str[str.length - i] || 0);
            let sub = digitFirst - digitSecond - remainder;
            if (sub < 0) {
                sub += 10;
                remainder = 1;
            } else {
                remainder = 0;
            }
            result = sub + result;
        }

        if (remainder > 0) {
            result = remainder + result;
        }

        return result.replace(/^0+(?=\d)/, '');
    } catch (err) {
        return err.message;
    }
};

String.prototype.divide = function (str) {
    try {
        checkType(str);
        checkValue(this, str);
        checkIsPositive(this, str);

        if (parseInt(str) === 0) {
            throw new Error('Division by zero error');
        }

        /*
            1. Loop through the dividend length
            2. Take a first digit from dividend
            3. Initialize a quotient
            4. Check if part of the dividend is higher than the divisor
                a. If yes - subtract the divisor from the dividend part and increment the quotient digit counter
                    Repeat till the dividend part is higher than the divisor
            3. Add the quotient digit to the result string (If dividend part is less than the divisor - 0)
            4. Cut all zeros from the beginning of the result string
         */

        let result = '';
        let dividendPart = '';

        for (let i = 0; i < this.length; i++) {
            dividendPart += this[i];
            let quotient = 0;

            while (parseInt(dividendPart) >= parseInt(str)) {
                dividendPart = dividendPart.minus(str);
                quotient++;
            }

            result += quotient.toString();
        }
        return result.replace(/^0+(?=\d)/, '');
    } catch (err) {
        return err.message;
    }
};

String.prototype.multiply = function(str) {
    try {
        checkType(str);
        checkValue(this, str);
        checkIsPositive(this, str);

        if (parseInt(this) === 0 || parseInt(str) === 0) {
            return '0';
        }

        /*
            1. Loop through the first number
            2. Create a new loop through the second number inside the first element
            3. Multiply two digits on each iteration and calculate remainder on that step
            4. Check if there is an excess remainder. If yes - add it to the beginning of iteration resulted string
            5. Make a shift with zeros at the end
            6. Add previous result with current
            7. Cut all zeros from the beginning of the result string
         */

        let result = '';

        for (let i = this.length - 1; i >= 0; i--) {
            let iterationResult = '';
            let remainder = 0;

            for (let j = str.length - 1; j >= 0; j--) {
                const mult = parseInt(this[i]) * parseInt(str[j]) + remainder;
                iterationResult = (mult % 10) + iterationResult;
                remainder = Math.floor(mult / 10);
            }

            if (remainder > 0) {
                iterationResult = remainder + iterationResult;
            }

            iterationResult += '0'.repeat(this.length - 1 - i);
            result = result.plus(iterationResult);
        }

        return result.replace(/^0+/, '');
    }
    catch (err) {
        return err.message;
    }
};

console.log('2512487'.plus('399103'));  // 2911590
console.log('00'.plus('0'));    // 0
console.log('5'.plus('55'));    // 60
console.log('82'.plus('-1'));   // Error
console.log('82'.plus(true));   // Error
console.log('5'.plus('true'));  // Error

console.log();

console.log('2512487'.minus('991083'));     // 1521404
console.log('02512487'.minus('0002512484'));    // 3
console.log('90999999999999999999999999099999999999999999999999'.minus('90999999999999999999999999099999999999999999999984'));  // 15
console.log('90999999999999999999999999099999999999999999999999'.minus('890999999999999999999999999099999999999999999999999')); // Error
console.log('-890999999999999999999999999099999999999999999999999'.minus('890999999999999999999999999099999999999999999999999')); // Error
console.log('1'.minus(true));   // Error
console.log('1'.minus('true')); // Error

console.log();

console.log('17328'.divide('38'));  // 456
console.log('5'.divide('5'));       // 1
console.log('8582821124'.divide('256'));    // 33526645
console.log('90999999999999999999999999099999999999999999999999'.divide('3'));      // 303(3)...0...3(3)
console.log('0'.divide('256'));     // 0
console.log('8582821124'.divide('0'));  // Error
console.log('82'.divide('-1'));     // Error
console.log('82'.divide(true));     // Error
console.log('true'.divide('5'));    // Error

console.log();

console.log('4'.multiply('8'));     // 32
console.log('11'.multiply('554'));  // 6094
console.log('0'.multiply('2'));     // 0
console.log('90999999999999999999999999099999999999999999999999'.multiply('1'));    // 909(9)...0...9(9)
console.log('8582821124'.multiply('0'));  // 0
console.log('82'.multiply('-1'));     // Error
console.log('82'.multiply(true));     // Error
console.log('true'.multiply('5'));    // Error



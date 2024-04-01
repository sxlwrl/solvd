String.prototype.plus = function (str) {
    try {
        if (typeof str !== 'string') {
            throw new Error('Invalid argument type');
        }

        if (Number.isNaN(+this) || Number.isNaN(+str)) {
            throw new Error('Invalid number');
        }

        if (parseInt(this) < 0 || parseInt(str) < 0) {
            throw new Error('An argument is less then 0');
        }

        /*
            1. Select the largest number by length
            2. Loop over the length of the largest number
                a. Choose the last digit of both numbers
                b. Calculate the sum of two numbers with a remainder
                c. Add the last digit of the calculated sum to the beginning of the resulted string
                d. Find a new remainder
            3. Check if the remainder is greater than 0 (in case both numbers are equal in length)
            4. If the result starts with 0 - replace them with an empty string with RegEx
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

console.log('2512487'.plus('399103'));
console.log('00'.plus('0'));
console.log('5'.plus('55'));
console.log('82'.plus('-1'));
console.log('82'.plus(true));
console.log('5'.plus('true'));

console.log();

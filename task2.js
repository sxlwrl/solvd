'use strict';

const checkType = function (value, type) {
    if (typeof value !== type) {
        throw new Error(`Argument type is not a ${type}`);
    }
}

class ConversionLibrary {
    addValues() {};
    stringifyValues() {};
    invertBoolean(value) {
        try {
            checkType(value, 'boolean');

            return !value;
        } catch (err) {
            return err.message;
        }
    };
    convertToNumber(value) {
        try {
            const parsedNumber = typeof value === 'string' ? parseFloat(value) : Number(value);

            if (Number.isNaN(parsedNumber) || !parsedNumber) {
                throw new Error('Unable to convert');
            }

            return parsedNumber;
        } catch (err) {
            return err.message;
        }
    };
    coerceToType(value, type) {
        try {
            let coertedValue;

            switch (type) {
                case 'number':
                    coertedValue = Number(value);
                    break;
                case 'string':
                    coertedValue = String(value);
                    break;
                case 'boolean':
                    coertedValue = !!value;
                    break;
                default:
                    throw new Error('Incorrect type');
            }

            return coertedValue;
        } catch (err) {
            return err.message;
        }
    };
}

const conversionLibrary = new ConversionLibrary();

console.log();

console.log(conversionLibrary.invertBoolean(true));                     // false
console.log(conversionLibrary.invertBoolean(false));                    // true
console.log(conversionLibrary.invertBoolean('1'));                      // Error
console.log(conversionLibrary.invertBoolean(502n));                     // Error
console.log(conversionLibrary.invertBoolean(Symbol('foo')));        // Error
console.log(conversionLibrary.invertBoolean(Symbol(null)));         // Error
console.log(conversionLibrary.invertBoolean(Symbol(undefined)));    // Error

console.log();

console.log(conversionLibrary.convertToNumber('5'));         // 5
console.log(conversionLibrary.convertToNumber('8.2'));       // 8.2
console.log(conversionLibrary.convertToNumber('k'));         // Error
console.log(conversionLibrary.convertToNumber(true));        // 1
console.log(conversionLibrary.convertToNumber(new Date()));        // date in ms
console.log(conversionLibrary.convertToNumber(1052468n));    // 1052468
console.log(conversionLibrary.convertToNumber(null));        // Error
console.log(conversionLibrary.convertToNumber(undefined));   // Error

console.log();

console.log(conversionLibrary.coerceToType('5', 'boolean'));         // true
console.log(conversionLibrary.coerceToType('8.2', 'number'));        // 8.2
console.log(conversionLibrary.coerceToType('k', 'number'));          // NaN
console.log(conversionLibrary.coerceToType(true, 'boolean'));        // true
console.log(conversionLibrary.coerceToType(new Date(), 'string'));         // date as a string
console.log(conversionLibrary.coerceToType(1052468n, 'string'));     // '1052468'
console.log(conversionLibrary.coerceToType(null, 'number'));         // 0
console.log(conversionLibrary.coerceToType(undefined, 'boolean'));   // false
console.log(conversionLibrary.coerceToType(undefined, 'object'));    // Error
'use strict';

const checkObjectType = function (...values) {
    values.forEach(val => {
        if (typeof val === 'object' && val !== null) {
            throw new Error('You cannot add objects');
        }
    });
}

const compareTypes = function (val1, val2) {
    if (typeof val1 !== typeof val2) {
        throw new Error('Values do not have the same type');
    }
}

class ConversionLibrary {
    addValues(value1, value2) {
        try {
            checkObjectType(value1, value2);

            compareTypes(value1, value2);

            if (typeof value1 === 'boolean' && typeof value2 === 'boolean') {
              return value1 || value2;
            }

            return value1 + value2;

        } catch (err) {
            return err.message;
        }
    };

    stringifyValue(value) {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }

        return value.toString();
    };

    invertBoolean(value) {
        try {
            if (typeof value !== 'boolean') {
                throw new Error('Argument type is not a boolean');
            }

            return !value;
        } catch (err) {
            return err.message;
        }
    };

    convertToNumber(value) {
        try {
            const parsedNumber = typeof value === 'string' ? parseFloat(value) : Number(value);

            if (Number.isNaN(parsedNumber)) {
                throw new Error('Unable to convert');
            }

            return parsedNumber;
        } catch (err) {
            return err.message;
        }
    };

    coerceToType(value, type) {
        try {
            switch (type) {
                case 'number':
                    return this.convertToNumber(value);
                case 'string':
                    return this.stringifyValue(value);
                case 'boolean':
                    return !!value;
                default:
                    throw new Error('Incorrect type');
            }
        } catch (err) {
            return err.message;
        }
    };

    customToString(value) {
        if (Array.isArray(value)) {
            return value.reduce((acc, item, index) => {
                if (index !== 0) {
                    acc += ',';
                }
                return acc + item;
            }, '')
        }

        if (Object.prototype.toString.call(value) === '[object Object]') {
            let result = '{';
            let isFirstProperty = true;

            for (let key in value) {
                if (value.hasOwnProperty(key)) {
                    if (!isFirstProperty) {
                        result += ', '
                    }
                    result += `${key}: ${value[key]}`;
                    isFirstProperty = false;
                }
            }

            result += '}';
            return result;
        }

        return '' + value;
    }
}

const conversionLibrary = new ConversionLibrary();

console.log(conversionLibrary.addValues(1, 5));                            // 6
console.log(conversionLibrary.addValues(-2, 8));                           // 6
console.log(conversionLibrary.addValues('1', '4'));                        // '14'
console.log(conversionLibrary.addValues('1', 4));                          // Error
console.log(conversionLibrary.addValues(true, false));                     // 1
console.log(conversionLibrary.addValues(102n, 5n));                        // 107n
console.log(conversionLibrary.addValues(105n, '3'));                       // Error
console.log(conversionLibrary.addValues([], 5));                           // Error

console.log()

console.log(conversionLibrary.stringifyValue(true));                            // 'true'
console.log(conversionLibrary.stringifyValue(false));                           // 'false'
console.log(conversionLibrary.stringifyValue('1'));                             // '1'
console.log(conversionLibrary.stringifyValue(502n));                            // '502'
console.log(conversionLibrary.stringifyValue({'a': 1, 'b': 2, 'c': 3}));        // '{"a":1,"b":2,"c":3}'
console.log(conversionLibrary.stringifyValue([1, 2, 3]));                       // '[1,2,3]'

console.log();

console.log(conversionLibrary.invertBoolean(true));                     // false
console.log(conversionLibrary.invertBoolean(false));                    // true
console.log(conversionLibrary.invertBoolean('1'));                      // Error
console.log(conversionLibrary.invertBoolean(502n));                     // Error
console.log(conversionLibrary.invertBoolean(Symbol('foo')));        // Error
console.log(conversionLibrary.invertBoolean(null));                     // Error
console.log(conversionLibrary.invertBoolean(undefined));                // Error

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

console.log();

console.log(conversionLibrary.customToString(5));                               // '5'
console.log(conversionLibrary.customToString('abc'));                           // 'abc'
console.log(conversionLibrary.customToString(true));                            // 'true'
console.log(conversionLibrary.customToString(null));                            // 'null'
console.log(conversionLibrary.customToString([1, 2, 3]));                       // '1,2,3'
console.log(conversionLibrary.customToString({'a': 1, 'b': 2, 'c': 3}));        // '{'a': 1, 'b': 2, 'c': 3}'

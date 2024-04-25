'use strict';

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
};

const validateObject = function (obj, schema) {
    const requiredProps = Object.keys(schema);

    const validateRequiredProps = requiredProps.every(property => obj.hasOwnProperty(property));

    if (!validateRequiredProps) {
        return false;
    }

    for (const property in schema) {
        const {type} = schema[property];

        if (!type || typeof obj[property] !== type) {
            return false;
        }
    }

    return true;
};

console.log(validateObject(person, {firstName: {type: 'string'}}));                            // true
console.log(validateObject(person, {lastName: {type: 'string'}, age: {type: 'number'}}));     // true
console.log(validateObject(person, {lastName: {type: 'string'}, age: {type: 'boolean'}}));    // false
console.log(validateObject(person, {firstName: {type: 'string'}, age: {type: null}}));         // false


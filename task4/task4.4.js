'use strict';

const checkIsObject = require('./utils');

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
    visitedCities: ['Rome', 'Paris', 'Madrid'],
    x: {
        y: {
            z: 5,
        },
    },
};

const createImmutableObject = function (obj) {
    try {
        if (typeof obj !== 'object' || obj == null || typeof obj === 'function') {
            return obj;
        }

        const newObj = Array.isArray(obj) ? obj.map(createImmutableObject) : {};

        Object
            .keys(obj)
            .forEach(key => {
                let value = obj[key];

                Object.defineProperty(newObj, key, {
                    value: typeof value === 'object' ? createImmutableObject(value) : value,
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
            });

        return newObj;
    } catch (err) {
        return err.message;
    }
}

const immutablePerson = createImmutableObject(person);

console.log(Object.getOwnPropertyDescriptors(immutablePerson));                 // {property: {value, writable: false, enum: true, conf: false}}
console.log(Object.getOwnPropertyDescriptors(immutablePerson.x.y));             // z: { value: 5, writable: false, enumerable: true, configurable: false }
console.log(Object.getOwnPropertyDescriptors(immutablePerson.visitedCities));

try {
    immutablePerson.firstName = 'test';     // Error
} catch (err) {
    console.log(err.message);
}

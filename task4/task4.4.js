'use strict';

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
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

        const newObj = {};

        Object
            .keys(obj)
            .forEach(key => {
                const value = createImmutableObject(obj[key]);

                Object.defineProperty(newObj, key, {
                    value,
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

console.log(Object.getOwnPropertyDescriptors(immutablePerson));     // {property: {value, writable: false, enum: true, conf: false}}
console.log(Object.getOwnPropertyDescriptors(immutablePerson.x.y));     // z: { value: 5, writable: false, enumerable: true, configurable: false }

try {
    immutablePerson.firstName = 'test';     // Error
} catch (err) {
    console.log(err.message);
}

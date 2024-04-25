'use strict';

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
    x: {
        y: {
            z: 5,
        }
    },
};


const deepCloneObject = function (obj) {
    try {
        if (typeof obj !== 'object' || obj === null || typeof obj === 'function') {
            throw new Error('Argument is not an object');
        }

        const copiedObject = Array.isArray(obj) ? [] : {};

        for (const key in obj) {
            copiedObject[key] = deepCloneObject(obj[key]);
        }

        return copiedObject;
    } catch (err) {
        return err.message;
    }
};

const copy = deepCloneObject(person);

copy.x.y.z = 10;

console.log(person); // { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com', x: { y: { z: 5 }}}

console.log(copy); // { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com', x: { y: { z: 10 } }}

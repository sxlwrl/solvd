'use strict';

const checkIsObject = require('./utils');

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


const deepCloneObject = function (obj) {
    try {
        checkIsObject(obj);
    } catch (err) {
        return err.message;
    }

    const copiedObject = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        copiedObject[key] = deepCloneObject(obj[key]);
    }

    return copiedObject;
};

const copy = deepCloneObject(person);

copy.x.y.z = 10;

console.log(person); // { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com', x: { y: { z: 5 }}}

console.log(copy); // { firstName: 'John', lastName: 'Doe', age: 30, email: 'john.doe@example.com', x: { y: { z: 10 } }}

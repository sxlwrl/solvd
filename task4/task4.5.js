'use strict';

const checkIsObject = require('./utils');

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
};

const observeObject = function (obj, cb) {
    try {
        checkIsObject(obj);
    } catch (err) {
        return err.message;
    }

    const observedObject = {};

    Object
        .entries(obj)
        .forEach(([key, value]) => {
            Object.defineProperty(observedObject, key, {
                get() {
                    cb(key, 'get');
                    return value;
                },
                set(newValue) {
                    cb(key, 'set');
                    value = newValue;
                },
            });
        });

    return observedObject;
};

const callbackFn = function (property, action) {
    console.log(`Property: '${property}'. Action: '${action}'`);
}

const observer = observeObject(person, callbackFn);

console.log(observer.firstName);    // Property: 'firstName'. Action: 'get' -> John
console.log(observer.age = 55);     // Property: 'age'. Action: 'set' -> 55
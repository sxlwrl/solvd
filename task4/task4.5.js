'use strict';

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
};

const observeObject = function (obj, cb) {
    const observedObject = {};

    for (const key in obj) {
        Object.defineProperty(observedObject, key, {
            get () {
                cb(key, 'get');
                return obj[key];
            },
            set (value) {
                cb(key, 'set');
                obj[key] = value;
            },
        });
    }

    return observedObject;
};

const callbackFn = function (property, action) {
    console.log(`Property: '${property}'. Action: '${action}'`);
}

const observer = observeObject(person, callbackFn);

console.log(observer.firstName);    // Property: 'firstName'. Action: 'get' -> John
console.log(observer.age = 55);     // Property: 'age'. Action: 'set' -> 55
'use strict';

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
};

const checkIsObject = function (obj) {
    if (typeof obj !== 'object' || obj === null || typeof obj === 'function') {
        throw new Error('Argument is not an object');
    }
}

const makeOnlyReadable = function (obj) {
    try {
        checkIsObject(obj);
    } catch (err) {
        return err.message;
    }

    Object
        .getOwnPropertyNames(obj)
        .forEach(property => {
            Object.defineProperty(obj, property, {writable: false});
        });
};

makeOnlyReadable(person);

person.updateInfo = function (newInfo) {
    try {
        checkIsObject(newInfo);
    } catch (err) {
        return err.message;
    }

    Object
        .getOwnPropertyNames(newInfo)
        .forEach(property => {
            if (Object.hasOwn(this, property) && Object.getOwnPropertyDescriptor(this, property).writable) {
                Object.defineProperty(this, property, {value: newInfo[property]})
            }
        });
};

const defineAddress = function (obj) {
    try {
        checkIsObject(obj);
    } catch (err) {
        return err.message;
    }

    Object.defineProperty(obj, "address", {
        value: {},
        writable: false,
        enumerable: false,
        configurable: false
    });
}

person.updateInfo({age: 55});
console.log(person.updateInfo(5));  // Error

defineAddress(person);      // address: { value: {}, writable: false, enumerable: false, configurable: false }


console.log(Object.getOwnPropertyDescriptors(person));



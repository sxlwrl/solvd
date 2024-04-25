'use strict';

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
};

const makeOnlyReadable = function (obj) {
    Object
        .getOwnPropertyNames(obj)
        .forEach(property => {
            Object.defineProperty(obj, property, {writable: false});
        });
};

makeOnlyReadable(person);

person.updateInfo = function (newInfo) {
        Object
            .getOwnPropertyNames(newInfo)
            .forEach(property => {
                if (Object.hasOwn(this, property) && Object.getOwnPropertyDescriptor(this, property).writable) {
                    Object.defineProperty(this, property, {value: newInfo[property]})
                }
            });
};

const defineAddress = function (obj) {
    Object.defineProperty(obj, "address", {
        value: {},
        writable: false,
        enumerable: false,
        configurable: false
    });
}

person.updateInfo({age: 55});

defineAddress(person);      // address: { value: {}, writable: false, enumerable: false, configurable: false }


console.log(Object.getOwnPropertyDescriptors(person));



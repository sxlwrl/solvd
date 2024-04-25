'use strict';

const product = {
    name: "Laptop",
    price: 1000,
    quantity: 5,
};

const defineProductProperties = function (obj) {
    Object.defineProperties(obj, {
        price: {
            writable: false,
            enumerable: false,
        },
        quantity: {
            writable: false,
            enumerable: false,
            // configurable: false
        }
    });
};

defineProductProperties(product);

const getTotalPrice = function (obj) {
    const price = Object.getOwnPropertyDescriptor(obj, 'price').value;
    const quantity = Object.getOwnPropertyDescriptor(obj, 'quantity').value;

    if (price && quantity) return price * quantity;
};

const deleteNonConfigurable = function (obj, property) {
    try {
        const descriptor = Object.getOwnPropertyDescriptor(obj, property);

        if (!descriptor) {
            throw new Error("The specified descriptor doesn't exist");
        }

        if (!descriptor.configurable) {
            throw new Error('The specified property is not configurable');
        }

        delete obj[property];

        return `The property '${property}' has been deleted`;
    } catch (err) {
        return err.message;
    }
};

console.log(getTotalPrice(product));    // 5000

console.log(deleteNonConfigurable(product, 'price'));       // The property 'price' has been deleted
console.log(deleteNonConfigurable(product, 'xxx'));         // The specified descriptor doesn't exist
console.log(deleteNonConfigurable(product, 'quantity'));    // configurable: false --> The specified property
//                         is not configurable

console.log(Object.getOwnPropertyDescriptors(product));

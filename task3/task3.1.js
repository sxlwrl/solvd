'use strict';

const checkIsArray = function (arr) {
    if (!Array.isArray(products)) {
        throw new Error('You have to pass an array');
    }
}

const checkPrice = function (product) {
    if (!product.price || product.price < 0) {
        throw new Error('Incorrect price');
    }
}

const calculateDiscountedPrice = function (products, discount) {
    try {
        checkIsArray(products);

        if (discount < 0 || discount > 100) {
            throw new Error('Incorrect discount');
        }

        return products.map(product => {
            checkPrice(product);
            const discountedPrice = product.price * (1 - discount / 100);
            return {...product, discountedPrice};
        });
    } catch (err) {
        return err.message;
    }
};

const calculateTotalPrice = function (products) {
    try {
        checkIsArray(products);

        return products.reduce((total, product) => {
            checkPrice(product);

            return total + product.price;
        }, 0);
    } catch (err) {
        return err.message;
    }
};

const products = [
    { name: "Product 1", price: 10 },
    { name: "Product 2", price: 20 },
    { name: "Product 3", price: 50 }
];

console.log(calculateDiscountedPrice(products, -10));   // Error
console.log(calculateDiscountedPrice(products, 20));    // Array of products with discounted price

console.log(calculateTotalPrice(products));    // 80
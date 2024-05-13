'use strict';

const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];

const promises_2 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.reject(3)
];

const promises_3 = [];

const promiseAll = function (promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let counter = 0;

        if (promises.length === 0) {
            resolve(results);
        }

        promises.forEach((promise, index) => {
            promise.then(result => {
                results[index] = result;
                counter++;

                if (counter === promises.length) {
                    resolve(results);
                }
            })
                .catch(error => {
                    reject(error);
                });
        });
    });
}

promiseAll(promises)
    .then(results => {
        console.log("All promises resolved:", results); // Expected: [1, 2, 3]
    })
    .catch(error => {
        console.error("At least one promise rejected:", error);
    });

promiseAll(promises_2)
    .then(results => {
        console.log("All promises resolved:", results);
    })
    .catch(error => {
        console.error("At least one promise rejected:", error); // Expected: Error
    });

promiseAll(promises_3)
    .then(results => {
        console.log("All promises resolved:", results); // Expected: []
    })
    .catch(error => {
        console.error("At least one promise rejected:", error);
    });
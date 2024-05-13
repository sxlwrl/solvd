'use strict';

const promises = [
    Promise.resolve(1),
    Promise.reject("Error occurred"),
    Promise.resolve(3)
];

const promises_2 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.reject(3)
];

const promiseAllSettled = function (promises) {
    return new Promise(resolve => {
        const result = [];
        let counter = 0;

        if (promises.length === 0) {
            resolve(result);
            return;
        }

        promises.forEach((promise, index) => {
            promise
                .then(value => {
                    result[index] = {status: 'fulfilled', value};
                })
                .catch(reason => {
                    result[index] = {status: 'rejected', reason};
                })
                .finally(() => {
                    counter++;
                    if (counter === promises.length) {
                        resolve(result);
                    }
                });
        });
    });
}

promiseAllSettled(promises)
    .then(results => {
        console.log("All promises settled:", results);
    });

promiseAllSettled(promises_2)
    .then(results => {
        console.log("All promises settled:", results);
    });




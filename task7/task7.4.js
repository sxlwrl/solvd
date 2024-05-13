'use strict';

function callbackStyleFunction(value, callback) {
    setTimeout(() => {
        if (value > 0) {
            callback(null, value * 2);
        } else {
            callback("Invalid value", null);
        }
    }, 1000);
}

const promisify = function (cb) {
    return (value) => {
        return new Promise((resolve, reject) => {
            cb(value, (res, err) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };
};

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
    .then(result => {
        console.log("Promised function result:", result); // Expected: 6
    })
    .catch(error => {
        console.error("Promised function error:", error);
    });

promisedFunction(-3)
    .then(result => {
        console.log("Promised function result:", result);
    })
    .catch(error => {
        console.error("Promised function error:", error); // Expected: Invalid value
    });
const checkIsObject = function (obj) {
    if (typeof obj !== 'object' || obj === null || typeof obj === 'function') {
        throw new Error('Argument is not an object');
    }
}

module.exports = checkIsObject;
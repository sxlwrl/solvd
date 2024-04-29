'use strict';

const customShuffle = function (arr) {
    const shuffledArray = [...arr];

    if (arr.length === 0) {
        return [];
    }

    if (arr.length === 1) {
        return arr;
    }

    if (arr.length === 2) {
        return [arr[0], arr[1]] = [arr[1], arr[0]];
    }

    for (let i = 0; i < shuffledArray.length; i++) {
        const shuffledIndex = Math.floor(Math.random() * (i + 1));

        if (shuffledIndex === i) {
            continue;
        }

        [shuffledArray[i], shuffledArray[shuffledIndex]] = [shuffledArray[shuffledIndex], shuffledArray[i]];
    }

    return shuffledArray;
};

console.log(customShuffle([1, 2, 3, 4, 5]));
console.log(customShuffle([1, 2, 3, 4, 5]));
console.log(customShuffle([1, 2, 3, 4, 5]));
console.log(customShuffle([1, 2, 3, 4, 5]));

console.log(customShuffle([]));
console.log(customShuffle([1]));
console.log(customShuffle([1, 2]));

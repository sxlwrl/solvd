'use strict';

function customFilterUnique(arr, callback) {
    const uniqueSet = new Set();
    const result = [];

    arr.forEach(item => {
        const key = callback(item);
        if (typeof item === 'object' && !uniqueSet.has(key) && key) {
            uniqueSet.add(key);
            result.push(item);
        }

        if (typeof item !== 'object' && key){
            result.push(item);
        }
    });

    return result;
}

const arrayOfObjects = [
    { id: 1, firstName: 'John', lastName: 'Lucas' },
    { id: 2, firstName: 'Nick', lastName: 'Figueroa' },
    { id: 3, firstName: 'Nick', lastName: 'Acosta' },
    { id: 4, firstName: 'Gregory', lastName: 'Peterson' },
    { id: 5, firstName: 'Max', lastName: 'Peterson' },
    { id: 6, firstName: 'Max', lastName: 'Buchanan' }
];

const filteredArray = customFilterUnique([1, 2, 3, 4, 5, 6], i => i > 2);
const filteredArrayObj = customFilterUnique(arrayOfObjects, obj => obj.lastName);

console.log(filteredArray);
console.log(filteredArrayObj);

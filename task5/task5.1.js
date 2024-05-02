'use strict';

function customFilterUnique(arr, callback) {
    const uniqueSet = new Set();
    const result = [];

    arr.forEach(item => {
        const key = callback(item);
        if (typeof item === 'object' && !uniqueSet.has(JSON.stringify(key)) && key) {
                uniqueSet.add(JSON.stringify(key));
                result.push(item);
        }

        if (typeof item !== 'object' && key){
            result.push(item);
        }
    });

    return result;
}

// const arrayOfObjects = [
//     { id: 1, firstName: 'John', lastName: 'Lucas' },
//     { id: 2, firstName: 'Nick', lastName: 'Figueroa' },
//     { id: 3, firstName: 'Nick', lastName: 'Acosta' },
//     { id: 4, firstName: 'Gregory', lastName: 'Peterson' },
//     { id: 5, firstName: 'Max', lastName: 'Peterson' },
//     { id: 6, firstName: 'Max', lastName: 'Buchanan' }
// ];

let arrayOfObjects = [
    { a: 1, b: 2 },
    { a: 1, b: 2 },
    { c: 3, d: 4 },
    { a: 5, b: 6 },
    { e: 7, f: 8 },
    { g: 9, h: 0 }
];

const filterByPropertyA = (obj) => {
    if (!obj || typeof obj !== "object") throw new Error("Pass an object as parameter");
    return Object.keys(obj).includes("a") ? obj : undefined;
}

// const filteredArray = customFilterUnique([1, 2, 3, 4, 5, 6], i => i > 2);
// const filteredArrayObj = customFilterUnique(arrayOfObjects, obj => obj.lastName);
const filteredArrayObj = customFilterUnique(arrayOfObjects, filterByPropertyA);

// console.log(filteredArray);
console.log(filteredArrayObj);

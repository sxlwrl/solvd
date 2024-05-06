'use strict';

const multiline = function (template) {
    const strings = template[0].split('\n');
    const notEmptyStrings = strings.filter(item => item !== '');
    return notEmptyStrings
        .map((item, index) => {
            return `${index + 1} ${item}`
        })
        .reduce((acc, item) => {
            return `${acc + item} \n`
        }, '');
};

const code_1 = multiline`
function add(a, b) {
return a + b;
}
`;

const code_2 = multiline`
class User {
constructor() {}

get grades() {}
} 
`

console.log(code_1);

console.log();

console.log(code_2);
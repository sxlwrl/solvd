'use strict';

const checkIsArray = function (arr) {
    if (!Array.isArray(arr)) {
        throw new Error('You have to pass an array');
    }
}

const uppercaseLetter = function (string) {
    const firstLetter = string.at(0).toUpperCase();
    const rest = string.slice(1);
    return `${firstLetter}${rest}`;
};

const getFullName = function (person) {
    try {
        if (!person.firstName || !person.lastName) {
            throw new Error('There are no firstName or lastName properties');
        }

        return `${uppercaseLetter(person.firstName)} ${uppercaseLetter(person.lastName)}`;
    } catch (err) {
        return err.message;
    }
};

const filterUniqueWords = function (str) {
    try {
        if (typeof str !== 'string') {
            throw new Error('The argument type is not a string');
        }

        return str
            .toLowerCase()
            .match(/\b(\w+)\b/g)
            .filter((item, index, arr) => arr.indexOf(item) === index)
            .sort((a, b) => a.localeCompare(b));
    } catch (err) {
        return err.message;
    }
};

const calculateAverageGrade = function (grades) {
    return grades.map(studentGrades => {
        const result = studentGrades.reduce((total, grade) => total + grade, 0) / studentGrades.length;
        return Number.parseFloat(result.toFixed(3));
    });
}

const getGrades = function (students) {
    return students.map(student => student.grades);
}

const getAverageGrade = function (students) {
    try {
        checkIsArray(students);

        const calculatedGrades = calculateAverageGrade(getGrades(students));

        return students.map((student, index) => {
            return {
                ...student,
                avg: calculatedGrades[index]
            };
        });
    } catch (err) {
        return err.message;
    }
}

const studentsList = [
    {'name': 'Alex', 'grades': [85, 74, 92]},
    {'name': 'Julia', 'grades': [64, 84, 90]},
    {'name': 'Nick', 'grades': [89, 95, 100]},
    {'name': 'John', 'grades': [92, 92, 84]},
    {'name': 'Noah', 'grades': [99, 96, 98]},
    {'name': 'George', 'grades': [74, 95, 82]},
];

console.log(getFullName({'firstName': 'Vadym', 'lastName': 'Kazak'}));  // Vadym Kazak
console.log(getFullName({'firstName': 'vadym', 'lastName': 'kazak'}));  // Vadym Kazak
console.log(getFullName({'firstName': undefined, 'lastName': 'Kazak'}));    // Error

console.log();

console.log(filterUniqueWords('Lorem! Lorem Lorem Lorem Lorem woax ipsum dolor sit amet, consectetur adipisicing ' +
    'elit. A beatae, illo illum magnam minus neque quae quos repellendus temporibus! Laboriosam.'));
console.log(filterUniqueWords(true));   // Error

console.log();

console.log(getAverageGrade(studentsList));     // Students object with avg grade
console.log(getAverageGrade(null));     // Error

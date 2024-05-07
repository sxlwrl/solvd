'use strict';

const keywords = ['JavaScript', 'template', 'tagged'];
const template = 'Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.';

function highlightKeywords(template, keywords) {
    return template.replace(/\$\{(\d+)}/g, (_, index) => {
        const keyword = keywords[index];
        return `<span class='highlight'>${keyword}</span>`;
    });
}

const highlighted = highlightKeywords(template, keywords);
console.log(highlighted);

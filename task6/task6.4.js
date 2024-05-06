'use strict';

function debouncedSearch(query) {
    console.log('Searching for:', query);
    const results = document.querySelector('.results');
    results.textContent = `Searching for: ${query}`;
}

const debounce = function (fn, delay) {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
};

const debouncedSearchHandler = debounce(debouncedSearch, 1000);

const inputElement = document.getElementById('search-input');

inputElement.addEventListener('input', event => {
    debouncedSearchHandler(event.target.value);
});
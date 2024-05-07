'use strict';

function onScroll(event) {
    console.log('Scroll event:', event);
}

const throttle = function (fn, interval) {
    let timeout;
    let lastTime = 0;

    return function(...args) {
        const currentTime = Date.now();
        const executedTime = currentTime - lastTime;

        clearTimeout(timeout);

        if (executedTime >= interval) {
            fn.apply(this, args);
            lastTime = currentTime;
        } else {
            timeout = setTimeout(() => {
                fn.apply(this, args);
                lastTime = Date.now();
            }, interval - executedTime);
        }
    };
};

const throttledScrollHandler = throttle(onScroll, 5000);

window.addEventListener('scroll', throttledScrollHandler);
// Javascript
let counter = document.querySelector('.counter');
let count = 20;

let counterInterval = setInterval(() => {
    count <= 1 && clearInterval(counterInterval);
    counter.textContent = count <= 10 ? `0${--count}` : `${--count}`;
}, 1000);
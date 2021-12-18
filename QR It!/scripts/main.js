// Javascript

const form = document.querySelector('.form-qr');
const inputURL = document.querySelector('.genqr');
const finalResult = document.querySelector('.qrfinal');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    finalResult.src = `https://qrtag.net/api/qr_transparent.png?url=${inputURL.value}`;
})
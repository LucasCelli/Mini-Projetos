//

const button = document.querySelector('.icon');

button.addEventListener('click', (ea) => {
    button.classList.add('fade');

    let recognition = new webkitSpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.addEventListener('result', (e) => {
        document.querySelector('#text').value = e.results[0][0].transcript;
        button.classList.remove('fade');
    });
    recognition.start();
});
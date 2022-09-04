const textarea = document.querySelector('#text');
let voicelist = document.querySelector('#voice');
let speechBtn = document.querySelector('.submit');

let synth = speechSynthesis;
let isSpeaking = true;

// Faz a listagem de vozes disponíveis no navegador do usuário.
function voiceSpeech() {
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option');
        option.text = voice.name;
        voicelist.add(option);
    }
}

synth.addEventListener('voiceschanged', voiceSpeech)

function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voicelist.value) {
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance);
}

speechBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (textarea.value != '') {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.textContent = 'Pausar';

            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.textContent = 'Continuar';

            }
            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.textContent = 'Converter para Voz';
    
                }
            });
        }else{
            speechBtn.textContent = 'Converter para Voz';
        }
    }
});
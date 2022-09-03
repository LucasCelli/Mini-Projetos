// Audio Controls by Lucas Celli
// www.lucascelli.com

// Separando elementos e definindo variáveis:
const play = document.querySelector('#playPause');
const backward = document.querySelector('#backward');
const forward = document.querySelector('#forward');
const mute = document.querySelector('#mute');
const volumeUp = document.querySelector('#volumeUp');
const volumeDown = document.querySelector('#volumeDown');
const test = document.querySelector('#test');
const duration = document.querySelector('#duration');
const currentTime = document.querySelector('#currentTime');
const seekslider = document.querySelector('#seekslider');
const audio = document.querySelector('.track');
const backForwardValue = 15.0;
let playing = false;
let seeking = false;

// Essa função irá calcular o tempo registrado da música em ms e converter para valores inteiros.
const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

// Essa função é responsável por acionar o player, também faz a troca de ícones de play/pause.
play.addEventListener('click', function () {
    if (!playing) {
        playing = true;
        play.innerHTML = '<i class="las la-pause"></i>';
        audio.play();
    } else if (playing = true) {
        playing = false;
        play.innerHTML = '<i class="las la-play"></i>';
        audio.pause();
    }
});

// Funções de "backward" e "forward" do player, troca o valor atual na duração da música.
backward.addEventListener('click', function () {
    audio.currentTime -= backForwardValue;
});
forward.addEventListener('click', function () {
    audio.currentTime += backForwardValue;
});

// Controle de volume nos botões de Volume Up e Down presentes no player.
// O volume do áudio é entre 0 (mudo) e 1 (volume máximo), portanto o valor é definido em decimais.
volumeDown.addEventListener('click', function () {
    if (audio.volume > 0) {
        audio.volume -= 0.1;
    }
    if (audio.volume < 0.1) {
        audio.volume = 0;
    }
    console.log(audio.volume);
});
volumeUp.addEventListener('click', function () {
    if (audio.volume < 1) {
        audio.volume += 0.1;
    }
    if (audio.volume >= 0.9) {
        audio.volume = 1;
    }
    console.log(audio.volume);
});

// Função que deixa do som mutado e vice-versa, também troca a cor do ícone para indicar a ativação.
mute.addEventListener('click', function () {
    if (!audio.muted) {
        audio.muted = true;
        mute.style.color = 'red';
    } else {
        audio.muted = false;
        mute.style.color = 'black';
    }
});

// Carrega as informações do audio, aqui podemos calcular a duração completa da música usando a função de calcular tempo criada acima.
audio.addEventListener('loadedmetadata', () => {
    duration.textContent = calculateTime(audio.duration);
    seekslider.max = audio.duration;
});

// Atualiza o tempo atual na duração total da música.
audio.addEventListener('timeupdate', () => {
    if (!seeking) {
        seekslider.value = audio.currentTime;
        currentTime.textContent = calculateTime(audio.currentTime);
    }
});

// Verifica se o áudio carregado chegou ao fim, então executa funções de "reset".
audio.addEventListener("ended", function () {
    seekslider.value = 0;
    playing = false;
    play.innerHTML = '<i class="las la-play"></i>';
});

// Verifica se o slider de tempo do player foi alterado, então o atualiza.
seekslider.addEventListener("input", function () {
    seeking = true;
    currentTime.textContent = calculateTime(seekslider.value);
});

// Verifica se o slider de tempo do player foi alterado, então o atualiza.
seekslider.addEventListener("change", function () {
    seeking = false;
    audio.currentTime = seekslider.value;
});
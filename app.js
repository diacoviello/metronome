import Timer from './timer.js';

if (typeof window !== 'undefined') {
  console.log('You are on the browser')
} else {
  console.log('You are on the server')
}

const tempoDisplay = window.document.querySelector('.tempo');
const tempoText = window.document.querySelector('.tempo-text');
const decreaseTempoBtn = window.document.querySelector('.decrease-tempo');
const increaseTempoBtn = window.document.querySelector('.increase-tempo');
const tempoSlider = window.document.querySelector('.slider');
const startStopBtn = window.document.querySelector('.start-stop');
const subtractBeats = window.document.querySelector('.subtract-beats');
const addBeats = window.document.querySelector('.add-beats');
const measureCount = window.document.querySelector('.measure-count');

const click1 = new Audio('metronome-click-high.mp3');
const click2 = new Audio('metronome-click-low.mp3');

let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Medium';

decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20) { return };
    bpm--;
    validateTempo();
    updateMetronome();
});
increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) { return };
    bpm++;
    validateTempo();
    updateMetronome();
});
tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    validateTempo();
    updateMetronome();
});

subtractBeats.addEventListener('click', () => {
    if (beatsPerMeasure <= 2) { return };
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
addBeats.addEventListener('click', () => {
    if (beatsPerMeasure >= 12) { return };
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

startStopBtn.addEventListener('click', () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    } else {
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
});

function updateMetronome() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;
    if (bpm <= 40) { tempoTextString = "Super Slow" };
    if (bpm > 40 && bpm < 80) { tempoTextString = "Slow" };
    if (bpm > 80 && bpm < 120) { tempoTextString = "Getting there" };
    if (bpm > 120 && bpm < 180) { tempoTextString = "Nice and Steady" };
    if (bpm > 180 && bpm < 220) { tempoTextString = "Rock n' Roll" };
    if (bpm > 220 && bpm < 240) { tempoTextString = "Funky Stuff" };
    if (bpm > 240 && bpm < 260) { tempoTextString = "Relax Dude" };
    if (bpm > 260 && bpm <= 280) { tempoTextString = "Eddie Van Halen" };

    tempoText.textContent = tempoTextString;
}
function validateTempo() {
    if (bpm <= 20) { return };
    if (bpm >= 280) { return };
}

function playClick() {
    console.log(count);
    if (count === beatsPerMeasure) {
        count = 0;
    }
    if (count === 0) {
        click1.play();
        click1.currentTime = 0;
    } else {
        click2.play();
        click2.currentTime = 0;
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

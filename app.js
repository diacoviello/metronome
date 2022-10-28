import Timer from './timer.js';

if ( typeof window!=='undefined' ) {
    console.log( 'You are on the browser' )
} else {
    console.log( 'You are on the server' )
}

const tempoDisplay=document.querySelector( '.tempo' );
const tempoText=document.querySelector( '.tempo-text' );
const decreaseTempoBtn=document.querySelector( '#decrease-tempo' );
const minus1=document.getElementById( 'minus1' );
const decreaseTempoJumpBtn=document.querySelector( '#decrease-tempo-jump' );
const minus10=document.getElementById( 'minus10' );
const increaseTempoJumpBtn=document.querySelector( '#increase-tempo-jump' );
const plus1=document.getElementById( 'plus1' );
const increaseTempoBtn=document.querySelector( '#increase-tempo' );
const plus10=document.getElementById( 'plus10' );
const tempoSlider=document.querySelector( '#slider' );
const startStopBtn=document.querySelector( '#start-stop' );
const subtractBeats=document.querySelector( '#subtract-beats' );
const addBeats=document.querySelector( '#add-beats' );
const measureCount=document.querySelector( '.measure-count' );

const click1=new Audio( 'metronome-click-high.mp3' );
const click2=new Audio( 'metronome-click-low.mp3' );

let bpm=140;
let jump=10;
let beatsPerMeasure=4;
let count=0;
let isRunning=false;
let tempoTextString='Medium';

decreaseTempoBtn.addEventListener( 'click', () => {
    if ( bpm<=20 ) {
        return;
    } else if ( bpm>=21 ) {
        plus1.textContent = "remove";
        plus10.textContent = "replay_10";

    };
    bpm--;
    
    validateTempo1();
    updateMetronome();
} );
decreaseTempoJumpBtn.addEventListener( 'click', () => {
    if ( bpm<=29 ) { 
        return;
    } else if ( bpm>=20 ) {
            bpm = (bpm-jump );
            plus1.textContent = "add";
            plus10.textContent = "forward_10";

            validateTempo1();
            updateMetronome();
    };

} );

increaseTempoBtn.addEventListener( 'click', () => {
    if ( bpm>=280 ) {
        return;
    } else if ( bpm<=279 ) {
        minus1.textContent = "remove";
        minus10.textContent = "replay_10";
    }
    bpm++;

    validateTempo1();
    updateMetronome();
} );
increaseTempoJumpBtn.addEventListener( 'click', () => {
    if ( bpm>=280 ) { 
        return;
    } else if ( bpm<=271 ) {
            bpm=( bpm+jump );
            minus10.textContent = "replay_10";
            minus1.textContent = "remove";

            validateTempo1();
            updateMetronome();
            return bpm;
    };
} );

tempoSlider.addEventListener( 'input', () => {
    bpm=tempoSlider.value;
    validateTempo1();
    updateMetronome();
} );

subtractBeats.addEventListener( 'click', () => {
    if ( beatsPerMeasure<=2 ) { return };
    beatsPerMeasure--;
    measureCount.textContent=beatsPerMeasure;
    count=0;
} );
addBeats.addEventListener( 'click', () => {
    if ( beatsPerMeasure>=12 ) { return };
    beatsPerMeasure++;
    measureCount.textContent=beatsPerMeasure;
    count=0;
} );

startStopBtn.addEventListener( 'click', () => {
    count=0;
    if ( !isRunning ) {
        metronome.start();
        isRunning=true;
        startStopBtn.textContent='STOP';
    } else {
        metronome.stop();
        isRunning=false;
        startStopBtn.textContent='START';
    }
} );

function updateMetronome() {
    tempoDisplay.textContent=bpm;
    tempoSlider.value=bpm;
    metronome.timeInterval=60000/bpm;
    if ( bpm<=40 ) { tempoTextString="Grave" };
    if ( bpm>40&&bpm<60 ) { tempoTextString="Largo" };
    if ( bpm>60&&bpm<80 ) { tempoTextString="Adagio" };
    if ( bpm>80&&bpm<100 ) { tempoTextString="Andante Moderato" };
    if ( bpm>100&&bpm<120 ) { tempoTextString="Allegretto" };
    if ( bpm>120&&bpm<156 ) { tempoTextString="Allegro" };
    if ( bpm>156&&bpm<176 ) { tempoTextString="Vivace" };
    if ( bpm>176&&bpm<200 ) { tempoTextString="Presto" };
    if ( bpm>200&&bpm<=220 ) { tempoTextString="Prestissimo" };
    if ( bpm>220&&bpm<=280 ) { tempoTextString="Stop Kidding Yourself" };

    tempoText.textContent=tempoTextString;
}
function validateTempo1() {

    if (bpm<=20 ) {
        minus1.textContent='dangerous';
        minus10.textContent='dangerous';
        plus1.textContent='add';
        plus10.textContent='forward_10';
        return;
    }

    if ( bpm>=21 && bpm<=29 ) {
        minus1.textContent='remove';
        minus10.textContent='dangerous';
        plus1.textContent='add';
        plus10.textContent='forward_10';
        return;
    };
    if ( bpm>=30 && bpm<=270 ) {
        minus1.textContent='remove';
        minus10.textContent='replay_10';
        plus1.textContent='add';
        plus10.textContent='forward_10';
        return;
    };
    if ( bpm>=271 && bpm<=279 ) {
        minus1.textContent='remove';
        minus10.textContent='replay_10';
        plus1.textContent='add';
        plus10.textContent='dangerous';

        return;
    };
    if ( bpm>=279 ) {
        minus1.textContent='remove';
        minus10.textContent='replay_10';
        plus1.textContent='dangerous';
        plus10.textContent='dangerous';
    
        return;
    };
}

function playClick() {
    console.log( count );
    if ( count===beatsPerMeasure ) {
        count=0;
    }
    if ( count===0 ) {
        click1.play();
        click1.currentTime=0;
    } else {
        click2.play();
        click2.currentTime=0;
    }
    count++;
}

const metronome=new Timer( playClick, 60000/bpm, { immediate: true } );


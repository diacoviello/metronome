import Timer from './timer.js';

if (typeof window !== 'undefined') {
  console.log('You are on the browser')
    } else {
        console.log('You are on the server')
    }


// NAV CIRCLE //
const pointCount=21;
const circleRadius=160;
const startAnimDelta=5;
const circumference=Math.PI*circleRadius*2;

var selectedItemIndex=-1;

var circlePath=document.getElementById( "mask-circle" );

/**
 * @description On Mouse Leave event handler for points
 */
const onMouseLeave=() => {
    let index=selectedItemIndex!==-1? selectedItemIndex:0;
    calculateOffset( index );
};

/**
 * @description On Click event handler for points
 * @param {Number} index - Index of list item
 */
const onClick=( index ) => {
    //If already selected, deselect
    selectedItemIndex=selectedItemIndex===index? -1:index;
    calculateOffset( index );

    //Find active item, deselect
    let activeListItem=document.querySelectorAll(
        ".navigation-circle-list-item.active"
    );
    if ( activeListItem.length>0 ) activeListItem[ 0 ].classList.remove( "active" );

    //Find new item by index, select
    let listItem=document.querySelectorAll(
        ".navigation-circle-list-item:nth-of-type("+selectedItemIndex+")"
    );
    if ( listItem.length>0 ) listItem[ 0 ].classList.add( "active" );
};

/**
 * @description - Calculate offset for circle path by index of list item
 * @param {Number} index - Index of list item
 */
const calculateOffset=( index=0 ) => {
    let offset=0;

    if ( index!==0 ) offset=( circumference/pointCount )*( pointCount-index );

    circlePath.style.strokeDashoffset=`${offset}px`;
};

// INTRO

let buffer=500;
let delay=
    1000*( 1+pointCount/startAnimDelta-1/startAnimDelta )+buffer;

setTimeout( () => onClick( 1 ), delay );






// METRONOME //

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const minus1 = document.querySelector('.minus1');
const decreaseTempoJumpBtn = document.querySelector('.decrease-tempo-jump');
const minus10 = document.querySelector('.minus10');
const increaseTempoJumpBtn = document.querySelector('.increase-tempo-jump');
const plus1 = document.querySelector('.plus1');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const plus10 = document.querySelector('.plus10');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const click1 = new Audio('metronome-click-high.mp3');
const click2 = new Audio('metronome-click-low.mp3');

let bpm = 140;
let jump = 10;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;
let tempoTextString = 'Medium';
// let jumpBackIcon = 'keyboard_double_arrow_left';
// let jumpForwardIcon = 'keyboard_double_arrow_right';
// let subtractIcon = 'remove';
// let addIcon = 'add';

decreaseTempoBtn.addEventListener('click', () => {
    if (bpm <= 20) {
        minus1.textContent = 'dangerous';
        return;
        };
    bpm--;
    plus1.textContent = 'add';
    validateTempo1();
    updateMetronome();
});
decreaseTempoJumpBtn.addEventListener('click', () => {
    if (bpm <= 20) { return };
    function decreaseJump() {
        if (bpm >= 30) {
        bpm = (bpm - jump);
        return bpm;
        } else {
            minus10.textContent = 'dangerous';
            return;
        }
        }
    plus10.textContent = 'keyboard_double_arrow_right';
    decreaseJump();
    validateTempo10();
    updateMetronome();
});

increaseTempoBtn.addEventListener('click', () => {
    if (bpm >= 280) {
        plus1.textContent = 'dangerous'; 
        return;
        };
    bpm++;
    minus1.textContent = 'remove';
    validateTempo1();
    updateMetronome();
});
increaseTempoJumpBtn.addEventListener('click', () => {
    if (bpm >= 280) { return };
    function increaseJump() {
        if (bpm <= 271) {
        bpm = (bpm + jump);
        return bpm;
        } else {
            plus10.textContent = 'dangerous';
            return;
        }
    }
    minus10.textContent = 'keyboard_double_arrow_left';
    increaseJump();
    validateTempo10();
    updateMetronome();
});

tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    validateTempo1();
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
function validateTempo1() {
    if (bpm <= 20) {
        minus1.textContent = 'dangerous';
        minus10.textContent = 'dangerous';
        return;
        };
    if (bpm >= 280) {
        plus1.textContent = 'dangerous';
        plus10.textContent = 'dangerous';
        return;
        };
}
function validateTempo10() {
    if (bpm <= 29) {
        minus10.textContent = 'dangerous';
        return;
        };
    if (bpm >= 271) {
        plus10.textContent = 'dangerous';
        return;
        };
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


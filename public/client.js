'use strict';

// const { io } = require( "socket.io-client" );

const socket = io();
const numData = document.querySelectorAll('.num');
const changeBackground = document.querySelectorAll('.bg-data');
const btnOnLed0 = document.querySelector('.btn-on');
const btnOffLed0 = document.querySelector('.btn-off');
const toggle = document.querySelector('.toggle');
const toggleBtn = document.querySelector('.toggle-btn');
const modalOnLed0 = document.querySelector('.modal-on-0');
const modalOnLed1 = document.querySelector('.modal-on-1');
const modalOffLed0 = document.querySelector('.modal-off-0');
const modalOffLed1 = document.querySelector('.modal-off-1');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelectorAll('.close-modal');
const btnCancelToTurnOffModal = document.querySelectorAll('.cancel');
const btnOkToTurnOnLed0 = document.querySelector('.ok-on-0');
const btnOkToTurnOffLed0 = document.querySelector('.ok-off-0');
const btnOkToTurnOnLed1 = document.querySelector('.ok-on-1');
const btnOkToTurnOffLed1 = document.querySelector('.ok-off-1');

// Variable
let light0On = 0;
const audio = new Audio('./audio/light-switch.mp3');
const colorTempArray = ['#FCE1DA', '#FFC1B8', '#FDBBB1', '#FF9B90', '#FF7F74', '#FF6859', '#FF4C40', '#FF4133', '#FF3424', '#FF2D1B'];
const colorHumArray = ['#D2F2FF', '#BFE1FF', '#AFD5FF', '#95BFFF', '#80B9FF', '#6EAEFF', '#5EA7FF', '#50A8FF', '#409EFF', '#228AFF'];
const colorLightArray = ['#F9F6CD', '#FAF6B6', '#FAF3A3', '#FAF28B', '#FAF174', '#FAF55C', '#FAF54D', '#FAF837', '#FAF826', '#FAF71B'];

/******************************** */
// audio

const playSoundEffect = function () {
    audio.play();
};

/******************** */
// show modal

const showModalToTurnOnLed0 = function () {
    modalOnLed0.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const showModalToTurnOffLed0 = function () {
    modalOffLed0.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const showModalToTurnOnLed1 = function () {
    modalOnLed1.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const showModalToTurnOffLed1 = function () {
    modalOffLed1.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const turnOffAllModal = function () {
    modalOnLed0.classList.add('hidden');
    modalOffLed0.classList.add('hidden');
    modalOnLed1.classList.add('hidden');
    modalOffLed1.classList.add('hidden');
    overlay.classList.add('hidden');
};

// console.log(light0On);
btnOnLed0.addEventListener('click', () => {
    if (!light0On) {
        // document.querySelector('.light-bulb-0').src = './img/light/light-on-img.png';
        showModalToTurnOnLed0();
        btnOkToTurnOnLed0.addEventListener('click', () => {
            socket.emit('ledStatus1', 'on');
            console.log('Clicked');
            document.querySelector('.light-bulb-0').src = './img/light/light-on-img.png';
            light0On = 1;
            turnOffAllModal();
        });
        for (let i = 0; i < btnCancelToTurnOffModal.length; i++) {
            btnCancelToTurnOffModal[i].addEventListener('click', turnOffAllModal);
        }
    }
});

btnOffLed0.addEventListener('click', () => {
    if (light0On) {
        showModalToTurnOffLed0();
        btnOkToTurnOffLed0.addEventListener('click', () => {
            socket.emit('ledStatus1', 'off');
            console.log('Clicked');
            document.querySelector('.light-bulb-0').src = './img/light/light-off-img.png';
            light0On = 0;
            turnOffAllModal();
        });
        for (let i = 0; i < btnCancelToTurnOffModal.length; i++) {
            btnCancelToTurnOffModal[i].addEventListener('click', turnOffAllModal);
        }
    }
});

// close modal
for (let i = 0; i < closeModal.length; i++) {
    closeModal[i].addEventListener('click', turnOffAllModal);
}
overlay.addEventListener('click', turnOffAllModal);

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        if (!modalOnLed0.classList.contains('hidden') || !modalOffLed0.classList.contains('hidden')) {
            turnOffAllModal();
        }
        if (!modalOnLed1.classList.contains('hidden') || !modalOffLed1.classList.contains('hidden')) {
            turnOffAllModal();
        }
    }
});

/****************************************/
// toggle

toggleBtn.addEventListener('click', () => {
    if (toggle.classList.contains('act')) {
        showModalToTurnOffLed1();
        btnOkToTurnOffLed1.addEventListener('click', () => {
            socket.emit('ledStatus2', 'off');
            console.log('Clicked');
            document.querySelector('.light-bulb-1').src = './img/light/light-off-img.png';
            toggle.classList.remove('act');
            turnOffAllModal();
        });
        for (let i = 0; i < btnCancelToTurnOffModal.length; i++) {
            btnCancelToTurnOffModal[i].addEventListener('click', turnOffAllModal);
        }
    } else {
        showModalToTurnOnLed1();
        btnOkToTurnOnLed1.addEventListener('click', () => {
            socket.emit('ledStatus2', 'on');
            console.log('Clicked');
            document.querySelector('.light-bulb-1').src = './img/light/light-on-img.png';
            toggle.classList.add('act');
            turnOffAllModal();
        });
        for (let i = 0; i < btnCancelToTurnOffModal.length; i++) {
            btnCancelToTurnOffModal[i].addEventListener('click', turnOffAllModal);
        }
    }
});

/****************************************/

// reset color
// temp, hum, light, arrayTemp, arrayHum, arrayLight,
const changeColor = function (...args) {
    for (let i = 0; i < 3; i++) {
        args[i] = i !== 2 ? Math.trunc(args[i] / 10) : Math.trunc(args[i] / 100);
        switch (args[i]) {
            case 0:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][0];
                break;
            case 1:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][1];
                break;
            case 2:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][2];
                break;
            case 3:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][3];
                break;
            case 4:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][4];
                break;
            case 5:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][5];
                break;
            case 6:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][6];
                break;
            case 7:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][7];
                break;
            case 8:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][8];
                break;
            default:
                document.querySelector(`.bg${i}`).style.backgroundColor = args[i + 3][9];
        }
    }
};

// Chart
const ctx = document.getElementById('myChart').getContext('2d');
const data = {
    labels: [],
    datasets: [
        {
            type: 'line',
            label: 'Temp',
            data: [],
            backgroundColor: '#FF9F9F',
            borderColor: '#FF9F9F',
        },
        {
            type: 'line',
            label: 'Hum',
            data: [],
            backgroundColor: '#8D9EFF',
            borderColor: '#8D9EFF',
        },
        {
            type: 'line',
            label: 'Light',
            data: [],
            backgroundColor: '#FCDDB0',
            borderColor: '#FCDDB0',
        },
    ],
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sensors Line Chart',
            },
        },
    },
};
Chart.defaults.color = '#fff';
const sensorsChart = new Chart(ctx, config);

const handlingData = arr => {
    const dataSS = arr.map(data => Number(data));
    // (dataSS[0] >= 35 && !light0On) || (dataSS[0] >= 35 && !toggle.classList.contains('act') && showReport(warning));
    // dataSS >= 15 && dataSS < 35 && showReport(good);
    data.datasets[0].data.push(dataSS[0]);
    data.datasets[0].data.length === 13 && data.datasets[0].data.shift();
    data.datasets[1].data.push(dataSS[1]);
    data.datasets[1].data.length === 13 && data.datasets[1].data.shift();
    data.datasets[2].data.push(dataSS[2]);
    data.datasets[2].data.length === 13 && data.datasets[2].data.shift();
    numData[0].textContent = dataSS[0];
    numData[1].textContent = dataSS[1];
    numData[2].textContent = dataSS[2];
    changeColor(dataSS[0], dataSS[1], dataSS[2], colorTempArray, colorHumArray, colorLightArray);
    const day = new Date();
    let time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    data.labels.push(time);
    data.labels.length === 13 && data.labels.shift();
    sensorsChart.update();
};

// setInterval(() => {}, 2000);

socket.on('data-sensors', msg => {
    console.log(msg);
    handlingData(msg);
});

socket.on('led1Status', msg => {
    if (msg === 'on') {
        document.querySelector('.light-bulb-0').src = './img/light/light-on-img.png';
    }
    if (msg === 'off') {
        document.querySelector('.light-bulb-0').src = './img/light/light-off-img.png';
    }
    console.log(`led 1 ${msg}`);
});

socket.on('led2Status', msg => {
    if (msg === 'on') {
        document.querySelector('.light-bulb-1').src = './img/light/light-on-img.png';
        toggle.classList.add('act');
    }
    if (msg === 'off') {
        document.querySelector('.light-bulb-1').src = './img/light/light-off-img.png';
        toggle.classList.remove('act');
    }
    console.log(`led 2 ${msg}`);
});

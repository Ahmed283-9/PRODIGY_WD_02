let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let laps = [];


const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.createElement('ul');

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateTimeDisplay();
  }, 10);
  isRunning = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  startTime = 0;
  elapsedTime = 0;
  laps = [];
  updateTimeDisplay();
  updateLapList();
}

function updateTimeDisplay() {
  const formattedTime = formatTime(elapsedTime);
  const [minutes, seconds, milliseconds] = formattedTime.split(':');
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;
  millisecondsDisplay.textContent = milliseconds;
}

function addLap() {
  const lapTime = formatTime(elapsedTime);
  laps.push(lapTime);
  updateLapList();
}

function updateLapList() {
  lapList.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${index + 1}: ${lap}`;
    lapList.appendChild(lapItem);
  });
  document.querySelector('.stopwatch').appendChild(lapList);
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  }
});

stopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);

lapBtn.addEventListener('click', () => {
  if (isRunning) {
    addLap();
  }
});

let timerInterval;
let stopwatchInterval;
let timerRunning = false;
let stopwatchRunning = false;
let timerStartTime;
let stopwatchStartTime;
let timerPauseTime;
let stopwatchPauseTime;

function updateTimerDisplay(time) {
  const timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.textContent = time;
}

function updateStopwatchDisplay(time) {
  const stopwatchDisplay = document.getElementById("stopwatchDisplay");
  stopwatchDisplay.textContent = time;
}

function startTimer() {
  if (!timerRunning) {
    const hoursInput =
      parseInt(document.getElementById("hoursInput").value) || 0;
    const minutesInput =
      parseInt(document.getElementById("minutesInput").value) || 0;
    const secondsInput =
      parseInt(document.getElementById("secondsInput").value) || 0;

    const totalMilliseconds =
      (hoursInput * 3600 + minutesInput * 60 + secondsInput) * 1000;
    if (totalMilliseconds > 0) {
      timerStartTime = Date.now();
      timerInterval = setInterval(updateTimer, 10);
      timerRunning = true;
      document.getElementById("hoursInput").disabled = true;
      document.getElementById("minutesInput").disabled = true;
      document.getElementById("secondsInput").disabled = true;
      document.getElementById("startTimer").textContent = "Counting...";
      document.getElementById("startTimer").disabled = true;
    }
  }
}

function updateTimer() {
  const currentTime = Date.now();
  const timeDifference = currentTime - timerStartTime;
  const remainingTime = timerPauseTime > 0 ? timerPauseTime : timeDifference;
  const totalMilliseconds =
    (parseInt(document.getElementById("hoursInput").value) || 0) * 3600 * 1000 +
    (parseInt(document.getElementById("minutesInput").value) || 0) * 60 * 1000 +
    (parseInt(document.getElementById("secondsInput").value) || 0) * 1000;

  if (remainingTime >= totalMilliseconds) {
    resetTimer();
    return;
  }

  const milliseconds = totalMilliseconds - remainingTime;
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  updateTimerDisplay(formattedTime);
}

function pauseTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    timerPauseTime = Date.now() - timerStartTime;
    document.getElementById("startTimer").textContent = "Resume";
    document.getElementById("startTimer").disabled = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerPauseTime = 0;
  document.getElementById("hoursInput").disabled = false;
  document.getElementById("minutesInput").disabled = false;
  document.getElementById("secondsInput").disabled = false;
  document.getElementById("startTimer").textContent = "Start";
  document.getElementById("startTimer").disabled = false;
  updateTimerDisplay("00:00:00");
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchStartTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 10);
    stopwatchRunning = true;
    document.getElementById("startStopwatch").textContent = "Counting...";
    document.getElementById("startStopwatch").disabled = true;
  }
}

function updateStopwatch() {
  const currentTime = Date.now();
  const timeDifference = currentTime - stopwatchStartTime;
  const remainingTime =
    stopwatchPauseTime > 0 ? stopwatchPauseTime : timeDifference;
  const milliseconds = remainingTime;
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millisecondsDisplay = Math.floor((milliseconds % 1000) / 10);
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${millisecondsDisplay.toString().padStart(2, "0")}`;
  updateStopwatchDisplay(formattedTime);
}

function pauseStopwatch() {
  if (stopwatchRunning) {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchPauseTime = Date.now() - stopwatchStartTime;
    document.getElementById("startStopwatch").textContent = "Resume";
    document.getElementById("startStopwatch").disabled = false;
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchPauseTime = 0;
  document.getElementById("startStopwatch").textContent = "Start";
  document.getElementById("startStopwatch").disabled = false;
  updateStopwatchDisplay("00:00:00");
}

document.getElementById("startTimer").addEventListener("click", startTimer);
document.getElementById("pauseTimer").addEventListener("click", pauseTimer);
document.getElementById("resetTimer").addEventListener("click", resetTimer);
document
  .getElementById("startStopwatch")
  .addEventListener("click", startStopwatch);
document
  .getElementById("pauseStopwatch")
  .addEventListener("click", pauseStopwatch);
document
  .getElementById("resetStopwatch")
  .addEventListener("click", resetStopwatch);

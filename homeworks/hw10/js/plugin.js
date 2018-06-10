const timer = (function () {

  let countdown,
      timerDisplay,
      endTime,
      alarmSound;

  // Инициализация модуля
  function init(settings) {
    timerDisplay = document.querySelector(settings.timerDisplaySelector);
    endTime = document.querySelector(settings.endTimeSelector);
    alarmSound = new Audio(settings.alarmSound);
    return this;
  }

  function start(seconds) {
    if(typeof seconds !== "number") return new Error('Please provide seconds!');

    const now = Date.now();
    const then = now + seconds * 1000;

    stopBtn.style.display = 'inline-block';

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
      const secondsLeft = Math.round( (then - Date.now()) / 1000 );
      if (secondsLeft < 0) {
        clearInterval(countdown);
        alarmSound.play();
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000);

    return this;
  }

  function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const reminderHours = hours % 24;
    const reminderMinutes = minutes % 60;
    const reminderSeconds = seconds % 60;

    const display = `${(days > 0) ? (days + ':') : ""}${reminderHours > 0 ? (reminderHours < 10) ? '0' + reminderHours + ':' : reminderHours + ':': ''}${reminderMinutes < 10 ? '0' : ''}${reminderMinutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const endDate = end.toLocaleDateString();
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Be back at ${endDate} ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  function stop(seconds) {
    clearInterval(countdown);
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }

  return {
    init,
    start,
    stop
  }
})();

const buttons = document.querySelectorAll('[data-time]');

timer.init({
  timerDisplaySelector: '.display__time-left',
  endTimeSelector :'.display__end-time',
  alarmSound: 'audio/bell.mp3'
});

// Start timer on click
function startTimer(e) {
  const seconds = Number(this.dataset.time);
  timer.start(seconds);
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));

function stopTimer(e) {
  timer.stop();
}

const stopBtn = document.querySelector('.stop__button');
stopBtn.addEventListener('click', stopTimer);

const form = document.forms.customForm;

form.addEventListener('submit', function(e){
    e.preventDefault();
    let seconds = Number(form.elements['minutes'].value) * 60;
    timer.start(seconds);
    form.elements['minutes'].value = '';
});





























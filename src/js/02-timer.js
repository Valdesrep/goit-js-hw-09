import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
let newDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      Notiflix.Notify.failure('Choose a date for the countdown');
      return;
    }
    refs.startBtn.disabled = false;

    newDate = selectedDates[0];
  },
};

flatpickr(refs.input, options);

const counter = {
  oldDate: newDate,
  markup: null,
  convert: null,

  onClick() {
    if (this.oldDate !== newDate) {
      this.oldDate = newDate;
    }
    const intervalId = setInterval(() => {
      this.markup = addLeadingZero(convertMs(this.oldDate - Date.now()));
      this.convert = Math.round((this.oldDate % Date.now()) / 1000);
      timerValue(this.markup);

      if (this.convert === 1) {
        clearInterval(intervalId);
        refs.startBtn.disabled = true;
        return;
      }
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', counter.onClick);

function timerValue({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  days = String(days).padStart(2, '0');
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

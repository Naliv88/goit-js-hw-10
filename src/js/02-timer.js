import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStartRef = document.querySelector('[data-start]');
const spanDaysRef = document.querySelector('[data-days]');
const spanHoursRef = document.querySelector('[data-hours]');
const spanMinutesf = document.querySelector('[data-minutes');
const spanSecondsRef = document.querySelector('[data-seconds]');

let msSelected = null;
let idInterval = null;

btnStartRef.disabled = true;

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        msSelected = selectedDates[0].getTime();
        if (msSelected < new Date().getTime()) {
            Notiflix.Notify.failure('Please choose a date in the future.')
            return;
        }
    
        btnStartRef.disabled = false;
    },
 
    minDate: "today",
   
});

let object = {};

const onCountTime = () => {
    idInterval = setInterval(() => {
        const diff = msSelected - new Date().getTime();
        if (diff <= 0) {
            clearTimeout(idInterval);
            return;
        };
        object = convertMs(diff);
        onChangeContent(object);
    }, 1000)
};

btnStartRef.addEventListener("click", onCountTime);

function addLeadingZero(value) {
    console.log(value);
    console.log(String(value));
    return String(value).padStart(2, 0);

};

function onChangeContent({ days, hours, minutes, seconds }) {
    spanDaysRef.textContent = addLeadingZero(days);
    spanHoursRef.textContent = addLeadingZero(hours);
    spanMinutesf.textContent = addLeadingZero(minutes);
    spanSecondsRef.textContent = addLeadingZero(seconds);
};

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


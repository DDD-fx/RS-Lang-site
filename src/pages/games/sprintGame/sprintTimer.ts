import { getElement } from '../../../utils/tools';

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 30;
const ALERT_THRESHOLD = 15;

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = 0;
const remainingPathColor = COLOR_CODES.info.color;

function formatTime(time: number): string {
  const seconds: number = time % 60;
  return `${seconds}`;
}

function onTimesUp() {
  clearInterval(timerInterval);
}

function setRemainingPathColor(timeLeftValue: number): void {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeftValue <= alert.threshold) {
    document.getElementById('base-timer-path-remaining')?.classList.remove(warning.color);
    document.getElementById('base-timer-path-remaining')?.classList.add(alert.color);
  } else if (timeLeftValue <= warning.threshold) {
    document.getElementById('base-timer-path-remaining')?.classList.remove(info.color);
    document.getElementById('base-timer-path-remaining')?.classList.add(warning.color);
  }
}

const timerTemplate = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">60</span>
</div>
`;

function calculateTimeFraction(): number {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray(): void {
  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
  document
    .getElementById('base-timer-path-remaining')
    ?.setAttribute('stroke-dasharray', circleDasharray);
}

function startTimer() {
  timerInterval = window.setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById('base-timer-label')!.innerHTML = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

export function drawSprintTimer(): void {
  const wrapper = getElement('sprint-game-wrapper') as HTMLElement;
  wrapper.insertAdjacentHTML('afterbegin', timerTemplate);
  startTimer();
}

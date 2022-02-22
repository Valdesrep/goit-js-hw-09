const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBnt: document.querySelector('[data-stop]'),
  body: document.body,
};
let timerId = null;

refs.startBtn.addEventListener('click', onStartColorSwitch);
refs.stopBnt.addEventListener('click', onStopColorSwinch);

function onStartColorSwitch() {
  refs.startBtn.disabled = true;
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStopColorSwinch() {
  refs.startBtn.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

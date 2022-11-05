
const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

let intervalChangColor = null;

startBtnRef.addEventListener("click", () => {
    stopBtnRef.disabled = false;
    startBtnRef.disabled = true;
    intervalChangColor = setInterval(() => {
         bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000);
});


stopBtnRef.addEventListener("click", () => {
    startBtnRef.disabled = false;
    clearInterval(intervalChangColor);
    stopBtnRef.disabled = true;
    
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
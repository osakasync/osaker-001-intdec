import { getTextWidth } from "./utils.js";
import { triggerOverflowFeedback } from "./feedback.js";
import { handleInputSubmit } from "./decomposer.js";

const input = document.getElementById("user-input");
const cursor = document.getElementById("cursor");
const prompt = document.getElementById("prompt");
const terminalWindow = document.querySelector(".window");
const inputLine = document.getElementById("input-line");

function resetOverflowOnResize() {
  const inputEl = document.getElementById("user-input");
  const promptEl = document.getElementById("prompt");
  const windowEl = document.querySelector(".window");

  const terminalWidth = windowEl.clientWidth;
  const textWidth = promptEl.offsetWidth + getTextWidth(inputEl.value, inputEl);

  if (textWidth > terminalWidth - 16) {
    inputEl.value = "";
    updateCursorPosition();
    triggerOverflowFeedback();

    const scrollable = document.getElementById("terminal") || document.body;
    scrollable.scrollLeft = 0;
  }
}


export function setupInputHandlers() {
  window.addEventListener("resize", resetOverflowOnResize);

  input.addEventListener("input", refreshInputUI);


  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSubmit();
    }
  });

  input.addEventListener("beforeinput", (e) => {
    if (e.inputType.startsWith("delete") || e.inputType === "insertLineBreak") return;

    if (!canAcceptChar(e.data, input, terminalWindow, prompt)) {
      e.preventDefault();
      triggerOverflowFeedback();
    }
  });

  input.addEventListener("focus", () => {
    cursor.style.visibility = "visible";
  });

  input.addEventListener("blur", () => {
    cursor.style.visibility = "hidden";
  });

  if (document.activeElement === input) {
    cursor.style.visibility = "visible";
  }

  inputLine.addEventListener("click", () => {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  });

  anime({
    targets: '#cursor',
    opacity: [0, 1],
    duration: 500,
    easing: 'easeInOutSine',
    loop: true,
    direction: 'alternate'
  });


  updateCursorPosition();
}

export function updateCursorPosition() {
  const w = getTextWidth(input.value, input);
  cursor.style.left = `${w + 2}px`;
}

export function canAcceptChar(char, input, terminalWindow, prompt) {
  const width = getTextWidth(input.value + char, input);
  const maxWidth = terminalWindow.clientWidth - prompt.offsetWidth - 36;
  return width <= maxWidth;
}

export function refreshInputUI() {
  input.style.width = (getTextWidth(input.value, input) + 4) + "px";
  updateCursorPosition();
}
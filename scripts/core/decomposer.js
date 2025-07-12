import { scrollToBottom, getTextWidth } from "./utils.js";
import { updateCursorPosition } from "./ui.js";

const output = document.getElementById("output");
const input = document.getElementById("user-input");
const prompt = document.getElementById("prompt");

export function initBootSequence() {
  const bootLines = [
    "IntDecomposer v1.0",
    "Initializing analysis core...",
    "System ready. Enter your favorite integer:"
  ];

  bootLines.forEach((line, i) => {
    setTimeout(() => typeLine(line), i * 500);
  });
}

function typeLine(text) {
  const line = document.createElement("div");
  output.appendChild(line);
  scrollToBottom();
  let i = 0;
  const interval = setInterval(() => {
    line.textContent += text[i++];
    scrollToBottom();
    if (i >= text.length) clearInterval(interval);
  }, 20);
}

export function handleInputSubmit() {
  const val = input.value.trim();
  if (val !== "") {
    const userLine = document.createElement("div");
    userLine.innerHTML = `<span style="color:var(--accent-color); transition: color 0.2s ease;">INTDEC:/core/bin&gt;</span> ${val}`;
    output.appendChild(userLine);

    const result = 'fake result for now'
    const response = document.createElement("div");
    response.textContent = result;
    output.appendChild(response);

    input.value = "";
    updateCursorPosition();
    scrollToBottom();
  }
}

const terminalElement = document.getElementById("terminal");

export function scrollToBottom() {
  terminalElement.scrollTop = terminalElement.scrollHeight;
}

const measureCanvas = document.createElement("canvas");
const measureCtx = measureCanvas.getContext("2d");

export function getTextWidth(text, inputElement) {
  const style = getComputedStyle(inputElement);
  measureCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  return measureCtx.measureText(text).width;
}

export function getCharWidth(inputElement) {
  const style = getComputedStyle(inputElement);
  measureCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  return measureCtx.measureText("A").width;
}


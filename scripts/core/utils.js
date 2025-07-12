export function scrollToBottom() {
  const terminal = document.getElementById("terminal");
  terminal.scrollTop = terminal.scrollHeight;
}

export function getTextWidth(text, inputElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const style = getComputedStyle(inputElement);
  ctx.font = `${style.fontSize} ${style.fontFamily}`;
  return ctx.measureText(text).width;
}

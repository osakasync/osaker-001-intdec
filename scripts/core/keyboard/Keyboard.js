import { buildKeyboard } from "./KeyboardBuilder.js";
import { createKeyHandler } from "./KeyHandler.js";

export function initKeyboard() {
  const keyboard = document.getElementById("keyboard");
  const input = document.getElementById("user-input");
  const terminalWindow = document.querySelector(".window");
  const prompt = document.getElementById("prompt");

  const layout = [
    ["Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "←"],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "\\"],
    ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "Enter"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", "Shift"],
    ["Space"]
  ];

  const handleClick = createKeyHandler(input, terminalWindow, prompt, keyboard);
  buildKeyboard(layout, keyboard, handleClick);
}

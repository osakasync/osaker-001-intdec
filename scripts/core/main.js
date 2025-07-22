import { setupInputHandlers } from "./ui.js";
import { initAmbientEffect } from "./ambient.js";
import { initKeyboard } from "./keyboard/Keyboard.js";
import { initKeyboardToggle } from "./keyboard/KeyboardToggle.js";
import { initBootSequence } from './boot/bootcontroller.js';

window.addEventListener("DOMContentLoaded", () => {
  setupInputHandlers();
  initAmbientEffect();
  initKeyboard();
  initKeyboardToggle();
  initBootSequence();
});

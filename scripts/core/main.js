import { initBootSequence } from "./decomposer.js";
import { setupInputHandlers } from "./ui.js";
import { initAmbientEffect } from "./ambient.js";
import { initKeyboard } from "./keyboard/Keyboard.js";

window.addEventListener("DOMContentLoaded", () => {
  initBootSequence();
  setupInputHandlers();
  initAmbientEffect();
  initKeyboard();
});

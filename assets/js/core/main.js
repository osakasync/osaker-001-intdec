import { setupInputHandlers } from './ui.js';
import { initAmbientEffect } from './ambient/initAmbientEffect.js';
import { initKeyboard } from './keyboard/Keyboard.js';
import { initKeyboardToggle } from './keyboard/KeyboardToggle.js';
import { initBootSequence } from './boot/bootcontroller.js';

window.addEventListener('DOMContentLoaded', () => {
	setupInputHandlers();
	initAmbientEffect();
	initKeyboard();
	initKeyboardToggle();
	initBootSequence();
});

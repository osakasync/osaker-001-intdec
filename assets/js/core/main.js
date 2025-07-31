import { setupInputHandlers } from './ui.js';
import { initAmbientEffect } from './ambient/initAmbientEffect.js';
import { initKeyboard } from './keyboard/Keyboard.js';
import { initKeyboardToggle } from './keyboard/KeyboardToggle.js';
import { initBootSequence } from './boot/bootcontroller.js';
import SoundManager from './sound/SoundManager.js';

window.addEventListener('DOMContentLoaded', () => {
	SoundManager.init();
	setupInputHandlers();
	initAmbientEffect();
	initKeyboard();
	initKeyboardToggle();
	initBootSequence();
});

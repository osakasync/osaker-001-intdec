import { ACCENT_COLOR, ACCENT_RGB, FATAL_ERROR_COLOR } from './settings.js';
import { hexToRgb } from './utils.js';

let overflowResetTimeout;
const windowEl = document.querySelector('.window');
const keyboardEl = document.querySelector('#keyboard');
const triggerEl = document.querySelector('#keyboard-trigger');
const accents = document.querySelectorAll('#prompt, #cursor');

export function triggerOverflowFeedback(customColor = FATAL_ERROR_COLOR) {
	const rgb = hexToRgb(customColor) || [255, 0, 0];

	windowEl.classList.remove('shake');
	keyboardEl.classList.remove('shake');
	triggerEl.classList.remove('shake');

	requestAnimationFrame(() => {
		windowEl.classList.add('shake');
		keyboardEl.classList.add('shake');
		triggerEl.classList.add('shake');
	});

	accents.forEach((el) => (el.style.color = customColor));
	document.documentElement.style.setProperty('--accent-color', customColor);
	document.documentElement.style.setProperty('--accent-rgb', rgb);

	clearTimeout(overflowResetTimeout);
	overflowResetTimeout = setTimeout(() => {
		windowEl.classList.remove('shake');
		keyboardEl.classList.remove('shake');
		triggerEl.classList.remove('shake');
		accents.forEach((el) => (el.style.color = ''));
		document.documentElement.style.setProperty('--accent-color', ACCENT_COLOR);
		document.documentElement.style.setProperty('--accent-rgb', ACCENT_RGB);
	}, 600);
}

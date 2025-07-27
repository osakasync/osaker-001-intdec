import { getTextWidth, getCharWidth } from './utils.js';
import { triggerOverflowFeedback } from './feedback.js';
import { handleInputSubmit } from './decomposer.js';

const input = document.getElementById('user-input');
const cursor = document.getElementById('cursor');
const prompt = document.getElementById('prompt');
const terminalWindow = document.querySelector('.window');
const inputLine = document.getElementById('input-line');
const output = document.getElementById('output');

function resetOverflowOnResize() {
	const terminalWidth = terminalWindow.clientWidth;
	const textWidth = prompt.offsetWidth + getTextWidth(input.value, input);

	if (textWidth > terminalWidth - 16) {
		input.value = '';
		updateCursorPosition();
		triggerOverflowFeedback();

		const scrollable = document.getElementById('terminal') || document.body;
		scrollable.scrollLeft = 0;
	}
}

export function setupInputHandlers() {
	window.addEventListener('resize', resetOverflowOnResize);

	input.addEventListener('input', refreshInputUI);

	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleInputSubmit();
		}
	});

	input.addEventListener('beforeinput', (e) => {
		if (e.inputType.startsWith('delete') || e.inputType === 'insertLineBreak')
			return;

		if (!canAcceptChar(e.data, input, terminalWindow, prompt)) {
			e.preventDefault();
			triggerOverflowFeedback();
		}
	});

	input.addEventListener('focus', () => {
		cursor.style.visibility = 'visible';
	});

	input.addEventListener('blur', () => {
		cursor.style.visibility = 'hidden';
	});

	if (document.activeElement === input) {
		cursor.style.visibility = 'visible';
	}

	inputLine.addEventListener('click', () => {
		if (document.activeElement !== input) {
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		}
	});

	anime({
		targets: '#cursor',
		opacity: [0, 1],
		duration: 500,
		easing: 'easeInOutSine',
		loop: true,
		direction: 'alternate',
	});

	['input', 'click', 'keyup', 'focus', 'mouseup'].forEach((evt) =>
		input.addEventListener(evt, () =>
			requestAnimationFrame(updateCursorPosition)
		)
	);

	updateCursorPosition();
}

export function updateCursorPosition() {
	const caretIndex = input.selectionStart ?? input.value.length;
	const isAtEnd = caretIndex === input.value.length;
	const textBeforeCaret = input.value.slice(0, caretIndex);
	const width = getTextWidth(textBeforeCaret, input);
	const charWidth = getCharWidth(input);

	cursor.classList.toggle('block-cursor', !isAtEnd);

	const offset = isAtEnd ? 0 : -charWidth - 1;
	cursor.style.left = `${width + offset}px`;
}

export function canAcceptChar(char, input, terminalWindow, prompt) {
	const width = getTextWidth(input.value + char, input);
	const maxWidth = terminalWindow.clientWidth - prompt.offsetWidth - 36;
	return width <= maxWidth;
}

export function refreshInputUI() {
	input.style.width = getTextWidth(input.value, input) + 4 + 'px';
	updateCursorPosition();
}

export function clearUi() {
	output.textContent = '> Type "help" to see all commands:';
}

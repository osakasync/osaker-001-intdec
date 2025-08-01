import { triggerOverflowFeedback } from '../feedback.js';
import { refreshInputUI, canAcceptChar } from '../ui.js';
import { animateKeyPress } from './KeyAnimator.js';
import SoundManager from '../sound/SoundManager.js';

export function createKeyHandler(input, terminalWindow, prompt, keyboard) {
	let capsEnabled = false;
	let shiftEnabled = false;

	const shiftSymbols = {
		1: '!',
		2: '@',
		3: '#',
		4: '$',
		5: '%',
		6: '^',
		7: '&',
		8: '*',
		9: '(',
		0: ')',
		'\\': '|',
	};

	let shiftButtons = [];

	function getShiftButtons() {
		if (shiftButtons.length === 0) {
			shiftButtons = Array.from(
				keyboard.querySelectorAll('[data-action="shift"]')
			);
			console.log('[getShiftButtons] initialized:', shiftButtons.length);
		}
		return shiftButtons;
	}

	function isAnyShiftActive() {
		return getShiftButtons().some((btn) => btn.classList.contains('active'));
	}

	function handleBackspace() {
		input.value = input.value.slice(0, -1);
	}

	function handleCharacterInput(char) {
		let displayChar = char;

		if (/[a-z]/i.test(char)) {
			displayChar =
				capsEnabled || shiftEnabled ? char.toUpperCase() : char.toLowerCase();
		} else if (shiftEnabled && shiftSymbols[char]) {
			displayChar = shiftSymbols[char];
		}

		if (canAcceptChar(displayChar, input, terminalWindow, prompt)) {
			input.value += displayChar;
		} else {
			triggerOverflowFeedback();
		}

		if (shiftEnabled) {
			shiftEnabled = false;
			getShiftButtons().forEach((btn) => {
				const wasActive = btn.classList.contains('active');
				if (wasActive) {
					btn.classList.remove('active');
					animateKeyPress(btn, true, false);
				}
			});
			updateKeyCase();
		}
	}

	function handleEnter() {
		input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
	}

	function handleCapsLock(btn) {
		capsEnabled = !capsEnabled;
		btn.classList.toggle('active');
		updateKeyCase();
	}

	function handleShift(clickedBtn) {
		clickedBtn.classList.toggle('active');
		shiftEnabled = isAnyShiftActive();
		updateKeyCase();
	}

	function updateKeyCase() {
		keyboard.querySelectorAll('.key').forEach((k) => {
			const base = k.dataset.base;
			if (!base) return;

			if (/[a-z]/i.test(base)) {
				k.textContent =
					capsEnabled || shiftEnabled ? base.toUpperCase() : base.toLowerCase();
			} else if (shiftSymbols[base]) {
				k.textContent = shiftEnabled ? shiftSymbols[base] : base;
			}
		});
	}

	return function handleClick(e) {
		const btn = e.target.closest('.key');
		if (!btn) return;

		const key = btn.dataset.base || btn.textContent;
		const action = btn.dataset.action;
		const wasActive = btn.classList.contains('active');

		switch (action) {
			case 'backspace':
				handleBackspace();
				break;
			case 'space':
				handleCharacterInput(' ');
				break;
			case 'enter':
				handleEnter();
				break;
			case 'capslock':
				handleCapsLock(btn);
				break;
			case 'shift':
				handleShift(btn);
				break;
			default:
				if (key.length === 1) {
					handleCharacterInput(key);
				}
				break;
		}

		SoundManager.playRandomKeySound();
		animateKeyPress(btn, wasActive, btn.classList.contains('active'));
		refreshInputUI();
		input.focus();
	};
}

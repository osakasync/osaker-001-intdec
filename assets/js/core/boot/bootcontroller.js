import { initWelcomeMessage } from '../decomposer.js';
import { applySettings } from '../settings.js';

export function initBootSequence() {
	const overlay = document.getElementById('boot-overlay');
	const powerButton = document.getElementById('power-button');
	const bootText = document.getElementById('boot-text');
	const skipButton = document.getElementById('skip-boot');
	const bootUi = document.getElementById('boot-ui');

	const lines = [
		'> INTDEC BIOS v1.0 initializing...',
		'> Scanning integer bus...',
		'> Loading decomposition module...',
		'> Establishing prime field interface...',
		'> Initializing UI...',
		'> [==========          ]',
		'> [==================> ]',
		'> System ready. Starting up UI',
	];

	let i = 0;
	let skip = false;

	function finishBoot() {
		overlay.classList.add('hidden');
		applySettings();
		initWelcomeMessage();
		document.querySelector('#user-input').focus();
		document
			.querySelector('#keyboard')
			.style.setProperty('pointer-events', 'auto');
	}

	function typeNextLine() {
		if (skip) return;

		if (i < lines.length) {
			bootText.innerText += lines[i++] + (i === lines.length ? '' : '\n');

			const randomDelay = Math.floor(Math.random() * 600) + 400;

			const delay = i === 6 ? 800 : randomDelay;

			setTimeout(typeNextLine, delay);
		} else {
			let dotCount = 0;
			const dotInterval = setInterval(() => {
				if (skip) {
					clearInterval(dotInterval);
					return;
				}
				if (dotCount < 3) {
					bootText.innerText += '.';
					dotCount++;
				} else {
					clearInterval(dotInterval);
					setTimeout(finishBoot, 200);
				}
			}, 650);
		}
	}

	powerButton.addEventListener('click', () => {
		powerButton.classList.add('hidden');
		skipButton.classList.add('hidden');
		bootUi.classList.add('accent-stripes');
		bootText.innerText = '';

		typeNextLine();

		window.triggerRadialPulse();
		setTimeout(() => {
			window.triggerRadialPulse();
		}, 200);
	});

	skipButton.addEventListener('click', () => {
		skip = true;
		bootText.innerText = '> System ready. Starting up UI...';
		finishBoot();
		window.triggerRadialPulse();
		setTimeout(() => {
			window.triggerRadialPulse();
		}, 200);
	});
}

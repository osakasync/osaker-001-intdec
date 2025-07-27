import { initWelcomeMessage } from '../decomposer.js';

export function initBootSequence() {
	const overlay = document.getElementById('boot-overlay');
	const powerButton = document.getElementById('power-button');
	const bootText = document.getElementById('boot-text');
	const skipButton = document.getElementById('skip-boot');

	const lines = [
		'> INTDEC BIOS v0.1 initializing...',
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
		document.documentElement.style.setProperty('--accent-color', '#0f0');
		document.documentElement.style.setProperty('--accent-rgb', '0,255,0');
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

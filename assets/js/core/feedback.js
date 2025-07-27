let overflowResetTimeout;

export function hexToRgb(hex) {
	hex = hex.replace(/^#/, '');

	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((char) => char + char)
			.join('');
	}

	// Convert the hex string to a number, then extract r, g, b colors by bit shifting:
	// Red is the top 8 bits (>> 16)
	// Green is the middle 8 bits (>> 8)
	// Blue is the lowest 8 bits (& 255)
	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return `${r}, ${g}, ${b}`;
}

export function triggerOverflowFeedback(customColor = '#f00') {
	const windowEl = document.querySelector('.window');
	const keyboardEl = document.querySelector('#keyboard');
	const triggerEl = document.querySelector('#keyboard-trigger');
	const accents = document.querySelectorAll('#prompt, #cursor');

	const rgb = hexToRgb(customColor) || [255, 0, 0];

	windowEl.classList.remove('shake');
	keyboardEl.classList.remove('shake');
	triggerEl.classList.remove('shake');
	void windowEl.offsetWidth;
	windowEl.classList.add('shake');
	keyboardEl.classList.add('shake');
	triggerEl.classList.add('shake');

	accents.forEach((el) => (el.style.color = customColor));
	document.documentElement.style.setProperty('--accent-color', customColor);
	document.documentElement.style.setProperty('--accent-rgb', rgb);

	clearTimeout(overflowResetTimeout);
	overflowResetTimeout = setTimeout(() => {
		windowEl.classList.remove('shake');
		keyboardEl.classList.remove('shake');
		triggerEl.classList.remove('shake');
		accents.forEach((el) => (el.style.color = ''));
		document.documentElement.style.setProperty('--accent-color', '#0f0');
		document.documentElement.style.setProperty('--accent-rgb', '0, 255, 0');
	}, 600);
}

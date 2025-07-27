const terminalElement = document.getElementById('terminal');

export function hexToRgb(hex) {
	hex = hex.replace(/^#/, '');
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((c) => c + c)
			.join('');
	}
	const num = parseInt(hex, 16);
	const r = (num >> 16) & 255;
	const g = (num >> 8) & 255;
	const b = num & 255;
	return `${r}, ${g}, ${b}`;
}

export function scrollToBottom() {
	terminalElement.scrollTop = terminalElement.scrollHeight;
}

const measureCanvas = document.createElement('canvas');
const measureCtx = measureCanvas.getContext('2d');

export function getTextWidth(text, inputElement) {
	const style = getComputedStyle(inputElement);
	measureCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
	return measureCtx.measureText(text).width;
}

export function getCharWidth(inputElement) {
	const style = getComputedStyle(inputElement);
	measureCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
	return measureCtx.measureText('A').width;
}

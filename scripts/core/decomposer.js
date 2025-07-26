import { scrollToBottom } from './utils.js';
import { updateCursorPosition } from './ui.js';
import { parseCommand } from './parser/parseManager.js';

const output = document.getElementById('output');
const input = document.getElementById('user-input');
const prompt = document.getElementById('prompt');
let bootCompleted = false;

export function initWelcomeMessage() {
	const bootLines = [
		'+-----------------------------------------+',
		'|   I N T D E C   v1.1  -  integer tool   |',
		'|    (C) 2025, OSAKASYNC TERMINAL BIOS    |',
		'+-----------------------------------------+',
		"> Type 'help' to see all commands:",
	];

	bootLines.forEach((line, i) => {
		const isLast = i === bootLines.length - 1;
		setTimeout(() => {
			typeLine(line, isLast ? 'regular' : 'welcome', () => {
				if (isLast) bootCompleted = true;
			});
		}, i * 150);
	});
}

function typeLine(text, type = 'regular', onFinish = () => {}) {
	const line = document.createElement('div');
	line.className = type;
	output.appendChild(line);
	scrollToBottom();
	let i = 0;
	const interval = setInterval(() => {
		line.textContent += text[i++];
		scrollToBottom();
		if (i >= text.length) {
			clearInterval(interval);
			onFinish();
		}
	}, 20);
}

export function handleInputSubmit() {
	if (!bootCompleted) {
		return;
	}
	const val = input.value.trim();

	const userLine = document.createElement('div');
	userLine.innerHTML = `<span style="color:var(--accent-color); transition: color 0.2s ease;">INTDEC:/core/bin&gt;</span> ${val}`;
	output.appendChild(userLine);

	const result = parseCommand(val);
	input.value = '';

	if (result == null) {
		return;
	}

	const response = document.createElement('div');
	response.textContent = (result[0] !== '>' ? '> ' : '') + result;
	output.appendChild(response);

	updateCursorPosition();
	scrollToBottom();
}

import { MAX_HISTORY_ENTRIES } from '../settings.js';

const history = [];
let historyIndex = -1;

export function addToHistory(command) {
	if (command.trim() && command !== history[history.length - 1]) {
		history.push(command);
		if (history.length > MAX_HISTORY_ENTRIES) {
			history.shift();
		}
	}
	historyIndex = history.length;
}

export function getPreviousHistory() {
	if (historyIndex > 0) historyIndex--;
	return history[historyIndex] ?? '';
}

export function getNextHistory() {
	if (historyIndex < history.length - 1) {
		historyIndex++;
		return history[historyIndex];
	} else {
		historyIndex = history.length;
		return '';
	}
}

export function resetHistoryIndex() {
	historyIndex = history.length;
}

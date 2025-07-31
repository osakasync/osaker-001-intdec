import commandMap from './commandMap.js';
import { triggerOverflowFeedback } from '../feedback.js';
import { WARNING_ERROR_COLOR, FATAL_ERROR_COLOR } from '../settings.js';
import SoundManager from '../sound/SoundManager.js';

export function parseCommand(input) {
	if (input.trim() === '') {
		triggerOverflowFeedback(WARNING_ERROR_COLOR);
		return `Empty input. Type "help" to see all commands.`;
	}

	const [commandRaw, ...rawArgs] = input.trim().split(/\s+/);
	const command = commandRaw.toLowerCase();
	const entry = commandMap[command];

	if (!entry) {
		triggerOverflowFeedback(FATAL_ERROR_COLOR);
		return `Unknown command: "${command}". Type "help" to see all commands.`;
	}

	const args = rawArgs.map((arg) => arg);

	if (args.length !== entry.argCount) {
		triggerOverflowFeedback(WARNING_ERROR_COLOR);
		return `Mismatched arg count. Usage: ${entry.help}`;
	}

	try {
		const result = entry.fn(...args);
		SoundManager.playOk();
		return result;
	} catch (e) {
		triggerOverflowFeedback(FATAL_ERROR_COLOR);
		return `Error in "${command}": ${e.message}`;
	}
}

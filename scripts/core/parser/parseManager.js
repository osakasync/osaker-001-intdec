import commandMap from './commandMap.js';
import { triggerOverflowFeedback } from '../feedback.js';

export function parseCommand(input) {
	if (input.trim() === '') {
		triggerOverflowFeedback('#ff0');
		return `Empty input. Type "help" to see all commands.`;
	}
	const [commandRaw, ...rawArgs] = input.trim().split(/\s+/);
	const command = commandRaw.toLowerCase();
	const entry = commandMap[command];

	if (!entry) {
		triggerOverflowFeedback();
		return `Unknown command: "${command}". Type "help" to see all commands.`;
	}

	const args = rawArgs.map((arg) => (isNaN(arg) ? arg : Number(arg)));
	console.log(entry);

	console.log(args.length, entry.argCount);

	if (args.length !== entry.argCount) {
		triggerOverflowFeedback('#ff0');
		return `Mismatched arg count. Usage: ${entry.help}`;
	}

	try {
		return entry.fn(...args);
	} catch (e) {
		triggerOverflowFeedback();
		return `Error in "${command}": ${e.message}`;
	}
}

import IntDecomposer from '../../logic/intdecomposer.js';
import { clearUi } from '../ui.js';
import SoundManager from '../sound/SoundManager.js';

const commandMap = {
	binary: {
		fn: IntDecomposer.getBinary.bind(IntDecomposer),
		help: 'binary <number> – returns binary representation',
	},
	octal: {
		fn: IntDecomposer.getOctal.bind(IntDecomposer),
		help: 'octal <number> – returns octal representation',
	},
	hex: {
		fn: IntDecomposer.getHex.bind(IntDecomposer),
		help: 'hex <number> – returns hexadecimal representation',
	},
	base: {
		fn: IntDecomposer.getBase.bind(IntDecomposer),
		help: 'base <number> <base> – converts number to a given base',
	},
	digitsum: {
		fn: IntDecomposer.getDigitSum.bind(IntDecomposer),
		help: 'digitsum <number> – sum of digits',
	},
	bitlength: {
		fn: IntDecomposer.getBitLength.bind(IntDecomposer),
		help: 'bitlength <number> – bit length of number',
	},
	ispalindrome: {
		fn: IntDecomposer.isPalindrome.bind(IntDecomposer),
		help: 'ispalindrome <number> – is it a palindrome?',
	},
	isperfectsquare: {
		fn: IntDecomposer.isPerfectSquare.bind(IntDecomposer),
		help: 'isperfectsquare <number> - is it a perfect square?',
	},
	isprime: {
		fn: IntDecomposer.isPrime.bind(IntDecomposer),
		help: 'isprime <number> – is it prime?',
	},
	poweroftwo: {
		fn: IntDecomposer.isPowerOfTwo.bind(IntDecomposer),
		help: 'poweroftwo <number> – is it a power of two?',
	},
	factors: {
		fn: IntDecomposer.getPrimeFactors.bind(IntDecomposer),
		help: 'factors <number> – prime factorization',
	},
	divisors: {
		fn: IntDecomposer.getDivisors.bind(IntDecomposer),
		help: 'divisors <number> – all divisors of number',
	},
	collatz: {
		fn: IntDecomposer.getCollatzSteps.bind(IntDecomposer),
		help: 'collatz <number> – Collatz step count',
	},
	scientific: {
		fn: IntDecomposer.getScientificNotation.bind(IntDecomposer),
		help: 'scientific <number> – scientific notation',
	},
	unicode: {
		fn: IntDecomposer.getUnicodeChar.bind(IntDecomposer),
		help: 'unicode <number> – Unicode character',
	},
	roman: {
		fn: IntDecomposer.getRomanNumeral.bind(IntDecomposer),
		help: 'roman <number> – Roman numeral',
	},
	funfact: {
		fn: IntDecomposer.getFunFact.bind(IntDecomposer),
		help: 'funfact <number> – trivia for that number',
	},
	summary: {
		fn: IntDecomposer.getSummary.bind(IntDecomposer),
		help: 'summary <number> – full breakdown',
	},
	cls: {
		fn: clearUi,
		help: 'cls – clears the output window',
	},
	mute: {
		fn: () => (SoundManager.toggleMute() ? 'Sound muted' : 'Sound unmuted'),
		help: 'mute - mutes/unmutes the sound effects',
	},
	help: {
		fn: () =>
			Object.entries(commandMap)
				.filter(([name]) => name !== 'help')
				.map(([name, { help }]) => `> ${help}`)
				.join('\n'),
		help: 'help – show this list',
	},
};

// auto add argCount
for (const entry of Object.values(commandMap)) {
	if (entry.argCount === undefined) {
		entry.argCount = entry.fn.length;
	}
}

export default commandMap;

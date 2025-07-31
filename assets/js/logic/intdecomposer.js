//class used to get detailed info about the integer structure/info
export default class IntDecomposer {
	static romanMap = [
		//overbar notation (for > 3999)
		{ value: 1000000, symbol: 'M̅' },
		{ value: 900000, symbol: 'C̅M̅' },
		{ value: 500000, symbol: 'D̅' },
		{ value: 400000, symbol: 'C̅D̅' },
		{ value: 100000, symbol: 'C̅' },
		{ value: 90000, symbol: 'X̅C̅' },
		{ value: 50000, symbol: 'L̅' },
		{ value: 40000, symbol: 'X̅L̅' },
		{ value: 10000, symbol: 'X̅' },
		{ value: 9000, symbol: 'I̅X̅' },
		{ value: 5000, symbol: 'V̅' },
		{ value: 4000, symbol: 'I̅V̅' },
		//standard roman numerals
		{ value: 1000, symbol: 'M' },
		{ value: 900, symbol: 'CM' },
		{ value: 500, symbol: 'D' },
		{ value: 400, symbol: 'CD' },
		{ value: 100, symbol: 'C' },
		{ value: 90, symbol: 'XC' },
		{ value: 50, symbol: 'L' },
		{ value: 40, symbol: 'XL' },
		{ value: 10, symbol: 'X' },
		{ value: 9, symbol: 'IX' },
		{ value: 5, symbol: 'V' },
		{ value: 4, symbol: 'IV' },
		{ value: 1, symbol: 'I' },
	];

	static funFacts = {
		0: 'zero is the origin – nothing and everything',
		1: 'the multiplicative identity – the loneliest number',
		2: 'the only even prime – a binary buddy',
		3: 'triangles, triforces, and triple threats – power in threes',
		7: "often called the world's favorite number",
		8: 'infinity on its side – or a lucky clover in disguise',
		9: 'the last single digit. Known for its divisibility tricks',
		10: 'a nice round number – the base of our number system',
		13: 'unlucky for some… but spooky for others',
		21: "what's 9 + 10?",
		24: 'number of hours in a day',
		33: 'a master number in numerology. Powerful and symbolic',
		42: 'the Answer to the Ultimate Question of Life, the Universe, and Everything',
		64: 'nintendo 64',
		69: 'nice',
		88: 'time travel speed in Back to the Future',
		99: 'the last two digits of almost every discount',
		100: 'perfection in percentages',
		111: 'make a wish',
		123: 'easy as A-B-C',
		256: '2⁸ – the heart of computing, one byte',
		314: 'π – irrational and delicious',
		360: 'noscope',
		420: 'blaze it',
		666: 'the Number of the Beast',
		777: 'jackpot!',
		80085: 'Hell yeah',
		9001: "it's over 9000",
		1024: '2¹⁰ – the real kilobyte',
		1234: 'consecutive kings, a satisfying sequence',
		1337: 'h4x0r approved',
		1984: 'big Brother is watching…',
		2007: 'peak internet aesthetic',
		2023: 'the year of AI’s true breakout',
		2025: 'you’re in the future now',
		404: 'fun fact not found',
		128512: 'returns unicode for 😀',
		3999999:
			'the largest number you can write in Roman numerals (with overbar notation)',
	};

	static parse(value) {
		const str = value.toString().trim();

		// Match integers with optional ".0", but no other decimal parts
		if (!/^\d+(\.0+)?$/.test(str)) {
			throw new Error('Value must be a non-negative integer');
		}

		const parsed = parseInt(str);

		if (!Number.isSafeInteger(parsed)) {
			throw new Error(
				`Value must be a safe non-negative integer (0-${Number.MAX_SAFE_INTEGER})`
			);
		}

		return parsed;
	}

	static getBinary(value) {
		value = this.parse(value);
		return '0b' + value.toString(2);
	}

	static getOctal(value) {
		value = this.parse(value);
		return '0o' + value.toString(8);
	}

	static getHex(value) {
		value = this.parse(value);
		return '0x' + value.toString(16);
	}

	static getBase(value, base) {
		value = this.parse(value);
		base = parseInt(base, 10);
		if (isNaN(base) || base < 2 || base > 36) {
			throw new Error('Base must be between 2 and 36.');
		}
		return value.toString(base);
	}

	static isPalindrome(value) {
		value = this.parse(value);
		const str = value.toString();
		return str === str.split('').reverse().join('');
	}

	static getDigitSum(value) {
		value = this.parse(value);

		return value
			.toString()
			.split('')
			.reduce((sum, digit) => sum + Number(digit), 0);
	}

	static getBitLength(value) {
		value = this.parse(value);
		if (value === 0) {
			throw new Error('Bit length of 0 is ambiguous – usually defined as 1');
		}
		return Math.floor(Math.log2(value)) + 1;
	}

	static isPerfectSquare(value) {
		value = this.parse(value);
		const root = Math.floor(Math.sqrt(value));
		if (root * root === value) {
			return [true, root];
		}
		return false;
	}

	static isPowerOfTwo(value) {
		value = this.parse(value);
		const isPower = (value & (value - 1)) === 0;
		const exponent = this.getBitLength(value) - 1;
		return [isPower, exponent];
	}

	static isPrime(value) {
		value = this.parse(value);
		if (value <= 1) return false;
		if (value === 2) return true;
		if (value % 2 === 0) return false;

		const limit = Math.sqrt(value);
		for (let i = 3; i <= limit; i += 2) {
			if (value % i === 0) return false;
		}

		return true;
	}

	static getPrimeFactors(value) {
		value = this.parse(value);
		if (value === 0) {
			throw new Error('0 has no prime factors – no primes can multiply into 0');
		}
		if (this.isPrime(value)) return [value];

		const primes = [];
		let copy = value;
		let prime = 2;

		while (prime * prime <= copy) {
			if (copy % prime === 0) {
				primes.push(prime);
				copy /= prime;
			} else {
				prime = prime === 2 ? 3 : prime + 2;
			}
		}

		if (copy > 1) primes.push(copy);
		return primes;
	}

	static getDivisors(value) {
		value = this.parse(value);
		if (value === 0) {
			throw new Error(
				'0 has infinite divisors – any number multiplied by 0 gives 0'
			);
		}
		const divisors = [];

		for (let i = 1; i <= Math.sqrt(value); i++) {
			if (value % i === 0) {
				divisors.push(i);
				if (i !== value / i) divisors.push(value / i);
			}
		}

		return divisors.sort((a, b) => a - b);
	}

	static getCollatzSteps(value) {
		value = this.parse(value);
		if (value === 0) {
			throw new Error('Collatz sequence for 0 never reaches 1');
		}
		let steps = 0;
		while (value !== 1) {
			value = value % 2 === 0 ? value / 2 : value * 3 + 1;
			steps++;
		}
		return steps;
	}

	static getScientificNotation(value) {
		value = this.parse(value);
		const [coefficient, exponent] = value.toExponential().split('e');
		const exp = exponent.startsWith('+') ? exponent.slice(1) : exponent;
		return `${coefficient} x 10^${exp}`;
	}

	static getUnicodeChar(value) {
		value = this.parse(value);

		if (value >= 0 && value <= 0x10ffff) {
			const isControl = value <= 0x1f || (value >= 0x7f && value <= 0x9f);
			const code = `U+${value.toString(16).toUpperCase().padStart(4, '0')}`;

			if (isControl) {
				return `(control char – ${code})`;
			}

			const char = String.fromCodePoint(value);
			return `${char} (${code})`;
		}

		return 'undefined';
	}

	static getRomanNumeral(value) {
		value = this.parse(value);
		if (value < 1) {
			throw new Error('Romans had no numeral for zero');
		}
		if (value < 1 || value > 3999999) {
			return '::ROMAN LIMIT EXCEEDED::';
		}

		let result = '';
		for (const { value: v, symbol } of this.romanMap) {
			while (value >= v) {
				result += symbol;
				value -= v;
			}
		}
		return result;
	}

	static getFunFact(value) {
		value = this.parse(value);
		return (
			this.funFacts[value] ||
			`No fun facts for ${value} yet... but it reaches 1 in ${this.getCollatzSteps(
				value
			)} Collatz steps.`
		);
	}

	static getSummary(value) {
		value = this.parse(value);

		// had to add this to handle edgecases cleanly introduced by allowing '0'
		const safe = (fn) => {
			try {
				return fn();
			} catch (err) {
				return `${err.message}`;
			}
		};

		const isPalindrome = safe(() => this.isPalindrome(value)) ? 'yes' : 'no';
		const isPerfectSquare = safe(() => this.isPerfectSquare(value));
		const isPrime = safe(() => this.isPrime(value)) ? 'yes' : 'no';
		const [isPowerOfTwo, exponent] = safe(() => this.isPowerOfTwo(value)) || [
			false,
			0,
		];
		const primeFactors = safe(() => this.getPrimeFactors(value).join(', '));
		const divisors = safe(() => this.getDivisors(value).join(', '));
		const funFact = safe(() => this.getFunFact(value));

		return [
			`> value            :: ${value}`,
			`> binary           :: ${safe(() => this.getBinary(value))}`,
			`> octal            :: ${safe(() => this.getOctal(value))}`,
			`> hex              :: ${safe(() => this.getHex(value))}`,
			`> digit sum        :: ${safe(() => this.getDigitSum(value))}`,
			`> bit length       :: ${safe(() => this.getBitLength(value))}`,
			`> palindrome?      :: ${isPalindrome}`,
			`> perfect square?  :: ${isPerfectSquare}`,
			`> prime?           :: ${isPrime}`,
			`> power of two?    :: ${
				isPowerOfTwo ? 'yes' : `no (nearest lower: ${2 ** exponent})`
			}`,
			`> prime factors    :: ${primeFactors}`,
			`> divisors         :: ${divisors}`,
			`> collatz steps    :: ${safe(() => this.getCollatzSteps(value))}`,
			`> scientific       :: ${safe(() => this.getScientificNotation(value))}`,
			`> roman numeral    :: ${safe(() => this.getRomanNumeral(value))}`,
			`> unicode          :: ${safe(() => this.getUnicodeChar(value))}`,
			`> fun fact         :: ${funFact}`,
		].join('\n');
	}
}

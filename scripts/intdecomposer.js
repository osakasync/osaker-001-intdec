//class used to get detailed info about the integer structure/info
export default class IntDecomposer {
    static romanMap = [
        //overbar notation (for > 3999)
        { value: 1000000, symbol: 'M̅' },
        { value: 900000,  symbol: 'C̅M̅' },
        { value: 500000,  symbol: 'D̅' },
        { value: 400000,  symbol: 'C̅D̅' },
        { value: 100000,  symbol: 'C̅' },
        { value: 90000,   symbol: 'X̅C̅' },
        { value: 50000,   symbol: 'L̅' },
        { value: 40000,   symbol: 'X̅L̅' },
        { value: 10000,   symbol: 'X̅' },
        { value: 9000,    symbol: 'I̅X̅' },
        { value: 5000,    symbol: 'V̅' },
        { value: 4000,    symbol: 'I̅V̅' },
        //standard roman numerals
        { value: 1000, symbol: 'M' },
        { value: 900,  symbol: 'CM' },
        { value: 500,  symbol: 'D' },
        { value: 400,  symbol: 'CD' },
        { value: 100,  symbol: 'C' },
        { value: 90,   symbol: 'XC' },
        { value: 50,   symbol: 'L' },
        { value: 40,   symbol: 'XL' },
        { value: 10,   symbol: 'X' },
        { value: 9,    symbol: 'IX' },
        { value: 5,    symbol: 'V' },
        { value: 4,    symbol: 'IV' },
        { value: 1,    symbol: 'I' }
    ];

    static funFacts = {
        0:  "zero is the origin – nothing and everything",
        1:  "the multiplicative identity – the loneliest number",
        2:  "the only even prime – a binary buddy",
        3:  "triangles, triforces, and triple threats – power in threes",
        7:  "often called the world's favorite number",
        8:  "infinity on its side – or a lucky clover in disguise",
        9:  "the last single digit. Known for its divisibility tricks",
        10: "a nice round number – the base of our number system",
        13: "unlucky for some… but spooky for others",
        21: "what's 9 + 10?",
        24: "number of hours in a day",
        33: "a master number in numerology. Powerful and symbolic",
        42: "the Answer to the Ultimate Question of Life, the Universe, and Everything",
        64: "nintendo 64",
        69: "nice",
        88: "time travel speed in Back to the Future",
        99: "the last two digits of almost every discount",
        100: "perfection in percentages",
        111: "make a wish",
        123: "easy as A-B-C",
        256: "2⁸ – the heart of computing, one byte",
        314: "π – irrational and delicious",
        360: "noscope",
        420: "blaze it",
        666: "the Number of the Beast",
        777: "jackpot!",
        80085: "Hell yeah",
        9001: "it's over 9000",
        1024: "2¹⁰ – the real kilobyte",
        1234: "consecutive kings, a satisfying sequence",
        1337: "h4x0r approved",
        1984: "big Brother is watching…",
        2007: "peak internet aesthetic",
        2023: "the year of AI’s true breakout",
        2025: "you’re in the future now",
        404: "fun fact not found",
    };
    constructor(value) {
        this.setValue(value);
    }

    setValue(value) {
        const parsed = parseInt(value, 10);
        if (isNaN(parsed) || parsed <= 0) {
            throw new Error("IntDecomposer expects a positive integer.");
        }
        this.value = parsed;
    }

    getBinary() {
        return '0b' + this.value.toString(2);
    }

    getOctal() {
        return '0o' + this.value.toString(8);
    }

    getHex() {
        return '0x' + this.value.toString(16);
    }

    getBase(base) {
        return this.value.toString(base);
    }

    isPalindrome() {
        return this.value.toString() === this.value.toString().split("").reverse().join("");
    }

    getDigitSum() {
        let sum = 0;
        let copyValue = this.value;

        while(copyValue) {
            sum += copyValue%10;
            copyValue = Math.floor(copyValue/10);         
        }

        return sum;
    }

    //returns the number of bits needed to represent the value in binary
    getBitLength() {
        return Math.floor(Math.log2(this.value)) + 1
    }

    isPerfectSquare() {
        let root = Math.floor(Math.sqrt(this.value))
        return root * root == this.value;
    }

    // Returns [true, exponent] if value is a power of 2
    // Returns [false, bit length - 1] otherwise (exponent not meaningful)
    isPowerOfTwo() {
       let isPower = (this.value & (this.value - 1)) === 0;
       let exponent = this.getBitLength() - 1;

       return [isPower, exponent];
    }

    isPrime() {
        if (this.value <= 1) return false;
        if (this.value === 2) return true;
        if (this.value % 2 === 0) return false;

        const limit = Math.sqrt(this.value);
        for (let i = 3; i <= limit; i += 2) {
            if (this.value % i === 0) return false;
        }

        return true;
    }


    getPrimeFactors() {
        if(this.isPrime(this.value)) return [this.value]

        let copyValue = this.value;
        let prime = 2;
        const primeList = []

        while(prime * prime <= copyValue) {
            if(copyValue % prime == 0) {
                copyValue /= prime;
                primeList.push(prime);
            } else if(prime === 2) {
                prime = 3;
            } else {
                prime+=2;
            }
        }

        if (copyValue > 1) primeList.push(copyValue);

        return primeList;
    }

    getDivisors() {
        const divisors = [];

        for(let i = 1; i <= Math.sqrt(this.value); i++) {
            if (this.value % i === 0) {
                divisors.push(i);
                if (i !== this.value / i) {
                    divisors.push(this.value / i);
                }
            }
        }

        divisors.sort(function(a, b){return a - b});

        return divisors;
    }

    getCollatzSteps() {
        let copyValue = this.value;
        let steps = 0;
        while(copyValue !== 1) {
            if(copyValue % 2 === 0){
                copyValue /= 2
            }
            else {
                copyValue *= 3;
                copyValue++;
            }

            steps++;
        }

        return steps;
    }

    getScientificNotation() {
        let scientificForm = this.value.toExponential()
        scientificForm = scientificForm.split('e');
        
        //remove the leading '+' cuz it's unneeded
        if(scientificForm[1].startsWith('+'))
            scientificForm[1] = scientificForm[1].slice(1);

        return scientificForm[0] + ' x 10^' + scientificForm[1]; 
    }

    getUnicodeChar() {
        if(this.value >= 0 && this.value <= 0x10FFFF) {
            let char = String.fromCodePoint(this.value);
            return `${char} (U+${this.value.toString(16).toUpperCase().padStart(4, '0')})`
        }

        return 'undefined';
    }

    getRomanNumeral() {
        if (this.value < 1 || this.value > 3999999) {
            return '::ROMAN LIMIT EXCEEDED::';
        }

        let copyValue = this.value;
        let result = '';

        for (const { value: v, symbol } of IntDecomposer.romanMap) {
            while (copyValue >= v) {
                result += symbol;
                copyValue -= v;
            }
        }

        return result;
    }

    getFunFact() {
        return IntDecomposer.funFacts[this.value] || `No fun facts for ${this.value} yet... but it reaches 1 in ${this.getCollatzSteps()} Collatz steps.`;
    }

    getSummary() {
        return {
            value: this.value,
            binary: this.getBinary(),
            octal: this.getOctal(),
            hex: this.getHex(),
            digitSum: this.getDigitSum(),
            bitLength: this.getBitLength(),
            isPalindrome: this.isPalindrome(),
            isPerfectSquare: this.isPerfectSquare(),
            isPrime: this.isPrime(),
            powerOfTwo: this.isPowerOfTwo(),
            primeFactors: this.getPrimeFactors(),
            divisors: this.getDivisors(),
            collatzSteps: this.getCollatzSteps(),
            scientific: this.getScientificNotation(),
            roman: this.getRomanNumeral(),
            unicode: this.getUnicodeChar(),
            funFact: this.getFunFact()
        };
    }

}
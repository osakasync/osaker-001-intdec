import IntDecomposer from "./intdecomposer.js";

const decomp = new IntDecomposer(3999999);

console.log(`value ${decomp.value}`);
console.log(`binary ${decomp.getBinary()}`);
console.log(`octal ${decomp.getOctal()}`);
console.log(`hex ${decomp.getHex()}`);
console.log(`base ${decomp.getBase(27)}`);
console.log(`isPalindrome ${decomp.isPalindrome()}`);
console.log(`getDigitSum ${decomp.getDigitSum()}`);
console.log(`getBitLength ${decomp.getBitLength()}`);
console.log(`isPerfectSquare ${decomp.isPerfectSquare()}`);
console.log(`isPowerOfTwo ${decomp.isPowerOfTwo()}`);
console.log(`isPrime ${decomp.isPrime()}`);
console.log(`getPrimeFactors ${decomp.getPrimeFactors()}`);
console.log(`getDivisors ${decomp.getDivisors()}`);
console.log(`getColatzSteps ${decomp.getCollatzSteps()}`);
console.log(`getScientificForm ${decomp.getScientificNotation()}`);
console.log(`getUnicodeChar ${decomp.getUnicodeChar()}`);
console.log(`getRomanNumeral ${decomp.getRomanNumeral()}`);
console.log(`getFunFact ${decomp.getFunFact()}`);
console.log(`getSummary ${decomp.getSummary()}`);


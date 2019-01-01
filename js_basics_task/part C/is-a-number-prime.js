/*Is Prime
Define a function isPrime/is_prime() that takes one integer argument and returns true/True or false/False depending on if the integer is a prime.

Per Wikipedia, a prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

Example
bool isPrime(5) = return true*/

function isPrime(num) {
    if (num <= 1) {
        return false;
    } else {
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                return false;
            }
        }
    }
    return true;
}

console.log(isPrime(5));
console.log(isPrime(-5));
console.log(isPrime(1));
console.log(isPrime(6));
console.log(isPrime(12));
console.log(isPrime(7));
console.log(isPrime(11));


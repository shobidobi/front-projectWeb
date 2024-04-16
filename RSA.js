
function gcdExtended(a, b) {
    if (a === 0) {
        return { gcd: b, x: 0, y: 1 };
    }

    let gcdInfo = gcdExtended(b % a, a);
    let x = gcdInfo.y - Math.floor(b / a) * gcdInfo.x;
    let y = gcdInfo.x;

    return { gcd: gcdInfo.gcd, x: x, y: y };
}

function findNumbersWithModuloOne(n) {
    let pairs = [];
    for (let i = 100; i < n; i++) {
        let gcdInfo = gcdExtended(i, n);
        if (gcdInfo.gcd === 1) {
            let inverse = (gcdInfo.x % n + n) % n; // מודולו הדווקא שלילי כאן משמש לקידום האופציה
            if (i > 100 && inverse > 100) {
                pairs.push([i, inverse]);
                if (pairs.length==10){
                    return pairs[pairs.length-1]
                }
            }
        }
    }
    return pairs;
}

// דוגמה לשימוש:
// let result = findNumbersWithModuloOne(40);
// console.log(result); // ידפיס [1, 9]
function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;

    if (number % 2 === 0 || number % 3 === 0) return false;

    let i = 5;
    while (i * i <= number) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
        i += 6;
    }

    return true;
}

function getRandomPrimeInRange(start, end) {
    let primeFound = false;
    let randomPrime;

    while (!primeFound) {
        randomPrime = Math.floor(Math.random() * (end - start + 1)) + start;
        if (isPrime(randomPrime)) {
            primeFound = true;
        }
    }

    return randomPrime;
}

let num_one=getRandomPrimeInRange(100000000, 1000000000);
let num_two=getRandomPrimeInRange(100000000, 1000000000);
console.log("end prime");
let mult=(num_one-1)*(num_two-1);
console.log(mult);
let results = findNumbersWithModuloOne(mult);
console.log(results);
function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0; // אם המודולו הוא 1, כל מספר בחזקה 0 מחזיר 0
    let result = 1;
    base = base % modulus; // מקטין את הבסיס למודולו כדי למנוע גידול חסר סוף במספרים גדולים
    while (exponent > 0) {
        // אם החזקה היא זוגית, נכפיל את הבסיס בעצמו ונחלק במודולו
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        // אם החזקה היא אי-זוגית, נכפיל את הבסיס בתוצאת עצמו ונחלק במודולו
        base = (base * base) % modulus;
        exponent = Math.floor(exponent / 2); // חילוק החזקה בשני ועגול למטה
    }
    return result;
}

for(let i=0; i<100;i++){
    let result2 = modPow(5,results[0],(num_one)*(num_two));
    console.log(result2); // ידפיס 24 בקונסול
    let result3 = modPow(result2,results[1],(num_one)*(num_two));
    console.log(result3);
    console.log(i);
}


const axios = require('axios');

// קבלת מפתח ציבורי מהשרת
axios.get('http://localhost:5000/get_public_key', {
    params: {
        public_key: 'להוסיף את מפתח הציבורי של הלקוח כאן'
    }
})
    .then(function (response) {
        // הדפסת המפתח הציבורי של השרת שהתקבל מהשרת
        console.log('Public key from server:', response.data.server_public_key);
    })
    .catch(function (error) {
        console.error('Error fetching public key:', error);
    });


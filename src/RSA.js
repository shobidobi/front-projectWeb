
function modularExponentiation(base, exponent, modulus) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

function encryptText(text, key) {
    var encryptedText = [];
    for (var i = 0; i < text.length; i++) {
        // מעלה את ערך התו בחזקה מודולרית בבסיס 1000
        var charCode = modularExponentiation(text.charCodeAt(i), key[0], key[1]);
        // מוסיף את התו המוצפן למחרוזת המוצפנת
        encryptedText.push(charCode);
    }
    return encryptedText;
}


// const fs = require('browserify-fs');
//
//
// function jsonFileToBinary(jsonFilePath) {
//     // קריאת הנתונים מהקובץ JSON
//     const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
//
//     // המרת נתוני JSON למחרוזת בתצורת בינארית
//     const binaryData = Buffer.from(JSON.stringify(jsonData), 'utf-8');
//
//     return binaryData;
// }
function encryptJsonRsa(data, key) {
    const { companyNumber, algorithmType, pixelRangeStart, pixelRangeEnd, fileType } = data;

    const encryptedPixelRangeStart = modularExponentiation(pixelRangeStart, key[0], key[1]);
    const encryptedPixelRangeEnd = modularExponentiation(pixelRangeEnd, key[0], key[1]);
    const algorithmTypeEncrypted = encryptText(algorithmType, key);
    console.log(encryptedPixelRangeStart);
    const encryptedData = {
        companyNumber,
        algorithmTypeEncrypted,
        pixelRange: [encryptedPixelRangeStart, encryptedPixelRangeEnd],
        fileType
    };

    return encryptedData;
}




export { encryptText, encryptJsonRsa};



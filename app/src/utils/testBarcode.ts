export function isValidEAN(ean : string) {
    if (ean.length !== 13 || !/^\d{13}$/.test(ean)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
        let num = parseInt(ean[i]);
        if (i % 2 === 0) {
            sum += num;
        } else {
            sum += num * 3;
        }
    }

    let checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(ean[12]);
}
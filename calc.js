document.getElementById('binary1').addEventListener('input', updateDecimalValues);
document.getElementById('binary2').addEventListener('input', updateDecimalValues);

document.getElementById('addBtn').onclick = function() {
    const binary1 = document.getElementById('binary1').value;
    const binary2 = document.getElementById('binary2').value;

    if (!isValidBinary(binary1) || !isValidBinary(binary2)) {
        alert('Please enter valid binary numbers.');
        return;
    }

    const { result, steps, decimalSum } = addBinary(binary1, binary2);
    document.getElementById('result').innerText = `${result} (Decimal: ${decimalSum})`;
    document.getElementById('steps').innerHTML = steps;
};

document.getElementById('subtractBtn').onclick = function() {
    const binary1 = document.getElementById('binary1').value;
    const binary2 = document.getElementById('binary2').value;

    if (!isValidBinary(binary1) || !isValidBinary(binary2)) {
        alert('Please enter valid binary numbers.');
        return;
    }

    const { result, steps, decimalDiff } = subtractBinary(binary1, binary2);
    document.getElementById('result').innerText = `${result} (Decimal: ${decimalDiff})`;
    document.getElementById('steps').innerHTML = steps;
};

// Function to update decimal values next to inputs
function updateDecimalValues() {
    const binary1 = document.getElementById('binary1').value;
    const binary2 = document.getElementById('binary2').value;

    document.getElementById('decimal1').innerText = binary1 ? `(${parseInt(binary1, 2)})` : '';
    document.getElementById('decimal2').innerText = binary2 ? `(${parseInt(binary2, 2)})` : '';
}

function isValidBinary(str) {
    return /^[01]+$/.test(str);
}

function addBinary(a, b) {
    let carry = 0;
    let result = '';
    let steps = `Adding ${a} and ${b}:<br>`;
    let decimalSum = parseInt(a, 2) + parseInt(b, 2); // Decimal sum

    // Pad the shorter string with zeros
    while (a.length < b.length) a = '0' + a;
    while (b.length < a.length) b = '0' + b;

    let carries = '';

    // Add from right to left
    for (let i = a.length - 1; i >= 0; i--) {
        const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
        const currentResult = sum % 2;
        carry = Math.floor(sum / 2);
        result = currentResult + result;

        if (carry) {
            carries = carry + carries; // Build carry string only if carry exists
        }
    }

    if (carry) result = carry + result; // Add remaining carry

    steps += carries ? `<div>${' '.repeat(a.length - carries.length)}${carries}</div>` : '';
    steps += `<div class="align-center">${a}</div>`;
    steps += `<div class="align-center">+ ${b}</div>`;
    steps += `Final result: ${result}`;
    
    return { result, steps, decimalSum };
}

function subtractBinary(a, b) {
    let borrow = 0;
    let result = '';
    let steps = `Subtracting ${b} from ${a}:<br>`;
    let decimalDiff = parseInt(a, 2) - parseInt(b, 2); // Decimal difference

    // Pad the shorter string with zeros
    while (a.length < b.length) a = '0' + a;
    while (b.length < a.length) b = '0' + b;

    let borrows = '';

    // Subtract from right to left
    for (let i = a.length - 1; i >= 0; i--) {
        let sub = parseInt(a[i]) - parseInt(b[i]) - borrow;
        if (sub < 0) {
            sub += 2; // Borrow
            borrow = 1;
            borrows = '1' + borrows; // Record borrow
        } else {
            borrow = 0;
            borrows = '0' + borrows; // No borrow
        }
        result = sub + result;
    }

    steps += borrows ? `<div>${' '.repeat(a.length - borrows.length)}${borrows}</div>` : '';
    steps += `<div class="align-center">${a}</div>`;
    steps += `<div class="align-center">- ${b}</div>`;
    steps += `Final result: ${result.replace(/^0+/, '') || '0'}`; // Remove leading zeros
    
    return { result: result.replace(/^0+/, '') || '0', steps, decimalDiff };
}

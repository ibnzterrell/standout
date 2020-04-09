function detectType(char: string) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    if (chars.indexOf(char) !== -1) {
        return 'regularLetter';
    }
    else if (numbers.indexOf(char) !== -1) {
        return 'regularNumber';
    }

    return 'other';
}

function convertLetter(style: string, char: string) {
    let offset = 0;
    if (style === 'bold') {
        offset = 0x1D400;
    }
    else if (style === 'italic') {
        offset = 0x1D434;
        if (char === 'h') {
            // Italic h is located elsewhere
            return String.fromCodePoint(0x210E);
        }
    }
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return String.fromCodePoint(chars.indexOf(char[0]) + offset);
}
function convertNumber(style: string, char: string) {
    let offset = 0;
    if (style === 'bold') {
        offset = 0x1D7CE;
    }
    else if (style === 'italic') {
        // Normal - there are no italic digits
        offset = 0x00030;
    }
    const numbers = '0123456789';
    return String.fromCodePoint(numbers.indexOf(char[0]) + offset);
}

function convert(style: string, input: string) {
    let output = input.split('');

    for (let i = 0; i < input.length; ++i) {
        let charType = detectType(input.charAt(i));
        if (charType === 'regularLetter') {
            output[i] = convertLetter(style, input.charAt(i));
        }
        else if (charType === 'regularNumber') {
            output[i] = convertNumber(style, input.charAt(i));
        }
    }
    return output.join('');
}
export function applyStyle(style: string, begin: number, end: number, input: string) {
    let before = input.substring(0, begin);
    let str = input.substring(begin, end);
    let after = input.substring(end, input.length);
    str = convert(style, str);
    let output = before + str + after;
    console.log(input.length);
    console.log(output.length);
    return output;
}

function codePoint(char: string) {
    return char.codePointAt(0) as number;
}

function detectType(char: string) {
    let point = codePoint(char);
    if (point >= codePoint('A') && point <= codePoint('Z')) {
        return 'uppercase';
    }
    else if (point >= codePoint('a') && point <= codePoint('z')) {
        return 'lowercase';
    }
    return 'unknown';
}
function convertBold(input: string) {
    let offsetUppercase = codePoint('𝗔') - codePoint('A');
    let offsetLowercase = codePoint('𝗮') - codePoint('a');

    let output = input.split('');
    for (let i = 0; i < input.length; ++i) {
        let charType = detectType(input.charAt(i));
        if (charType === 'uppercase') {
            output[i] = String.fromCodePoint(codePoint(input.charAt(i)) + offsetUppercase);
        }
        else if (charType === 'lowercase') {
            output[i] = String.fromCodePoint(codePoint(input.charAt(i)) + offsetLowercase);
        }
    }
    return output.join('');
}

export function applyStyle(style: string, begin: number, end: number, input: string) {
    let before = input.substring(0, begin);
    let str = input.substring(begin, end);
    let after = input.substring(end, input.length);
    str = convertBold(str);
    let output = before + str + after;
    return output;
}

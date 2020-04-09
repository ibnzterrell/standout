const UtfString = require('utfstring');

function detectStyle(char: string) {
    const regular = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bold = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
    const italic = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
    if (UtfString.indexOf(regular, char) !== -1) {
        return 'regular';
    }
    else if (UtfString.indexOf(bold, char) !== -1) {
        return 'bold';
    }
    else if (UtfString.indexOf(italic, char) !== -1) {
        return 'italic';
    }
    return 'other';
}

function detectClass(char: string) {
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
    const number = '0123456789𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
    if (UtfString.indexOf(letter, char) !== -1) {
        return 'letter';
    }
    else if (UtfString.indexOf(number, char) !== -1) {
        return 'number';
    }
    return 'other';
}
function convertLetter(fromStyle: string, toStyle: string, char: string) {
    let chars = '';
    let offset = 0;
    if (fromStyle === toStyle) {
        toStyle = 'regular';
    }

    if (fromStyle === 'regular') {
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }
    else if (fromStyle === 'bold') {
        chars = '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳';
    }
    else if (fromStyle === 'italic') {
        chars = '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧';
    }

    let index = UtfString.indexOf(chars, UtfString.charAt(char, 0));
    if (toStyle === 'regular') {
        offset = 0x0041;
        if (index > 25) {
            // Lowercase regular offset is higher
            index -= 26;
            offset = 0x0061;
        }
    }
    else if (toStyle === 'bold') {
        offset = 0x1D400;
    }
    else if (toStyle === 'italic') {
        offset = 0x1D434;
        if (char === 'h' || char === '𝐡') {
            // Italic lowercase h doen't match pattern
            return UtfString.fromCharCode(0x210E);
        }
    }

    return UtfString.fromCharCode(index + offset);
}
function convertNumber(fromStyle: string, toStyle: string, char: string) {
    let chars = '';
    let offset = 0;
    if (fromStyle === toStyle) {
        toStyle = 'regular';
    }

    if (toStyle === 'italic') {
        // Normal - there are no italic digits
        toStyle = 'regular';
    }

    if (fromStyle === 'regular') {
        chars = '0123456789';
    }
    else if (fromStyle === 'bold') {
        chars = '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
    }

    if (toStyle === 'regular') {
        offset = 0x0030;
    }
    else if (toStyle === 'bold') {
        offset = 0x1D7CE;
    }
    return UtfString.fromCharCode(UtfString.indexOf(chars, UtfString.charAt(char, 0)) + offset);
}

function convert(toStyle: string, input: string) {
    let output = [];

    for (let i = 0; i < UtfString.length(input); ++i) {
        let charClass = detectClass(UtfString.charAt(input, i));
        let fromStyle = detectStyle(UtfString.charAt(input, i));
        console.log(fromStyle);
        if (charClass === 'letter') {
            output[i] = convertLetter(fromStyle, toStyle, UtfString.charAt(input, i));
        }
        else if (charClass === 'number') {
            output[i] = convertNumber(fromStyle, toStyle, UtfString.charAt(input, i));
        }
        else {
            output[i] = UtfString.charAt(input, i);
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
    console.log(UtfString.length(input));
    console.log(UtfString.length(output));
    return output;
}

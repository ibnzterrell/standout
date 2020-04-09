const UtfString = require('utfstring');

function detectStyle(char: string) {
    const regular = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bold = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
    const italic = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';
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
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';
    const number = '0123456789𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
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
        chars = '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇';
    }
    else if (fromStyle === 'italic') {
        chars = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻';
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
        offset = 0x1D5D4;
    }
    else if (toStyle === 'italic') {
        offset = 0x1D608;
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
        chars = '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
    }

    if (toStyle === 'regular') {
        offset = 0x0030;
    }
    else if (toStyle === 'bold') {
        offset = 0x1D7EC;
    }
    return UtfString.fromCharCode(UtfString.indexOf(chars, UtfString.charAt(char, 0)) + offset);
}

function convert(toStyle: string, input: string) {
    let output = [];
    console.log(UtfString.indexOf('', ' '));
    for (let i = 0; i < UtfString.length(input); ++i) {
        let charClass = detectClass(UtfString.charAt(input, i));
        let fromStyle = detectStyle(UtfString.charAt(input, i));
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

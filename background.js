
const map = {
    'q': '/',
    'w': "'",
    'e': 'ק',
    'r': 'ר',
    't': 'א',
    'y': 'ט',
    'u': 'ו',
    'i': 'ן',
    'o': 'ם',
    'p': 'פ',
    '[': ']',
    '{': '}',
    ']': '[',
    '}': '{',
    'a': 'ש',
    's': 'ד',
    'd': 'ג',
    'f': 'כ',
    'g': 'ע',
    'h': 'י',
    'j': 'ח',
    'k': 'ל',
    'l': 'ך',
    ';': 'ף',
    "'": ',',
    'z': 'ז',
    'x': 'ס',
    'c': 'ב',
    'v': 'ה',
    'b': 'נ',
    'n': 'מ',
    'm': 'צ',
    ',': 'ת',
    '<': '>',
    '.': 'ץ',
    '>': '<',
    '/': '.'
};

function transFromHe(string)//from en to he
{
    let reverse = {};
    let newString = "";

    for (let key in map) {
        let value = map[key];
        reverse[value] = key;
    }

    for (let i=0; i < string.length; i++)
    {
        if (reverse.hasOwnProperty(string[i].toLowerCase())) {
            newString += reverse[string[i]];
        } else {
            newString += string[i];
        }
    }

    return newString;
}

function transToHe(string)//from he to en
{
    let reverse = { };
    let full = { };
    let newString = "";

    for (let i=0; i < string.length; i++)
    {
        if (map.hasOwnProperty(string[i].toLowerCase())) {
            newString += map[string[i]];
        } else {
            newString += string[i];
        }
    }

    return newString;
}

chrome.contextMenus.create({
    title: "Replace Text To Hebrew",
    contexts: ["selection"],
    onclick: function (info, tab) {
        chrome.tabs.executeScript(tab.id, {
            frameId: info.frameId || 0,
            matchAboutBlank: true,
            code:
                `document.execCommand('insertText', false, 
                ${JSON.stringify(transToHe(info.selectionText))})`,
        });
    }
});


chrome.contextMenus.create({
    title: "Replace Text From Hebrew",
    contexts:["selection"],
    onclick: function (info, tab) {
        chrome.tabs.executeScript(tab.id, {
            frameId: info.frameId || 0,
            matchAboutBlank: true,
            code:
                `document.execCommand('insertText', false, 
                ${JSON.stringify(transFromHe(info.selectionText))})`,
        });
    }
});
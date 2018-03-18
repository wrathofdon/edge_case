/*jshint esversion: 6 */

function removeEmptyLines(text) {
    let arr = text.split('\n');
    let arr2 = ['\n'];
    for (let i = 0; i < arr.length; i++) {
        let length = arr[i].indexOf('// '); // this is how we ignore comments
        if (length < 0) length = arr[i].length;
        arr[i] =arr[i].substring(0, length).trim();
        if (arr[i]) arr2.push(arr[i]); // empty lines and commented lines are ignored by the code
    }
    return arr2.join('\n');
}

// adds linebreaks to button modifier flags so that they're easier to process later
function addLineBreakToSymbol (line, symbol) {
    let index = line.toLowerCase().indexOf(' ' + symbol);
    while (index > -1) {
        line = line.substring(0, index).trim() + '\n' + line.substring(index).trim();
        index = line.indexOf(' ' + symbol);
    }
    return line;
}

// Projects and name spaces are an easier way to categorize the slides.  This shorthand technique allows a quick substitution
function addNameSpace(text, project, namespace) {
    text = text.trim();
    if (text[0] == '$' && project) {
        return project + '.' + text.substring(1);
    } else if (text[0] == '#') {
        text = text.substring(1);
        if (namespace) text = namespace + '.' + text;
        if (project) text = project + '.' + text;
    }
    return text;
}

// parses the individual slides, and loads them to the dictionary so that they can be accessed
function addSlideToDict(array) {
    var project = '';
    var namespace = '';
    let firstLine = 0 + (array[0].substring(0, 4) != '/n===');
    for (let i = firstLine; i < array.length; i++) {
        if (array[i].toLowerCase().substring(0,9) == '=project$') {
            project = array[i].substring(9, array[i].indexOf('====')).trim();
        } else if (array[i].toLowerCase().substring(0,11) == '=namespace#') {
            namespace = array[i].substring(11, array[i].indexOf('====')).trim();
        } else {
            let slide = array[i].split('\n++');
            let title = slide[0].split('===\n')[0];
            title = addNameSpace(title, project, namespace);
            if (slides.hasOwnProperty(title)) {
                alert(title + ' slide already exists');
                break;
            }
            textRaw =  slide[0].split('===\n')[1].trim();
            buttonRaw = slide.slice(1);
            for (let j = 0; j < buttonRaw.length; j++) {
                buttonRaw[j] = addLineBreakToSymbol(buttonRaw[j], '+cond:'); // If used: Provide a JS conditional that must be true for the button to show.  i.e., in a game, a button to use an object might only appear if the object is in the user inventory.
                buttonRaw[j] = addLineBreakToSymbol(buttonRaw[j], '+bbcode:'); // If used: Adds BB Code to slide when button is pressed.  Remember that BB Code can be used to insert javascript.
                buttonRaw[j] = addLineBreakToSymbol(buttonRaw[j], '+limit:'); // If used: Specifies the number of times a button can be clicked before disappearing.  Set to -1 for no limit.  Default setting is 1, and can be changed in global.js
                buttonRaw[j] = addLineBreakToSymbol(buttonRaw[j], '->');
            }
            slides[title] = new Slide(title, project, namespace, textRaw, buttonRaw);
        }
    }
}

function parseRaw(text) {
    let rawCards = removeEmptyLines(text).split('\n===');
    for (let i = 0; i < rawCards.length; i++) {
        let temp = rawCards[i].split('\n==@');
        for (let j = 0; j < temp.length; j++) {
            temp[j] = parseBBFormatting(removeContentLineBreaks(temp[j]));
        }
        rawCards[i] = temp.join('\n==@');
    }
    addSlideToDict(rawCards);
}

/*jshint esversion: 6 */

/*
* these are the bbCode tags that are processed the first time the text files are loaded
* since they do not depend on variables, they can be loaded on the start
*/
var formatTags = {
    'b': obj => [(obj.beforeText + '<strong>' + obj.content + '</strong>'), obj.afterText],
    'i': obj => [(obj.beforeText + '<em>' + obj.content + '</i>'), obj.afterText],
    'u': obj => [(obj.beforeText + '<u>' + obj.content + '</u>'), obj.afterText],
    'ul': obj => bbCodeCreateList(obj),
    'ol': obj => bbCodeCreateList(obj),
    'img': obj => [(obj.beforeText + '<img src="' + obj.content + '">'), obj.afterText],
    'url': obj => [(obj.beforeText + '<a href="' + obj.attribute + 
        '" target="blank">' + obj.content + "</a>"), obj.afterText]
};

/*
* these are the bbCode tags which are javascript dependent
* since they can change based on variables, they are loaded on demand
*/
var liveTags = {
    'tern': obj => bbCodeTernery(obj),
    'js': obj => [(obj.beforeText + eval(obj.content)), obj.afterText],
    'run': obj => [(obj.beforeText + eval('(function(){' + obj.content+ '})()')), obj.afterText],
    'cite': obj => bbCodeCite(obj),
    'toggle': obj => bbCodeToggle(obj)
};

/*
* Used for formatting lists in BB Code
*/
function bbCodeCreateList(obj) {
    obj.content.replace("\n", "");
    var output = '<' + obj.tag + '>';
    var items = obj.content.split('[*]');
    for (var i = 0; i < items.length; i++) {
        if (items[i].trim()) output += '<li>' + items[i] + '</li>';
    }
    return [(obj.beforeText + output + '</' + obj.tag + '>'), obj.afterText];
}

/*
* Used for creating toggle text
*/
function bbCodeToggle(obj) {
    let toggleID = `toggle-no-${toggleCounter++}`;
    let buttonText = `<button class="toggle-button" toggleId="${toggleID}">${obj.attribute}</button>`;
    let paragragphText = `<div id="${toggleID}" style="display: None"><br>${obj.content}</div>`;
    return [(obj.beforeText + buttonText + paragragphText), obj.afterText];
}

/*
* Used for calling segments from other cards
*/
function bbCodeCite(obj) {
    console.log(obj)
    let cite = addNameSpace(obj.content, currentSlide().project, currentSlide().namespace).split('@');
    let slide = slides[cite[0]];
    let sub = 'all';
    if (cite.length == 2) sub = cite[1];
    if (slide == null || slide.excerpts[sub] == null) return obj.beforeText + obj.content + obj.afterText;
    let lines = slide.excerpts[sub];
    let text = '';
    for (let i = 0; i < lines.length; i++) {
        line = parseJSCode(lines[i]);
        if (line.trim()) text += '<br>' + line + '<br>';
    }
    return [(obj.beforeText + text), obj.afterText];
}

/* 
* Handles ternery commands.  For instance:
* `[tern=true]yes::no[/tern]` results in "yes"
*/ 
function bbCodeTernery(obj) {
    var choices = obj.content.split('::');
    if (choices.length != 2) return obj.beforeText + ' [<INVALID TERNERY>] ' + obj.afterText;
    if (eval(obj.attribute)) return obj.beforeText + choices[0] + obj.afterText;
    return [(obj.beforeText + choices[1]), obj.afterText];
}

/*
* Searches text for validTags.  You can customize which tag dictionary to check with.
*/ 
function findTag (start, text, validTags = formatTags, removeContentLineBreaksOnly = false) {
    var obj = {}
    if (start >= text.length) return false;
    let closeStart = text.substring(start).indexOf('[/');
    if (closeStart < 0) return false;
    closeStart += start;
    let closeEnd = text.substring(closeStart + 2).indexOf(']');
    if (closeEnd < 0) return false;
    closeEnd += (closeStart + 2);
    let tag = text.substring(closeStart + 2, closeEnd).toLowerCase();
    obj = findTextInBracketBackwards(text, tag, closeStart);
    if (removeContentLineBreaksOnly) {
        return obj;
    }
    if (!obj) return false;
    if (!validTags.hasOwnProperty(tag)) {
        return {start: closeEnd};
    }
    openStart = obj.openStart;
    // let openStart = text.toLowerCase().substring(0, closeStart).lastIndexOf('[' + tag + ']');
    if (text[openStart + 1 + tag.length] == ']') {
        let content = text.substring(openStart + tag.length + 2, closeStart);
        return {
            tag: tag,
            beforeText: text.substring(0, openStart),
            content: content,
            afterText: text.substring(closeEnd + 1),
            start: openStart + content.length,
        };
    }
    openStart = text.toLowerCase().lastIndexOf('[' + tag + '=');
    if (text[openStart + 1 + tag.length] == '=') {
        var attribute = findAttribute(text.substring(openStart + tag.length + 2));
        if (!attribute) return {start: closeEnd};
        let content =  text.substring(openStart + tag.length + attribute.length + 3, closeStart)
        return {
            tag: tag,
            beforeText: text.substring(0, openStart),
            attribute: attribute,
            // any line breaks within the content of a tag will be replaced with spaces
            content: content,
            afterText: text.substring(closeEnd + 1),
            start: openStart + content.length
        };
    }
    return {start: closeEnd};
}

/*
* Extracts attribute from the opening tag, if one is available
*/
function findAttribute(text, symbol) {
    let obj = findTextInBracket('[' + text, '[]');
    if (!obj) return false;
    return obj.bracketContents;
}

/*
* Finds the first set of valid matching brackets, then separates the text
*/
function findTextInBracket(text, symbols = '()') {
    openSym = symbols[0];
    closeSym = symbols[1];
    var start = text.indexOf(openSym);
    if (start < 0) return false;
    var count = 1;
    position = start + 1;
    while (count !== 0 && position < text.length) {
        if (text[position] === openSym) count++;
        else if (text[position] === closeSym) count--;
        position++;
    }
    if (count !== 0) return false;
    return {
        beforeBracket: text.substring(0, start),
        bracketContents: text.substring(start + 1, position - 1),
        afterBracket: text.substring(position)
    };
}

// for removing line breakbreaks
// to-do:  find a way to merge this with the above function
function findTextInBracketBackwards(text, tag, closeStart) {
    let lower = text.toLowerCase();
    let closeEnd = closeStart + tag.length + 3;
    let count = 0;
    let openTag = '[' + tag;
    let closeTag = '[/' + tag + ']';
    let openStart = text.substring(0, closeStart).lastIndexOf(openTag);
    closeStart = text.substring(0, closeStart).indexOf(closeTag);
    // if (openStart < 0) return {start: closeEnd};
    if (openStart < closeStart) count = 1;
    while (count != 0 && openStart >= 0) {
        openStart = text.substring(0, openStart).lastIndexOf(openTag);
        if (openStart > 0) count -= 1;
        closeStart = text.substring(0, closeStart).lastIndexOf(closeTag);
        if (closeStart > openStart) count += 1;
    }
    if (count != 0 || openStart < 0) return false;
    // position = text.substring(0, position + 1).toLowerCase().lastIndexOf('[' + tag);
    // if (count != 0 || position < 0) return false;
    let beforeText = text.substring(0, openStart);
    let middleText = text.substring(openStart, closeEnd).split('\n').join(' ');
    let afterText = text.substring(closeEnd);
    let newText = beforeText + middleText + afterText;
    return {newText: newText, start: closeEnd, openStart: openStart};
}

function removeContentLineBreaks(text) {
    let processed = findTag (0, text, formatTags, true);
    while (processed) {
        text = processed.newText;
        processed = findTag (processed.start, text, formatTags, true);
    }
    return text;
}

// parses BB Code.  validTags is the dictionary containing which tags we are currently looking at.
function parseBBCode(text, validTags) {
    var br = text.toLowerCase().indexOf('[br]');
    while (br > -1) {
        text = text.substring(0, br) + '<br>' + text.substring(br + 4);
        br = text.toLowerCase().indexOf('[br]');
    }
    var start = 0;
    var tags = findTag(start, text, validTags);
    while (tags) {
        if (validTags[tags.tag] != null) {
            results = validTags[tags.tag](tags);
            text = results[0] + results[1];
            start = results[0].length;
        } else start = tags.start;
        tags = findTag(start, text, validTags);
    }
    return text;
}

// parses formatting tags, upon files being loaded
function parseBBFormatting(text) {
    return parseBBCode(text, formatTags);
}

// parses live javascript on demand
function parseJSCode(text) {
    text = parseBBCode(text, liveTags);
    return(text);
    // return parseBBCode(text, liveTags);
}


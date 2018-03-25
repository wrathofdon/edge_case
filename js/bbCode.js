/*jshint esversion: 6 */

/* global addNameSpace */


/*
* preliminary formatting for the raw tag.  For when you want to display code without the code being processed
*/
var rawTag = {
    'raw': obj => bbCodeRaw(obj)
};

/*
* these are the bbCode tags that are processed the first time the text files are loaded
* since they do not depend on variables, they can be loaded on the start
*/
var formatTags = {
    // makes text bold
    'b': obj => '<strong>' + obj.content + '</strong>',
    // makes text italicized
    'i': obj => '<em>' + obj.content + '</i>',
    // adds underline
    'u': obj => '<u>' + obj.content + '</u>',
    // unordered list
    'ul': obj => bbCodeCreateList(obj),
    //ordered list
    'ol': obj => bbCodeCreateList(obj),
    // displays image, where the content is the url
    'img': obj => '<img src="' + obj.content + '">',
    // shows external link, where the attribute is the url and the content is the display text
    'url': obj => '<a href="' + obj.attribute + '" target="blank">' +
		obj.content + "</a>"
};

/**
* these are the bbCode tags which are javascript dependent
* since they can change based on variables, they are loaded on demand
*/
var liveTags = {
    // ternery function, where the attribute is the condition, and the content are the two possible options, separated by a ':'
    'tern': obj => bbCodeTernery(obj),
    // javascript code.  Runs when slide is displayed.  If attribute is "return", then code is evaluated as an Immediately Invoked Function Expressions.  This is in case the user wants to add complicated logic to return specific values
    'js': obj => bbCodeJSTag(obj.content),
    // grabs excerpt text from outside slide.
    'cite': obj => bbCodeCite(obj),
    // creates a toggle button, where the attribute is the button text and the content is the contents
    'toggle': obj => bbCodeToggle(obj),
    // similar to URL, but for internal links.
    'goto': obj => bbCodeGoto(obj)
};

function bbCodeJSTag(obj) {
    if (!obj.attribute.toLowerCase() === 'return') {
        obj.content = '(function(){' + obj.content+ '})()';
    }
    eval(obj.content);
}

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
    return output + '</' + obj.tag + '>';
}

/*
* Used for formatting raw text
*/
function bbCodeRaw(obj) {
    obj.content = obj.content.replace("<", "&#60;");
    obj.content = obj.content.replace(">", "&#62;");
    obj.content = obj.content.replace("[", "&#91;");
    obj.content = obj.content.replace("]", "&#93;");
    obj.content = obj.content.replace("\n", "<br>");
    return obj.content;
}


/*
* Used for creating toggle text
*/
function bbCodeToggle(obj) {
    let toggleID = `toggle-no-${toggleCounter++}`;
    let buttonText = `<button class="toggle-button" toggleId="${toggleID}">${obj.attribute}</button>`;
    let paragragphText = `<div id="${toggleID}" style="display: None"><br>${obj.content}</div>`;
    return buttonText + paragragphText;
}

function bbCodeGoto(obj) {
    let destination = addNameSpace(obj.attribute, currentSlide().project, currentSlide().namespace);
    return `<goto slide=${destination}>${obj.content}</goto>`;
}

/*
* Used for calling segments from other cards
*/
function bbCodeCite(obj) {
    // cite results in an array, where the first element is the name of the slide, and the second element is the excerpt
    let cite = addNameSpace(obj.content, currentSlide().project, currentSlide().namespace).split('@');
    let slide = slides[cite[0]];
    let sub = 'all';
    if (cite.length === 2) sub = cite[1];
    if (slide === null || slide.excerpts[sub] === null)
        return `Error: ${obj.content} not found`;
    let lines = slide.excerpts[sub];
    let text = '';
    for (let i = 0; i < lines.length; i++) {
        let line = parseJSCode(lines[i]);
        if (line.trim()) text += '<br>' + line + '<br>';
    }
    return text;
}

/*
* Handles ternery commands.  For instance:
* `[tern=true]yes::no[/tern]` results in "yes"
*/
function bbCodeTernery(obj) {
    var choices = obj.content.split('::');
    if (choices.length !== 2) return ' [<INVALID TERNERY>] ';
    if (eval(obj.attribute)) choices[0];
    return choices[1];
}

/*
* Searches text for validTags.  You can customize which tag dictionary to check with.
*/

function findTag (start, text, validTags = formatTags, removeContentLineBreaks = false) {
    if (!text) return false;
    let lower = text.toLowerCase();

    // find the position of the closing tag
    if (start >= text.length) return false;
    let closeStart = text.substring(start).indexOf('[/');
    if (closeStart < 0) return false;
    closeStart += start;
    let closeEnd = text.substring(closeStart + 2).indexOf(']');
    if (closeEnd < 0) return false;
    closeEnd += (closeStart + 2);
    let tag = lower.substring(closeStart + 2, closeEnd);

    if (!validTags[tag] && !removeContentLineBreaks) return {start: closeEnd};
    // find the position of the opening tag, while also avoiding inner tags
    let openStart = closeStart;
    let innerClose = closeStart;
    let closeTagsCount = 1;
    let attribute, openEnd;
    while (closeTagsCount !== 0 && openStart > 0) {
        attribute = false;
        do {
            openStart = lower.substring(0, openStart).lastIndexOf('[' + tag);
            if (openStart < 0) break;
            attribute = findAttribute(text.substring(openStart), tag, '[]');
        } while (attribute === false);
        if (attribute !== false) closeTagsCount -= 1;
        innerClose = lower.substring(0, innerClose).lastIndexOf(`[/${tag}]`);
        if (innerClose > openStart) closeTagsCount += 1;
    }
    if (openStart < 0) return {start: closeEnd};
    let beforeText = text.substring(0, openStart);
    let afterText = text.substring(closeEnd + 1);
    if (attribute === '') openEnd = openStart + tag.length + 1;
    else openEnd = openStart + tag.length + attribute.length + 2;
    if (removeContentLineBreaks) { text = beforeText +
        text.substring(openStart, closeEnd + 1).split('\n').join(' ') + afterText;}
    if (!validTags[tag]) {
        return {text: text, start: closeEnd};
    }
    let content = text.substring(openEnd + 1, closeStart);
    let middleText = validTags[tag]({tag: tag, attribute: attribute, content: content});
    return {
        text: beforeText + middleText + afterText,
        start: beforeText.length + middleText.length};
}

/*
* Extracts attribute from the opening tag, if one is available
*/
function findAttribute(text, tag, symbol) {
    if (text[tag.length + 1] === ']') {
        return '';
    } else if (text[tag.length + 1] === '=') {
        let attribute = findTextInBracket('[' + text.substring(tag.length + 2), '[]');
        if (attribute) return attribute.bracketContents.split('\n').join(' ');
    }
    return false;
}
/*
* Finds the first set of valid matching brackets, then separates the text
*/
function findTextInBracket(text, symbols = '()') {
    let openSym = symbols[0];
    let closeSym = symbols[1];
    var start = text.indexOf(openSym);
    if (start < 0) return false;
    var count = 1;
    let position = start + 1;
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

// parses BB Code.  validTags is the dictionary containing which tags we are currently looking at.
function parseBBCode(text, validTags, removeContentLineBreaks = false) {
    if (!removeContentLineBreaks) {
        var br = text.toLowerCase().indexOf('[br]');
        while (br > -1) {
            text = text.substring(0, br) + '<br>' + text.substring(br + 4);
            br = text.toLowerCase().indexOf('[br]');}
    }
    let start = 0;
    let results = findTag (start, text, validTags, removeContentLineBreaks);
    while (results) {
        text = results.text || text;
        start = results.start;
        results = findTag (start, text, validTags, removeContentLineBreaks);
    }
    return text;
}

// checks for the use of the [raw] tag, for displaying unrendered code
function parseRawFormatting(text) {
    return parseBBCode(text, rawTag);
}

// parses formatting tags, upon files being loaded
function parseBBFormatting(text) {
    return parseBBCode(text, formatTags, true);
}

// parses live javascript on demand
function parseJSCode(text) {
    return parseBBCode(text, liveTags);
}
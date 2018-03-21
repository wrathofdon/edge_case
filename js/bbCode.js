/*jshint esversion: 6 */


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
    'b': obj => '<strong>' + obj.content + '</strong>',
    'i': obj => '<em>' + obj.content + '</i>',
    'u': obj => '<u>' + obj.content + '</u>',
    'ul': obj => bbCodeCreateList(obj),
    'ol': obj => bbCodeCreateList(obj),
    'img': obj => '<img src="' + obj.content + '">',
    'url': obj => '<a href="' + obj.attribute + '" target="blank">' +
		obj.content + "</a>"
};

/**
* these are the bbCode tags which are javascript dependent
* since they can change based on variables, they are loaded on demand
*/
var liveTags = {
    'tern': obj => bbCodeTernery(obj),
    'js': obj => eval(obj.content),
    'run': obj => eval('(function(){' + obj.content+ '})()'),
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
    return output + '</' + obj.tag + '>';
}

/*
* Used for formatting raw text
*/
function bbCodeRaw(obj) {
    obj.content.replace("<", "&#60;");
    obj.content.replace(">", "&#62;");
    obj.content.replace("[", "&#91;");
    obj.content.replace("]", "&#93;");
    obj.content.replace("\n", "<br>");
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

/*
* Used for calling segments from other cards
*/
function bbCodeCite(obj) {
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

// parses formatting tags, upon files being loaded
function parseBBFormatting(text) {
    return parseBBCode(text, formatTags, true);
}

// parses live javascript on demand
function parseJSCode(text) {
    return parseBBCode(text, liveTags);
}

function removeContentLineBreaks(text) {return text;}




// /*jshint esversion: 6 */

// /*
// * these are the bbCode tags that are processed the first time the text files are loaded
// * since they do not depend on variables, they can be loaded on the start
// */
// var formatTags = {
//     'b': obj => [(obj.beforeText + '<strong>' + obj.content + '</strong>'), obj.afterText],
//     'i': obj => [(obj.beforeText + '<em>' + obj.content + '</i>'), obj.afterText],
//     'u': obj => [(obj.beforeText + '<u>' + obj.content + '</u>'), obj.afterText],
//     'ul': obj => bbCodeCreateList(obj),
//     'ol': obj => bbCodeCreateList(obj),
//     'img': obj => [(obj.beforeText + '<img src="' + obj.content + '">'), obj.afterText],
//     'url': obj => [(obj.beforeText + '<a href="' + obj.attribute + 
//         '" target="blank">' + obj.content + "</a>"), obj.afterText]
// };

// /*
// * these are the bbCode tags which are javascript dependent
// * since they can change based on variables, they are loaded on demand
// */
// var liveTags = {
//     'tern': obj => bbCodeTernery(obj),
//     'js': obj => [(obj.beforeText + eval(obj.content)), obj.afterText],
//     'run': obj => [(obj.beforeText + eval('(function(){' + obj.content+ '})()')), obj.afterText],
//     'cite': obj => bbCodeCite(obj),
//     'toggle': obj => bbCodeToggle(obj)
// };

// /*
// * Used for formatting lists in BB Code
// */
// function bbCodeCreateList(obj) {
//     obj.content.replace("\n", "");
//     var output = '<' + obj.tag + '>';
//     var items = obj.content.split('[*]');
//     for (var i = 0; i < items.length; i++) {
//         if (items[i].trim()) output += '<li>' + items[i] + '</li>';
//     }
//     return [(obj.beforeText + output + '</' + obj.tag + '>'), obj.afterText];
// }

// /*
// * Used for creating toggle text
// */
// function bbCodeToggle(obj) {
//     let toggleID = `toggle-no-${toggleCounter++}`;
//     let buttonText = `<button class="toggle-button" toggleId="${toggleID}">${obj.attribute}</button>`;
//     let paragragphText = `<div id="${toggleID}" style="display: None"><br>${obj.content}</div>`;
//     return [(obj.beforeText + buttonText + paragragphText), obj.afterText];
// }

// /*
// * Used for calling segments from other cards
// */
// function bbCodeCite(obj) {
//     console.log(obj)
//     let cite = addNameSpace(obj.content, currentSlide().project, currentSlide().namespace).split('@');
//     let slide = slides[cite[0]];
//     let sub = 'all';
//     if (cite.length == 2) sub = cite[1];
//     if (slide == null || slide.excerpts[sub] == null) return obj.beforeText + obj.content + obj.afterText;
//     let lines = slide.excerpts[sub];
//     let text = '';
//     for (let i = 0; i < lines.length; i++) {
//         line = parseJSCode(lines[i]);
//         if (line.trim()) text += '<br>' + line + '<br>';
//     }
//     return [(obj.beforeText + text), obj.afterText];
// }

// /* 
// * Handles ternery commands.  For instance:
// * `[tern=true]yes::no[/tern]` results in "yes"
// */ 
// function bbCodeTernery(obj) {
//     var choices = obj.content.split('::');
//     if (choices.length != 2) return obj.beforeText + ' [<INVALID TERNERY>] ' + obj.afterText;
//     if (eval(obj.attribute)) return obj.beforeText + choices[0] + obj.afterText;
//     return [(obj.beforeText + choices[1]), obj.afterText];
// }

// /*
// * Searches text for validTags.  You can customize which tag dictionary to check with.
// */ 
// function findTag (start, text, validTags = formatTags, removeContentLineBreaksOnly = false) {
//     var obj = {}
//     if (start >= text.length) return false;
//     let closeStart = text.substring(start).indexOf('[/');
//     if (closeStart < 0) return false;
//     closeStart += start;
//     let closeEnd = text.substring(closeStart + 2).indexOf(']');
//     if (closeEnd < 0) return false;
//     closeEnd += (closeStart + 2);
//     let tag = text.substring(closeStart + 2, closeEnd).toLowerCase();
//     obj = findTextInBracketBackwards(text, tag, closeStart);
//     if (removeContentLineBreaksOnly) {
//         return obj;
//     }
//     if (!obj) return false;
//     if (!validTags.hasOwnProperty(tag)) {
//         return {start: closeEnd};
//     }
//     openStart = obj.openStart;
//     // let openStart = text.toLowerCase().substring(0, closeStart).lastIndexOf('[' + tag + ']');
//     if (text[openStart + 1 + tag.length] == ']') {
//         let content = text.substring(openStart + tag.length + 2, closeStart);
//         return {
//             tag: tag,
//             beforeText: text.substring(0, openStart),
//             content: content,
//             afterText: text.substring(closeEnd + 1),
//             start: openStart + content.length,
//         };
//     }
//     openStart = text.toLowerCase().lastIndexOf('[' + tag + '=');
//     if (text[openStart + 1 + tag.length] == '=') {
//         var attribute = findAttribute(text.substring(openStart + tag.length + 2));
//         if (!attribute) return {start: closeEnd};
//         let content =  text.substring(openStart + tag.length + attribute.length + 3, closeStart)
//         return {
//             tag: tag,
//             beforeText: text.substring(0, openStart),
//             attribute: attribute,
//             // any line breaks within the content of a tag will be replaced with spaces
//             content: content,
//             afterText: text.substring(closeEnd + 1),
//             start: openStart + content.length
//         };
//     }
//     return {start: closeEnd};
// }

// /*
// * Extracts attribute from the opening tag, if one is available
// */
// function findAttribute(text, symbol) {
//     let obj = findTextInBracket('[' + text, '[]');
//     if (!obj) return false;
//     return obj.bracketContents;
// }

// /*
// * Finds the first set of valid matching brackets, then separates the text
// */
// function findTextInBracket(text, symbols = '()') {
//     openSym = symbols[0];
//     closeSym = symbols[1];
//     var start = text.indexOf(openSym);
//     if (start < 0) return false;
//     var count = 1;
//     position = start + 1;
//     while (count !== 0 && position < text.length) {
//         if (text[position] === openSym) count++;
//         else if (text[position] === closeSym) count--;
//         position++;
//     }
//     if (count !== 0) return false;
//     return {
//         beforeBracket: text.substring(0, start),
//         bracketContents: text.substring(start + 1, position - 1),
//         afterBracket: text.substring(position)
//     };
// }

// // for removing line breakbreaks
// // to-do:  find a way to merge this with the above function
// function findTextInBracketBackwards(text, tag, closeStart) {
//     let lower = text.toLowerCase();
//     let closeEnd = closeStart + tag.length + 3;
//     let count = 0;
//     let openTag = '[' + tag;
//     let closeTag = '[/' + tag + ']';
//     let openStart = text.substring(0, closeStart).lastIndexOf(openTag);
//     closeStart = text.substring(0, closeStart).indexOf(closeTag);
//     // if (openStart < 0) return {start: closeEnd};
    // if (openStart < closeStart) count = 1;
    // while (count != 0 && openStart >= 0) {
    //     openStart = text.substring(0, openStart).lastIndexOf(openTag);
    //     if (openStart > 0) count -= 1;
    //     closeStart = text.substring(0, closeStart).lastIndexOf(closeTag);
    //     if (closeStart > openStart) count += 1;
    // }
//     if (count != 0 || openStart < 0) return false;
//     // position = text.substring(0, position + 1).toLowerCase().lastIndexOf('[' + tag);
//     // if (count != 0 || position < 0) return false;
//     let beforeText = text.substring(0, openStart);
//     let middleText = text.substring(openStart, closeEnd).split('\n').join(' ');
//     let afterText = text.substring(closeEnd);
//     let newText = beforeText + middleText + afterText;
//     return {newText: newText, start: closeEnd, openStart: openStart};
// }

// function removeContentLineBreaks(text) {
//     let processed = findTag (0, text, formatTags, true);
//     while (processed) {
//         text = processed.newText;
//         processed = findTag (processed.start, text, formatTags, true);
//     }
//     return text;
// }

// // parses BB Code.  validTags is the dictionary containing which tags we are currently looking at.
// function parseBBCode(text, validTags) {
//     var br = text.toLowerCase().indexOf('[br]');
//     while (br > -1) {
//         text = text.substring(0, br) + '<br>' + text.substring(br + 4);
//         br = text.toLowerCase().indexOf('[br]');
//     }
//     var start = 0;
//     var tags = findTag(start, text, validTags);
//     while (tags) {
//         if (validTags[tags.tag] != null) {
//             results = validTags[tags.tag](tags);
//             text = results[0] + results[1];
//             start = results[0].length;
//         } else start = tags.start;
//         tags = findTag(start, text, validTags);
//     }
//     return text;
// }

// // parses formatting tags, upon files being loaded
// function parseBBFormatting(text) {
//     return parseBBCode(text, formatTags);
// }

// // parses live javascript on demand
// function parseJSCode(text) {
//     text = parseBBCode(text, liveTags);
//     return(text);
//     // return parseBBCode(text, liveTags);
// }

function convertText (text) {
  while (text.toLowerCase().indexOf('[br]') > -1) {
    var position = text.toLowerCase().indexOf('[br]');
    text = text.substring(0, position) + '<br>' + text.substring(position + 4);
  }
  var bbCode = findTags(text);
  while (bbCode) {
    // TODO: Process tag
    if (bbCode.tag === 'img') {
      text = bbCode.textBefore + '<img src="' + bbCode.content + '"">' + bbCode.textAfter;
    } else if (bbCode.tag === 'b') {
      text = bbCode.textBefore + '<strong>' + bbCode.content + '</strong>' + bbCode.textAfter;
    } else if (bbCode.tag === 'i') {
      text = bbCode.textBefore + '<em>' + bbCode.content + '</em>' + bbCode.textAfter;
    } else if (bbCode.tag === 'u') {
      text = bbCode.textBefore + '<u>' + bbCode.content + '</u>' + bbCode.textAfter;
    } else if (bbCode.tag === 'url') {
      text = bbCode.textBefore + '<a href="' + bbCode.attribute + '" target="blank">' + bbCode.content + bbCode.textAfter;
    } else if (bbCode.tag === 'js') {
      text = bbCode.textBefore + eval(bbCode.content) + bbCode.textAfter;
    } else {
      text = bbCode.textBefore + bbCode.content + bbCode.textAfter;
    }
    bbCode = findTags(text);
  }
  return text;
}

function findTags(text) {

  var lower = text.toLowerCase();
  var closeStart = lower.indexOf('[/');
  if (closeStart === -1) return false;
  var closeEnd = lower.substring(closeStart).indexOf(']') + closeStart;
  if (closeEnd === -1) return false;
  var tagLength = closeEnd - closeStart - 2;
  var tag = lower.substring(closeStart + 2, closeStart + 2 + tagLength);
  var openStart = lower.lastIndexOf('[' + tag);
  if (openStart === -1) return false;
  var openEnd = findClosingBracket(lower, openStart, closeStart);
  if (openEnd === -1) return false;
  var assignmentPosition = text.substring(openStart).indexOf('=') + openStart;
  var hasAttribute = assignmentPosition > -1;
  var content = text.substring(openEnd + 1, closeStart);
  var attribute;
  if (!hasAttribute) attribute = null;
  else attribute = text.substring(assignmentPosition + 1, openEnd);
  return {
    textBefore : text.substring(0, openStart),
    textAfter : text.substring(closeEnd + 1),
    tag : tag,
    attribute : attribute,
    content : content
  }
}

function findClosingBracket(text, start, end) {
  var position = start;
  var count = 1;
  while (count !== 0 && position < end) {
    position++;
    if (text[position] === '[') count++;
    if (text[position] === ']') count--;
  }
  return position;
}

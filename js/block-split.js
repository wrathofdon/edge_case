function splitTextIntoBlocks (text, dict, recursive=false, card=null) {
  let lower = text.toLowerCase();
  let tagList = Object.keys(dict);
  let array = [];
  let lastPushIndex = 0;
  let nextOpenTagObj = findNextOpenTag(tagList, dict, lower, lastPushIndex)
  while (lastPushIndex <= nextOpenTagObj.index) {
    let originalTag = nextOpenTagObj.originalTag;
    let nextOpenTagIndex = nextOpenTagObj.index
    let tagObj = validateFullTag(nextOpenTagIndex, originalTag, text, lower);
    if (!tagObj) {
      nextOpenTagObj = findNextOpenTag(tagList, dict, lower, nextOpenTagIndex +
        originalTag.length)
      continue;
    }
    if (lastPushIndex < tagObj.start) {
      let untaggedText = text.substring(lastPushIndex, tagObj.start)
        .replaceAll('\n\n', '<p></p>');
      if (untaggedText.trim()) array.push(untaggedText);
      lastPushIndex = tagObj.start;
    }
    array.push(new Block(originalTag, tagObj.properties, tagObj.content, dict, recursive, card));
    lastPushIndex = tagObj.end;
    nextOpenTagObj = findNextOpenTag(tagList, dict, lower, lastPushIndex);
  }
  let untaggedText = text.substring(lastPushIndex)
  if (recursive) untaggedText = untaggedText.replaceAll('\n\n', '<br><br>');
  if (untaggedText.trim()) array.push(untaggedText);
  return array;
}

function findNextOpenTag(tagList, dict, lower, start) {
  if (tagList.length === 1) {
    return {originalTag: tagList[0], index:
      lower.indexOf(`[${tagList[0].substring(1)}`, start)}
  }
  start = lower.indexOf('[', start);
  if (start === -1) return {originalTag: null, index: -1};
  let pointer = start + 1;
  let trie = getTagTrieFromDict(dict);
  let limit = lower.length;
  while (pointer < limit && trie[lower[pointer]]) {
    trie = trie[lower[pointer]];
    pointer += 1;
  }
  if (pointer >= limit || !dict[trie]) return {originalTag: null, index: -1};
  return {originalTag: trie, index: start};
}

function validateFullTag(openBracketStart, originalTag, text, lower) {
  let tag = originalTag.substring(1);
  let openTagObj = validateOpenTag(text, lower, openBracketStart, tag);
  if (!openTagObj) return null;
  if (originalTag[0] === '1') {
    return {start: openBracketStart, end: openTagObj.openTagEnd,
      properties: openTagObj.properties, content: null, tag: originalTag};
  }
  let closeTagStart = findClose(text, lower, openTagObj.openTagEnd, `[${tag}`, `[/${tag}]`);
  if (closeTagStart === -1) return null;
  return {start: openBracketStart, end: closeTagStart + tag.length + 3,
    properties: openTagObj.properties, content: text.substring(openTagObj.openTagEnd, closeTagStart), tag: originalTag}
}

function validateOpenTag(text, lower, openBracket, tag) {
  let postTagSymbol = text[openBracket + tag.length + 1];
  if (postTagSymbol === ']') {
    return {properties: {}, openTagEnd: openBracket + tag.length + 2};
  }
  if (postTagSymbol === ' ' || postTagSymbol === ':') {
    let closeBracket = findClose(text, lower, openBracket + tag.length + 1, '[', ']');
    if (closeBracket === -1) return null;
    let propertiesStart = (postTagSymbol === ':') ?
      openBracket + 1 : openBracket + tag.length + 1;
    let properties = parseBlockProperties(text.substring(propertiesStart, closeBracket));
    if (properties === null) return null;
    return {openTagEnd: closeBracket + 1, properties: properties};
  }
  return null;
}

function getTagTrieFromDict(dict) {
  if (globalTagTrie[dict]) return globalTagTrie[dict];
  globalTagTrie[dict] = {}
  for (let i in Object.keys(dict)) {
    let key = Object.keys(dict)[i];
    globalTagList.push(key.substring(1));
    let currentDict = globalTagTrie[dict];
    for (let j = 1; j < key.length; j++) {
      if (!currentDict[key[j]]) {
        currentDict[key[j]] = {};
      }
      currentDict = currentDict[key[j]];
    }
    currentDict[' '] = key;
    currentDict[':'] = key;
    currentDict[']'] = key;
  }
  return globalTagTrie[dict]
}

function parseBlockProperties(text, caseSensitive = false) {
  if (!text.trim()) return null;
  let properties = {}
  try {
    eval(`properties = {${text}}`);
  } catch(err) {
    console.log(`Trouble parsing properties: "${text}"`);
    if (err instanceof ReferenceError) {
      console.log('Did you remember to put quotation marks around ' +
      'your string and commas between properties?');
    } else if (err instanceof SyntaxError) {
      console.log('Did you remember to add quotation marks?');
    }
    return null;
  }
  if (caseSensitive) return properties;
  // all property keys must be converted to lowercase
  let lower = {};
  for (let property in properties) {
    lower[property.toLowerCase()] = properties[property];
  }
  return lower;
}

function findClose(text, lower, startIndex, openStr, closeStr) {
  let nextCloseStrIndex = lower.indexOf(closeStr, startIndex);
  if (nextCloseStrIndex === -1) return -1;
  let nextOpenStrIndex = lower.substring(0, nextCloseStrIndex).indexOf(openStr, startIndex);
  while (nextOpenStrIndex > -1) {
    nextCloseStrIndex = lower.indexOf(closeStr, nextCloseStrIndex + closeStr.length);
    if (nextCloseStrIndex === -1) return -1;
    nextOpenStrIndex = lower.substring(0, nextCloseStrIndex).indexOf(openStr, nextOpenStrIndex + openStr.length);
  }
  return nextCloseStrIndex;
}

function joinBlockArray(array) {
  let outputArray = [];
  for (let i in array) {
    let block = array[i]
    if (block) {
      if (typeof(block) === 'string') outputArray.push(block);
      else outputArray.push(block.parseContents());
    }
  }
  return outputArray.join('');
}

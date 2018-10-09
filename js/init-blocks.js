// counter for when we need to generate a unique ID that isn't being used
function getUniqueId() {
  sUniqueIdCounter += 1;
  return sUniqueIdCounter;
}

// takes in a string and breaks it into an array individual blocks
// untagged text is simply entered as a string
// blocks are defined by the dictionary (dict) which maps tags to functions
function splitTextIntoBlocks (text, dict, recursive=false, card=null) {
  let lower = text.toLowerCase();
  let tagList = Object.keys(dict);
  let array = [];
  // the index of content that's already been pushed
  let lastPushIndex = 0;
  // looks for the next possible opening tag
  // findNextOpenTag returns an object with a tag name and position index
  let nextOpenTagObj = findNextOpenTag(tagList, dict, lower, lastPushIndex)
  while (lastPushIndex <= nextOpenTagObj.index) {
    // original tag as it appears in the dictionary
    // dictionary tags have a prefix:  2 means open + close, 1 means self-closing
    let originalTag = nextOpenTagObj.originalTag;
    let nextOpenTagIndex = nextOpenTagObj.index
    // Checks to see if tag is valid.  If not, move forward
    let tagObj = validateFullTag(nextOpenTagIndex, originalTag, text, lower);
    if (!tagObj) {
      nextOpenTagObj = findNextOpenTag(tagList, dict, lower, nextOpenTagIndex +
        originalTag.length)
      continue;
    }
    // if there is unformatted text between the last block and the current one
    // append that text as a string
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
  // if there is unformatted text at the end, include it as a string
  let untaggedText = text.substring(lastPushIndex)
  // convert double line breaks to a format that the HTML can recognize
  if (recursive) untaggedText = untaggedText.replaceAll('\n\n', '<br><br>');
  if (untaggedText.trim()) array.push(untaggedText);
  return array;
}

// searches text for next open tag.  Returns an object with tag name and index
// Returning object with an index of -1 means no valid open tag was found
function findNextOpenTag(tagList, dict, lower, start) {
  // If there is only one tag to search, then the logic is fairly straight forward
  if (tagList.length === 1) {
    return {originalTag: tagList[0], index:
      lower.indexOf(`[${tagList[0].substring(1)}`, start)}
  }
  start = lower.indexOf('[', start);
  if (start === -1) return {originalTag: null, index: -1};
  let pointer = start + 1;
  // if there are multiple tags to search, then we iterate through the string
  // to check for matches via a trie
  let trie = getTagTrieFromDict(dict);
  let limit = lower.length;
  while (pointer < limit && trie[lower[pointer]]) {
    trie = trie[lower[pointer]];
    pointer += 1;
  }
  if (pointer >= limit || !dict[trie]) return {originalTag: null, index: -1};
  return {originalTag: trie, index: start};
}

// Generates a trie if a trie does not currently exist.  Otherwise, return
// existing trie
function getTagTrieFromDict(dict) {
  if (globalTagTrie[dict]) return globalTagTrie[dict];
  globalTagTrie[dict] = {}
  for (let i in Object.keys(dict)) {
    let key = Object.keys(dict)[i];
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

// checks to see if tag is valid.  There must be a valid opening tag.  If the
// tag requires a closing, then the close tag must be valid as well
function validateFullTag(openBracketStart, originalTag, text, lower) {
  let tag = originalTag.substring(1);
  let openTagObj = validateOpenTag(text, lower, openBracketStart, tag);
  if (!openTagObj) return null;
  // if the first character of the tag name is a "1", that means there is no
  // closing tag, and we can end right here
  if (originalTag[0] === '1') {
    return {start: openBracketStart, end: openTagObj.openTagEnd,
      properties: openTagObj.properties, content: null, tag: originalTag};
  }
  let closeTagStart = findClose(text, lower, openTagObj.openTagEnd, `[${tag}`, `[/${tag}]`);
  if (closeTagStart === -1) return null;
  return {start: openBracketStart, end: closeTagStart + tag.length + 3,
    properties: openTagObj.properties, content: text.substring(openTagObj.openTagEnd, closeTagStart), tag: originalTag}
}

// Checks to see if the opening tag is valid
function validateOpenTag(text, lower, openBracket, tag) {
  let postTagSymbol = text[openBracket + tag.length + 1];
  // for the opening tag to be valid, the next symbol after the tag name can
  // either be ']', ' ', or ':'
  if (postTagSymbol === ']') {
    return {properties: {}, openTagEnd: openBracket + tag.length + 2};
  }
  if (postTagSymbol === ' ' || postTagSymbol === ':') {
    let closeBracket = findClose(text, lower, openBracket + tag.length + 1, '[', ']');
    if (closeBracket === -1) return null;
    let propertiesStart = (postTagSymbol === ':') ?
      openBracket + 1 : openBracket + tag.length + 1;
    // if properties exist, then make sure that they are formatted properly
    let properties = parseBlockProperties(text.substring(propertiesStart, closeBracket));
    if (properties === null) return null;
    return {openTagEnd: closeBracket + 1, properties: properties};
  }
  return null;
}

// checks to see if properties in the opening tag are formatted properly
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

// attempts to find a the next valid closing symbol
// this means ignoring nested matches in between
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

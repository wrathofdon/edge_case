// generates id for html elements so those elements can be accessed by id
function getUniqueId() {
  sUniqueIdCounter += 1;
  return sUniqueIdCounter;
}

// takes in a string and returns an array of strings/blocks
// dict is an object that maps tag names to functions
function splitTextIntoBlocks (text, dict, recursive=false, card=null) {
  let lower = text.toLowerCase(); // makes it easier to scan text
  let tagList = Object.keys(dict);
  let array = []; // starting array
  let lastPushIndex = 0; // index of content that has been already added
  // searches for next valid opening tag
  let nextOpenTagObj = findNextOpenTag(tagList, dict, lower, lastPushIndex)
  while (lastPushIndex <= nextOpenTagObj.index) {
    // original tag is the tag name as it appears in the dictionary
    // dictionary entries includes a '2' for tags with an open/close and
    // a '1' for self-closing tags
    let originalTag = nextOpenTagObj.originalTag;
    let nextOpenTagIndex = nextOpenTagObj.index;
    // Checks to see if block is valid.  If not, then move to the next one
    let tagObj = validateFullBlock(nextOpenTagIndex, originalTag, text, lower);
    if (!tagObj) {
      nextOpenTagObj = findNextOpenTag(tagList, dict, lower, nextOpenTagIndex +
        originalTag.length);
      continue;
    }
    // pushes unformatted text appearing between block
    if (lastPushIndex < tagObj.start) {
      let untaggedText = text.substring(lastPushIndex, tagObj.start)
        .replaceAll('\n\n', '<p></p>');
      if (untaggedText.trim()) array.push(untaggedText);
      lastPushIndex = tagObj.start;
    }
    // pushes block to array
    array.push(new Block(originalTag, tagObj.properties, tagObj.content, dict, recursive, card));
    lastPushIndex = tagObj.end;
    nextOpenTagObj = findNextOpenTag(tagList, dict, lower, lastPushIndex);
  }
  // if there is unformatted text at the end, include it as a string
  let untaggedText = text.substring(lastPushIndex)
  if (recursive) untaggedText = untaggedText.replaceAll('\n\n', '<p></p>');
  if (untaggedText.trim()) array.push(untaggedText);
  return array;
}


// searches text for next open tag.  Returns an object with tag name and index
// Returning object with an index of -1 means no valid open tag was found
function findNextOpenTag(tagList, dict, lower, start) {
  // If there is only one tag to search, then the logic is much simpler
  if (tagList.length === 1) {
    return {originalTag: tagList[0], index:
      lower.indexOf(`[${tagList[0].substring(1)}`, start)}
  }
  var trie;
  let limit = lower.length;
  let pointer = start;
  do {
    pointer = lower.indexOf('[', pointer);
    start = pointer;
    if (pointer === -1) return {originalTag: null, index: -1};
    pointer += 1;
    trie = getTagTrieFromDict(dict);
    while (pointer < limit && trie[lower[pointer]]) {
      trie = trie[lower[pointer]];
      pointer += 1;
    }
  } while (pointer < limit && !dict[trie]);
  if (pointer >= limit || !dict[trie]) return {originalTag: null, index: -1};
  return {originalTag: trie, index: start};
}

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

// checks to see if tag is valid.  if not, return null
function validateFullBlock(openBracketStart, originalTag, text, lower) {
  let tag = originalTag.substring(1);
  // checks if open tag is properly formatted
  let openTagObj = validateOpenTag(text, lower, openBracketStart, tag);
  if (!openTagObj) return null;
  // if block requires contents, then checks to see if there is a valid close tag
  if (originalTag[0] === '1') {
    return {start: openBracketStart, end: openTagObj.openTagEnd,
      properties: openTagObj.properties, content: null, tag: originalTag};
  }
  let closeTagStart = findClose(lower, openTagObj.openTagEnd, `[${tag}`, `[/${tag}]`);
  if (closeTagStart === -1) return null;
  return {start: openBracketStart, end: closeTagStart + tag.length + 3,
    properties: openTagObj.properties, content: text.substring(openTagObj.openTagEnd, closeTagStart), tag: originalTag}
}

// Checks to see if the opening tag is valid, otherwise, return null
function validateOpenTag(text, lower, openBracket, tag) {
  let postTagSymbol = text[openBracket + tag.length + 1];
  // next symbol after the tag name can either be ']', ' ', or ':'
  if (postTagSymbol === ']') {
    return {properties: {}, openTagEnd: openBracket + tag.length + 2};
  }
  if (postTagSymbol === ' ' || postTagSymbol === ':') {
    let closeBracket = findClose(lower, openBracket + tag.length + 1, '[', ']');
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

// checks to see if properties in block are properly formatted
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
function findClose(lower, startIndex, openStr, closeStr) {
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

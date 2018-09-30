class BlockArray {
  constructor(dict, rawText, recursive = false, card = null) {
    this.dict = dict;
    this.rawText = rawText;
    this.array = [];
    this.card = card;
    this.recursive = recursive;
    this.splitBlocks(recursive);
  }

  // outputs the contents for html
  joinBlocks() {
    let textArray = [];
    for (let i in this.array) {
      let block = this.array[i]
      if (block) textArray.push(block.parseContents());
    }
    return textArray.join('');
  }

  // parses the input and turns it into an array individual blocks
  splitBlocks(recursive = false) {
    this.lowerCase = this.rawText.toLowerCase();
    // search logic is different if you're only looking for one type of key
    let tags = Object.keys(this.dict);
    if (tags.length === 1) {
      this.findSingleTag(tags[0]);
    } else {
      this.findMultipleTags(tags);
    }
    delete this.lowerCase;
  }

  /*
  * Give it a range of unformatted text, and it will return a block
  */
  getUntaggedBlockExcerpt(start, end) {
    if (start < end) {
      let untaggedText = this.rawText.substring(start, end);
      if (untaggedText.trim()) {
        return new Block(null, null, untaggedText, this.dict, this.recursive, this.card);
      }
    }
    return null;
  }

  /*
  * If given a start position and tag name, it will validate if the tag has
  * properly formatted properties and closing tag (if close tag is required)
  */
  validateFullTag(openBracketStart, originalTag) {
    let tag = originalTag.substring(1);
    let openTagObj = this.validateOpenTag(openBracketStart, tag);
    if (!openTagObj) return false;
    if (originalTag[0] === '1') {
      return {start: openBracketStart, end: openTagObj.openTagEnd,
        properties: openTagObj.properties, content: null, tag: originalTag};
    }
    let closeTagStart = this.findClose(openTagObj.openTagEnd, `[${tag}`, `[/${tag}]`);
    if (closeTagStart === -1) return false;
    return {start: openBracketStart, end: closeTagStart + tag.length + 3,
      properties: openTagObj.properties, content: this.rawText
        .substring(openTagObj.openTagEnd, closeTagStart), tag: originalTag}
  }

  /*
  * Checks to see if open tag is formatted correctly
  */
  validateOpenTag(openBracket, tag) {
    let postTagSymbol = this.rawText[openBracket + tag.length + 1];
    if (postTagSymbol === ']') {
      return {properties: {}, openTagEnd: openBracket + tag.length + 2};
    }
    if (postTagSymbol !== ' ' && postTagSymbol !== ':') return false;
    let closeBracket = this.findClose(openBracket + tag.length, '[', ']');
    if (closeBracket === -1) return false;
    let properties =
      this.parseProperties(openBracket + 1, closeBracket, tag, postTagSymbol);
    if (!properties) return false;
    return {openTagEnd: closeBracket + 1, properties: properties};
  }

  /*
  * Scans the text for next properly formatted tag, must include valid close
  * tag if one is required
  */
  findNextValidTagWithTrie(start) {
    let openBracket = this.lowerCase.indexOf('[', start);
    let results = {isValid: false};
    while (openBracket > -1 && !results.isValid) {
      results = this.checkForTagWithTrie(openBracket);
      openBracket = results.nextBracket;
    }
    if (openBracket === -1) return null;
    return results;
  }

  /*
  * Searches trie data structure for matching tag
  */
  checkTrieForNextOpenTag(start) {
    start = this.lowerCase.indexOf('[', start);
    if (start === -1) return false;
    let pointer = start + 1;
    let trie = globalTagTrie[this.dict];
    let limit = this.rawText.length;
    while (pointer < limit && trie[this.lowerCase[pointer]]) {
      trie = trie[this.lowerCase[pointer]];
      pointer += 1;
    }
    if (pointer >= limit) return false;
    if (this.dict[trie]) {
      let blockObj = this.validateFullTag(start, trie);
      if (blockObj) return blockObj;
    }
    return this.checkTrieForNextOpenTag(pointer);
  }
  /*
  * Attempts to parse properties from opening tag into JavaScript object
  */
  parseProperties(startIndex, endIndex, tag, postTagSymbol) {
    let propertyString = (postTagSymbol === ':') ?
      this.rawText.substring(startIndex, endIndex) :
      this.rawText.substring(startIndex + tag.length, endIndex);
    if (!propertyString.trim()) return false;
    let properties = {}
    let lower = {};
    try {
      eval(`properties = {${propertyString}}`);
    } catch(err) {
      console.log(`Trouble parsing properties: "${propertyString}"`);
      if (err instanceof ReferenceError) {
        console.log('Did you remember to put quotation marks around ' +
        'your string and commas between properties?');
      } else if (err instanceof SyntaxError) {
        console.log('Did you remember to add quotation marks?');
      }
      return false;
    }
    // all property keys must be converted to lowercase
    for (let property in properties) {
      lower[property.toLowerCase()] = properties[property];
    }
    return lower;
  }
  /*
  * Finds the next valid closing tag.  'Valid' means that any new inner open
  * tags are canceled out by new inner closing tags
  */
  findClose(startIndex, openStr, closeStr) {
    let nextCloseStrIndex = this.lowerCase.indexOf(closeStr, startIndex);
    if (nextCloseStrIndex === -1) return -1;
    while (this.lowerCase.substring(0, nextCloseStrIndex).indexOf(openStr, startIndex) >= 0) {
      nextCloseStrIndex = this.lowerCase.indexOf(closeStr, nextCloseStrIndex + closeStr.length);
      if (nextCloseStrIndex === -1) return -1;
      startIndex = this.lowerCase.substring(0, nextCloseStrIndex).indexOf(openStr, startIndex);
    }
    return nextCloseStrIndex;
  }

  /*
  * Breaks text down into an array of multiple types of tags
  */
  findMultipleTags() {
    let lastPushIndex = 0;
    let tagObj = this.checkTrieForNextOpenTag(lastPushIndex);
    while (tagObj) {
      if (lastPushIndex <= tagObj.start) {
        let untaggedBlock = this.getUntaggedBlockExcerpt(lastPushIndex, tagObj.start);
        if (untaggedBlock) this.array.push(untaggedBlock);
      }
      this.array.push(new Block(tagObj.tag, tagObj.properties,
        tagObj.content, this.dict, this.recursive, this.card));
      lastPushIndex = tagObj.end;
      tagObj = this.checkTrieForNextOpenTag(lastPushIndex);
    }
    let untaggedBlock = this.getUntaggedBlockExcerpt(lastPushIndex, this.rawText.length);
    if (untaggedBlock) this.array.push(untaggedBlock);
  }

  /*
  * Breaks text down into an array of a single type of tag
  */
  findSingleTag(originalTag) {
    let tag = originalTag.substring(1);
    let lastPushIndex = 0;
    let nextTagIndex = this.lowerCase.indexOf(`[${tag}`, lastPushIndex);
    while (lastPushIndex <= nextTagIndex) {
      let tagObj = this.validateFullTag(nextTagIndex, originalTag);
      if (!tagObj) {
        nextTagIndex = this.lowerCase
          .indexOf(`[${tag}`, nextTagIndex + tag.length + 1);
        continue;
      }
      if (lastPushIndex < tagObj.start) {
        let untaggedBlock = this.getUntaggedBlockExcerpt(lastPushIndex, tagObj.start);
        if (untaggedBlock) this.array.push(untaggedBlock);
      }
      this.array.push(new Block(originalTag, tagObj.properties,
        tagObj.content, this.dict, this.recursive, this.card));
      lastPushIndex = tagObj.end;
      nextTagIndex = this.lowerCase.indexOf(`[${tag}`, lastPushIndex);
    }
    let untaggedBlock = this.getUntaggedBlockExcerpt(lastPushIndex, this.rawText.length);
    if (untaggedBlock) this.array.push(untaggedBlock);
  }
}

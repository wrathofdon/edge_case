class BlockArray {
  constructor(dict, rawText, recursive = false, card = null) {
    this.dict = dict;
    this.rawText = rawText;
    this.array = null;
    this.card = card;
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

  // parses the input and turns it into individual blocks
  splitBlocks(recursive = false) {
    // index of last successful push
    let index = 0;
    this.array = [];
    let text;
    let tagObj = this.findNextValidTag(0);
    while (tagObj) {
      if (index < tagObj.start) {
        // creates a block for any unformatted text before the formatted block
        text = this.rawText.substring(index, tagObj.start);
        if (text.trim()) {
          this.array.push(new Block(null, null, text, this.dict, recursive, this.card));
        }
      }
      index = tagObj.end;
      this.array.push(new Block(tagObj.tag, tagObj.properties, tagObj.content, this.dict, recursive, this.card));
      tagObj = this.findNextValidTag(index);
    }
    // creates an unformatted block for any leftover text at the end
    if (index < this.rawText.length) {
      text = this.rawText.substring(index, this.rawText.length);
      if (text.trim())
        this.array.push(new Block(null, null, text, this.dict, recursive, this.card));
    }
  }

  /*
  * Attempts to find the next valid block
  */
  findNextValidTag(index) {
    let tags = Object.keys(this.dict);
    // search efficiency is a little different if there's only 1 tag
    // TODO: Add a trie data structure
    if (tags.length === 1) return this.checkSingleTag(index, tags[0]);
    else return this.checkMultipleTags(index);
  }

  /*
  * If there's only one tag to be searched, it makes searching simpler
  */
  checkSingleTag(index, originalTag) {
    let tagObj;
    let tag = originalTag.substring(1);
    // search for presence of opening tag
    while (-1 < index && index < this.rawText.length) {
      index = this.rawText.indexOf(`[${tag}`, index);
      if (index === -1) return false;
      // if partial opening is found, attempts to validate proper formatting
      tagObj = this.validateTag(index, originalTag);
      // if block was formatted improperly, move forward
      if (tagObj) return tagObj;
      index += tag.length + 1;
    }
    return false;
  }

  checkMultipleTags(start) {
    let index = start;
    let limit = this.rawText.length;
    while (-1 < index && index < limit) {
      index = this.rawText.indexOf(`[`, index);
      if (index < 0) return false;
      start = index;
      index += 1;
      let trie = globalTagTrie[this.dict];
      while (index < limit && trie[this.rawText[index]]) {
        trie = trie[this.rawText[index]];
        index += 1;
      }
      if (!' ]:'.includes(this.rawText[index - 1])) continue;
      let tagObj = this.validateTag(start, trie);
      if (tagObj) return tagObj;
    }
    return false;
  }

  validateTag(start, originalTag) {
    let postTagSymbol = this.rawText[start + originalTag.length];
    if (!' ]:'.includes(postTagSymbol)) return false;
    let tag = originalTag.substring(1);
    let hasContent = (originalTag[0] === '2') ? true : false;
    let content = null;
    let properties = null;
    let contentStart;
    // tags that start with '2' will have contents
    // the '2' signifies having both an opening and a closing tag
    // checks to see if this is a simple tag with no properties
    if (postTagSymbol === ']') {
      contentStart = start + tag.length + 2;
    } else {
      // search for the ending of the closing tag
      contentStart = this.findClose(start + tag.length + 2, '[', ']');
      if (contentStart === -1) return false;
      // the end of the opening tag is where content will end
      contentStart = contentStart.end
      // if so, a ':' after the tag name indicates that tag itself  is a property
      if (postTagSymbol === ':') {
        properties = this.rawText.substring(start + 1, contentStart - 1);
      }
      // a ' ' after the tag name indicates that the tag itself is not a property
      if (postTagSymbol === ' ') {
        properties = this.rawText.substring(start + tag.length + 2, contentStart - 1);
      }
      // in the event that the properties were formatted improperty
      if (!properties) return false;
      properties = this.parseProperties(properties);
    }
    // the end of the block is either at the end of the opening or closing tag
    let end = contentStart;
    if (hasContent) {
      end = this.findClose(contentStart, `[${tag}`, `[/${tag}]`);
      if (end === -1) return false;
      end = end.end;
      content = this.rawText.substring(contentStart, end - (tag.length + 3));
    }
    return {tag: originalTag, properties: properties, content: content, start: start, end: end};
  }

  /*
  * Takes a tag string and converts it into an object with properties
  */
  parseProperties(str) {
    let properties = {}
    let lower = {}
    try {
      eval(`properties = {${str}}`);
    } catch(err) {
      console.log(`Trouble parsing properties: "${str}"`);
      if (err instanceof ReferenceError) {
        console.log('Did you remember to put quotation marks around ' +
        'your string and commas between properties?');
      } else if (err instanceof SyntaxError) {
        console.log('Did you remember to add quotation marks?');
      }
    }
    // all property keys must be converted to lowercase so parser can recognize them
    for (let property in properties) lower[property.toLowerCase()] = properties[property];
    return lower;
  }

  /*
  * Finds the next valid closing tag.  'Valid' means that any new inner open
  * tags are canceled out by new inner closing tags
  */
  findClose(startIndex, openTag, closeTag) {
    let nextCloseTag = this.rawText.indexOf(closeTag, startIndex);
    if (nextCloseTag === -1) return -1;
    while (this.rawText.substring(0, nextCloseTag).indexOf(openTag, startIndex) >= 0) {
      nextCloseTag = this.rawText.indexOf(closeTag, nextCloseTag + closeTag.length);
      if (nextCloseTag === -1) return -1;
      startIndex = this.rawText.substring(0, nextCloseTag).indexOf(openTag, startIndex);
    }
    return {start: nextCloseTag, end: nextCloseTag + closeTag.length};
  }
}

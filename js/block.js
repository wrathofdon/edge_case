class Block
{
  constructor(tag, properties, rawText, dict, recursive = false, card = null) {
    this.tag = tag;
    this.properties = properties || {};
    this.rawText = rawText;
    this.dict = dict;
    if (this.tag === '2js') this.rawText = this.rawText.replaceAll('\n', ' ');
    this.innerBlocks = (recursive) ?
      splitTextIntoBlocks(rawText, dict, recursive, card) : null;
    this.card = card;
    this.button = null;
    this.htmlId = null;
    this.classes = [];
    this.lockedContent = null;
    this.condition = null;
    this.enabled = true;
    this.initProperties();
  }

  /*
  * Generates an ID in cases where a new ID is needed
  */
  initProperties() {
    if (this.properties.update)
      this.properties.update = (this.properties.update).toLowerCase().trim();
    if (this.properties.condition)
      this.condition = this.properties.condition;
    if (this.properties.id)
      this.htmlId = this.properties.id;
    else if (this.properties.update === 'always' || (['2button', '2toggle', '2reveal'].includes(this.tag))) {
      this.htmlId = `uid${getUniqueId()}`;
    }
    if (this.properties.class)
      this.classes = this.properties.class
        .replace(/^\s+/,'').replace(/\s+$/,'').split(/\s+/);
    if (this.properties.cardlink) this.classes.push('cardlink');
    if (this.tag === '2button') {
      this.button = new Button(this, this.card);
      this.classes.push(this.properties.buttonstyle || 'buttonDefaultStyle');
    } else if (this.tag === '2toggle' || this.tag === '2reveal') {
      this.classes.push('toggleOff');
    } else if (this.properties.url) {
      this.properties.target = this.properties.target || 'blank';
    } else if (this.tag === '2img') {
      this.properties['src'] = this.rawText;
    }
  }

  getHtmlId() {
    let prefix = '' + cardHistoryStack.length;
    prefix = 'c000'.substring(0, 4 - prefix.length) + prefix;
    return `${prefix}-${this.htmlId}`;
  }

  getNode() {
    return document.getElementById(this.getHtmlId());
  }

  removeNode() {
    let node = this.getNode();
    if (node) node.parentNode.removeChild(node);
  }

  /*
  * Returns a deep copy of itself assigned to a new card
  */
  makeCopy(card) {
    return new Block(this.tag, this.properties, this.rawText, this.dict, true, card);
  }



  /*
  * Parses the internal contents of the block, but does not parse them in the
  * context of the block itself. For instance, a div block might use this to
  * return the content of the div, but it will not yet be wrapped in the div tag
  */
  getContents() {
    if (this.tag === null || this.contentArray === null) return this.rawContent;
    this.checkCondition();
    if (!this.enabled) {
      return '';
    }
    if (this.lockedContent) {
      if (this.tag === '2jsreturn') {
        return eval(this.lockedContent)
      }
      return this.lockedContent;
    }
    let contents = joinBlockArray(this.innerBlocks);
    if (this.properties.update === 'never') this.lockedContent = contents;
    if (this.tag === '2jsreturn') {
      this.lockedContent = `(function () {${contents}})();`;
      return eval(this.lockedContent);
    }
    return contents;
  }



  /*
  * Updates the contents
  */
  updateContents() {
    if (!this.htmlId) return;
    this.checkCondition();
    if (this.enabled) {
      let node = document.getElementById(this.getHtmlId());
      if (node) {
        node.innerHTML = this.getContents();
      }
    }
  }

  /*
  * Checks if condition is required, and if condition is being met
  */
  checkCondition() {
    if (this.button) {
      if (!this.button.disabled) {
        return;
      }
    }
    if (!this.condition || !this.card) return;
    if (typeof(this.lockedContent) === 'string') return;
    this.enabled = eval(this.condition);
    if (this.enabled) {
      this.removeClassProperty('hidden');
    } else {
      this.addClassProperty('hidden');
    }
    return;
  }

  /*
  * Parses the block with the properties of the block tag.  i.e., a div block
  * will now be wrapped in the div blocks
  */
  parseContents() {
    return this.dict[this.tag](this);
  }

  /*
  * Outputs the properties object and member variables to html attributes
  */
  getPropertiesOutput() {
    let output = [];
    if (this.htmlId) {
      output.push(`id="${this.getHtmlId()}"`);
    }
    if (this.classes.length) {
      output.push(`class="${this.classes.join(' ')}"`);
    }
    for (let property in this.properties) {
      output.push(`${property}="${this.properties[property]}"`);
    }
    return output.join(' ');
  }

  /*
  * Adds class to block object.  Useful if we want to change the style
  */
  addClassProperty(str) {
    if (!this.classes.includes(str)) {
      this.classes.push(str);
      $(`#${this.getHtmlId()}`).addClass(str);
    }
  }
  /*
  * Removes class from block object.  Useful if we want to change the style
  */
  removeClassProperty(str) {
    if (this.classes.includes(str)) {
      delete this.classes[this.classes.indexOf(str)];
      $(`#${this.getHtmlId()}`).removeClass(str);
    }
  }
}

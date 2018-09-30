class Block
{
  constructor(tag, properties, content, dict, recursive = false, card = null) {
    this.tag = tag;
    this.content = content;
    if (card && content) {
      this.content = content.replaceAll('\n\n', '<p>')
    }
    this.card = card;
    this.dict = dict;
    // these things are all related to the HTML conversion
    // the properties objects contains properties specified in the original block tag
    // when converted to html, these properties can be converted as well
    this.properties = properties || {};
    this.classes = [];
    this.htmlId = this.processId();
    if (this.htmlId && this.card) {
      globalExcerpts[this.getHtmlId()] = this;
    }
    this.elementNode = null;
    // if this block is a button, then this variable will contain a button object
    this.button = null;
    this.blockArray = null;
    if (tag !== null && content && recursive)
      this.blockArray = new BlockArray(dict, content, recursive, card);
    // by default, all blocks will re-render their contents if card is reloaded
    // 'locked' means contents never change after the first render
    // If this is boolean true, it means that that the locked contents are pending
    // If this is a string, then the string is the locked contents
    this.lockedContent = false;
    // set true to update contents upon refresh (not just reload)
    this.alwaysUpdate = false;
    // optional boolean condition stored as a string and evaluated as js
    // if no condition exists or if condition is met, render as normal
    // otherwise, 'hidden' class is added and inner contents do not load.
    this.condition = null;
    // checks if condition is enabled.
    this.enabled = true;
  }

  /*
  * Parses the internal contents of the block, but does not parse them in the
  * context of the block itself. For instance, a div block might use this to
  * return the content of the div, but it will not yet be wrapped in the div tag
  */
  getContents() {
    if (this.tag === null) return this.content;
    this.checkCondition();
    if (!this.enabled) {
      return '';
    }
    if (typeof(this.lockedContent) === 'string') return this.lockedContent;
    let contents = this.blockArray.joinBlocks().replace('\n\n', '<p>');
    if (this.lockedContent === true)
      this.lockedContent = contents;
    return contents;
  }

  getHtmlId() {
    return `${this.card.title}-${this.htmlId}`;
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
      if (!this.button.buttonDisabled()) {
        this.removeClassProperty('hidden');
        this.enabled = true;
        return;
      }
      this.addClassProperty('hidden');
      this.enabled = false;
      return;
    } else if (this.classes.includes('toggleOff')) {
      this.enabled = false;
      this.addClassProperty('hidden');
      return;
    } else if (this.classes.includes('toggleOn')) {
      this.enabled = true;
      this.removeClassProperty('hidden');
      return;
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
    if (!this.tag) return this.content;
    return this.dict[this.tag](this);
  }

  /*
  * Generates an ID in cases where a new ID is needed
  */
  processId() {
    if (!this.tag) return null;
    // if the block is a copy of another block (i.e., via citation) and the
    // original block had a generated id, then generate a new id to replace it
    if (this.properties.id) {
      return this.properties.id;
    }
    // these require a tag because their content might change later on
    let updateProp = (this.properties.update) ?
      (this.properties.update).toLowerCase() : '';
    if (!this.htmlId && (['2button', '2toggle', '2reveal'].includes(this.tag)
        || updateProp === 'always')) {
      return `uid${getUniqueId()}`;
    }
    return null;
  }

  /*
  * Returns a deep copy of itself assigned to a new card
  */
  makeCopy(card) {
    return new Block(this.tag, this.properties, this.content, this.dict, true, card);
  }

  /*
  * Moves things out of the properties list and into object members
  * This set happens after all excerpts have been copied over
  */
  updatePropertiesList() {
    if (this.properties.id) {
      delete this.properties.id;
    }
    // moves classes to a block member variable
    if (this.properties.class) {
      this.classes = this.properties.class.replace(/^\s+/,'').replace(/\s+$/,'').split(/\s+/);
      delete this.properties.class;
    }
    if (this.properties.update) {
      this.properties.update = this.properties.update.toLowerCase();
      if (this.properties.update.toLowerCase() === 'always') {
        this.alwaysUpdate = true;
      } else if (this.properties.update.toLowerCase() === 'never') {
        // Setting this to true means it should be ready to take in a String
        // Once it does, the string becomes the default content in the future
        this.lockedContent = true;
      }
      delete this.properties.update;
    }
    if (this.properties.condition) {
      this.condition = this.properties.condition;
      delete this.properties.condition;
    }
    // this is so jquery can search for spans and divs with the cardlink property
    if (this.properties.cardlink) {
      if (this.tag !=='2button') {
        this.classes.push('cardlink');
      }
    }
    if (this.tag === '2button') {
      this.button = new Button(this, this.card);
      globalButtons[this.getHtmlId()] = this;
      if (this.properties.buttonstyle) {
        this.classes.push(this.properties.buttonstyle);
        delete this.properties.buttonstyle;
      } else {
        this.classes.push('buttonDefaultStyle');
      }
    } else if (this.tag === '2buttontoggle' || this.tag === '2buttonreveal') {
      this.classes.push('toggledOff');
    } else if (this.properties.url && !this.properties.target) {
      this.properties['target'] = 'blank';
    } else if (this.tag === '2img') {
      this.properties['src'] = this.content;
    }
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

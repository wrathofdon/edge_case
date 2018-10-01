class Card {
  constructor(title, rawText) {
    this.title = title;
    this.blockArray = new BlockArray(bbCodeHTMLConversions, rawText.trim(), true, this);
    this.cardVar = {timesLoaded: 0};
    this.idBlocks = [];
  }

  /*
  * Checks card for use of the copy tag.  If found, tag is replaced with what it's citing
  * Afterwards, properties are updated, and blocks with ID tag are placed in special section
  */
  replaceCopies(blockArray=this.blockArray) {
    for (let i = 0; i < blockArray.array.length; i++) {
      if (blockArray.array[i].tag === '1copy') {
        let citedBlock = globalExcerpts[blockArray.array[i].properties.copy];
        if (citedBlock) {
          blockArray.array[i] = citedBlock.makeCopy(this.card);
        }
      }
      let block = blockArray.array[i];
      block.updatePropertiesList();
      if (block.htmlId) {
        this.idBlocks.push(block);
      }
      if (block.blockArray) {
        this.replaceCopies(block.blockArray);
      }
    }
  }

  /*
  * Loads card to html
  */
  loadCard(backtrack = false) {
    if (!backtrack) {
      cardHistoryStack.push(this);
    }
    // clears temporary variables and updates pointer to card variables
    tempVar = {};
    cardVar = this.cardVar;
    cardVar.isBacktrack = backtrack;
    cardVar.timesLoaded += 1;
    mainHTMLnode.innerHTML = this.blockArray.joinBlocks();
    activateEventListeners();
    $('html,body').scrollTop(0);
  }

  /*
  * Checks blocks with ids and updates them if necessary
  */
  updateBlocks() {
    for (let i in this.idBlocks) {
      let block = this.idBlocks[i];
      if (block.alwaysUpdate) {
        block.updateContents;
      }
    }
  }
}

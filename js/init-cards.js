/*
* INITIALIZES CARDS
*/

// takes an input string of the raw script and converts them to cards
function parseCardsPreprocess(text) {
  // converts text to card blocks, adds individual cards to global dictionary
  parseCardsLoadGlobalDict(text);
  // extracts any inner blocks with a user specified ID, in the event that this
  // id might be cited by another card for copying
  for (let title in globalCardDict) {
    globalCardDict[title].excerpts = {};
    parseCardsExtractExcerpts(globalCardDict[title], globalCardDict[title].innerBlocks);
  }
  // After all the IDs have been extracted, we iterate through the cards again
  // and make any necessary replacements
  for (let title in globalCardDict) {
    parseCardsReplaceCopies(globalCardDict[title], globalCardDict[title].innerBlocks);
  }
  // We then finalize block and card properties
  for (let title in globalCardDict) {
    globalCardDict[title].excerpts = {};
    parseCardsFinalize(globalCardDict[title], globalCardDict[title].innerBlocks);
  }
}

// Adds cards to dictionary so they can be accessed by title
function parseCardsLoadGlobalDict(text) {
  let array = splitTextIntoBlocks (text, {'2card':null});
  for (let i = 0; i < array.length; i++) {
    let cardBlock = array[i];
    if (typeof(cardBlock) === 'string') continue;
    let title = cardBlock.properties.card;
    let content = cardBlock.rawText.trim();
    if (!title) {
      console.log(`Error: Card missing title\n${content}`)
      continue;
    } else if (globalCardDict[title]) {
      console.log(`Error: Duplicate card title: ${title}`)
      continue;
    }
    globalCardDict[title] = new Card(title, content);
  }
}

// Recursively explores the card for any blocks with user specified IDs
function parseCardsExtractExcerpts(card, array) {
  for (let i in array) {
    if (typeof(array[i]) === 'string') continue;
    let block = array[i];
    if (block.htmlId) card.excerpts[block.htmlId] = block;
    if (block.innerBlocks) parseCardsExtractExcerpts(card, block.innerBlocks);
  }
}

// Recursively explores the card and makes any replacements called by the copy tag
function parseCardsReplaceCopies(card, array) {
  for (let i in array) {
    if (typeof(array[i]) === 'string') continue;
    if (array[i].tag === '2copy') {
      let source = globalCardDict[array[i].properties.card];
      if (!source) {
        let error = `Copy Error: card ${array[i].properties.card} not found`;
        console.log(error);
        array[i] = error;
        continue;
      } else if (!source.excerpts[array[i].properties.id]) {
        let error = (`Copy Error: ID ${array[i].properties.card} in card ${array[i].properties.card} not found`);
        console.log(error);
        array[i] = error;
        continue;
      } else array[i] = source.excerpts[array[i].properties.id].makeCopy(card);
    }
    if (array[i].innerBlocks) parseCardsReplaceCopies(card, array[i].innerBlocks);
  }
}

// Categorizes specialized blocks, such as blocks containing JS scripts
// Removes properties that have already been processed
function parseCardsFinalize(card, array) {
  for (let i in array) {
    if (typeof(array[i]) === 'string') continue;
    let block = array[i];
    if (block.htmlId) {
      if (card.excerpts[block.htmlId]) block.htmlId = `uid${getUniqueId()}`;
      card.excerpts[block.htmlId] = block;
    }
    if (block.properties.update === 'always') card.alwaysUpdateBlocks.push(block);
    if (block.tag === '2button') card.buttonBlocks.push(block);
    else if (block.tag === '2js' && block.properties.trigger) {
      block.properties.trigger = block.properties.trigger.toLowerCase().trim();
      if (block.properties.trigger === 'initial') card.initJS.push(block);
      else if (block.properties.trigger === 'start') card.startJS.push(block);
      else if (block.properties.trigger === 'end') card.endJS.push(block);
      else if (block.properties.trigger === 'exit') card.exitJS.push(block);
      blockArray.blocks[i] = nullBlock;
      continue;
    }
    delete block.properties.id;
    delete block.properties.class;
    delete block.properties.condition;
    delete block.properties.buttonstyle;
    delete block.properties.trigger;
    if (block.innerBlocks) parseCardsFinalize(card, block.innerBlocks);
  }
}

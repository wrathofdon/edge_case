/*
* INITIALIZES CARDS
*/

// takes an input string of the raw script and converts them to cards
function parseCardsPreprocess(text) {
  // extract card objects from text and adds them to global dictionary
  parseCardsLoadGlobalDict(text);
  // finds inner blocks with IDs so they can be excerpted and copied
  for (let title in globalCardDict) {
    globalCardDict[title].excerpts = {};
    parseCardsExtractExcerpts(globalCardDict[title], globalCardDict[title].innerBlocks);
  }
  // replaces copy blocks with excerpts
  for (let title in globalCardDict) {
    parseCardsReplaceCopies(globalCardDict[title], globalCardDict[title].innerBlocks);
  }
  // finalizes inner blocks
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
    let block = array[i];
    if (typeof(block) === 'string') continue;
    if (block.tag === '1copy') {
      let source = globalCardDict[block.properties.card];
      if (!source) {
        let error = `Copy Error: card ${block.properties.card} not found`;
        console.log(error);
        block = error;
        continue;
      } else if (!source.excerpts[block.htmlId]) {
        let error = (`Copy Error: ID ${block.htmlId} in card ${block.properties.card} not found`);
        console.log(error);
        block = error;
        continue;
      } else {
        array[i] = source.excerpts[block.htmlId].makeCopy(card);
        block = array[i];
      }
    }
    if (block.tag === '2eccode') {
      block.rawText = parseECCode(block.rawText, '[', ']', '&lsqb;', ':');
      block.rawText = parseECCode(block.rawText, '<', '>', '&lt;', '=');
      block.innerBlocks = null;
    }
    if (block.innerBlocks) parseCardsReplaceCopies(card, block.innerBlocks);
  }
}

// finalizes card objects
function parseCardsFinalize(card, array) {
  for (let i in array) {
    if (typeof(array[i]) === 'string') continue;
    let block = array[i];
    // checks for duplicate ids, replaces them if necessary
    if (block.htmlId) {
      if (card.excerpts[block.htmlId]) block.htmlId = `uid${getUniqueId()}`;
      card.excerpts[block.htmlId] = block;
    }
    if (block.tag === '2url') {
      block.properties.href = block.properties.url;
      delete block.properties.url;
    }
    // checks if blocks fit certain categories
    if (block.properties.update === 'always') card.alwaysUpdateBlocks.push(block);
    if (block.tag === '2button') card.buttonBlocks[block.htmlId] = block;
    else if (block.tag === '2js' && block.properties.trigger) {
      block.properties.trigger = block.properties.trigger.toLowerCase().trim();
      if (block.properties.trigger === 'init') card.initJS.push(block);
      else if (block.properties.trigger === 'start') card.startJS.push(block);
      else if (block.properties.trigger === 'end') card.endJS.push(block);
      else if (block.properties.trigger === 'exit') card.exitJS.push(block);
      array[i] = '';
      continue;
    }
    // prunes properties that have already been processed
    delete block.properties.id;
    delete block.properties.class;
    delete block.properties.condition;
    delete block.properties.trigger;
    delete block.properties.persist;
    if (block.innerBlocks) parseCardsFinalize(card, block.innerBlocks);
  }
}


function parseECCode(text, openSym, closeSym, replaceSym, assignSym) {
  let array = text.split(replaceSym);
  for (let i = 1; i < array.length; i++) {
    let tag = '';
    let properties = '';
    let closeBracket = findClose(array[i], 0, openSym, closeSym);
    if (closeBracket < 0) continue;
    let after = array[i].substring(closeBracket + 1);
    if (array[i][0] === '/') tag = array[i].substring(0, closeBracket);
    else {
      let colon = array[i].substring(0, closeBracket).indexOf(assignSym);
      let space = array[i].substring(0, closeBracket).indexOf(' ');
      if (colon === -1) tag = array[i].substring(0, closeBracket);
      else if (space < 0 || colon < space) properties = array[i].substring(0, closeBracket);
      else {
        tag = array[i].substring(0, space + 1);
        properties = array[i].substring(space + 1, closeBracket);
      }
    }
    if (properties)
      properties = `<span class='eccodeproperty'>${properties}</span>`;
    array[i] = `<strong><span class='eccodetag'>${replaceSym}${tag}${properties}${closeSym}</span></strong>${after}`;
  }
  return array.join('').replaceAll('[*]', `<div class='eccode'>`).replaceAll('[/*]', '</div>');
}

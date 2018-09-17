/*
* Parses anything basic that can be handled early
*/
function preprocessRaw(text) {
  text = preProcessTagsToLowerCase(text, globalTagList);
  text = preprocessRemoveComments(text);
  text = preprocessConvertAngledBrackets(text);
  text = preprocessBasicHTML(text);
  return text;
}

/*
* Converts known tags to lowercase for easier parsing.
*/
function preProcessTagsToLowerCase(text, list) {
  // What if a user wants "[b][/b]" to show up on the screen, without being
  // parsed into the HTML?  Adding the tilda ('~') acts as an escape character,
  // only it only works for the open square bracket.
  text = text.replaceAll('~[', '&lsqb;');
  for (let i in list) {
    let tag = list[i];
    // converts all known tags to lower case
    // this can be bypassed by using the '~' symbol mentioned above
    let lower = tag.toLowerCase();
    text = text.replace(new RegExp(`\\[${tag}\\]`, 'ig'), `[${lower}]`);
    text = text.replace(new RegExp(`\\[${tag}\\:`, 'ig'), `[${lower}:`);
    text = text.replace(new RegExp(`\\[${tag}\\ `, 'ig'), `[${lower} `);
    text = text.replace(new RegExp(`\\[\/${tag}\\]`, 'ig'), `[/${lower}]`);
  }
  return text;
}

/*
* Removes comments, which are marked with the [$]comment[/$] tag
*/
function preprocessRemoveComments(text) {
  let blockArray = new BlockArray({'2$': (a) => { return '' }}, text);
  for (let i = 0; i < blockArray.length; i++) {
    blockArray[i] = (blockArray[i].tag === '2$') ? '' : blockArray[i].content;
  }
  return blockArray.joinBlocks();
}

/*
* Converts angled brackets into a form that won't be interpreted as an html bracket
* To bypass, use the [html][/html] tag
*/
function preprocessConvertAngledBrackets(text) {
  let blockArray = new BlockArray({'2html': null}, text);
  for (let i = 0; i < blockArray.length; i++) {
    if (blockArray[i].tag === '2html') {
      blockArray[i] = blockArray[i].content;
    } else {
      blockArray[i] = blockArray[i].content.replace('<', '&lt;').replace('>', '&gt;');
    }
  }
  return blockArray.joinBlocks();
}
/*
* Converts common and simple bbCode into html at the start
*/
function preprocessBasicHTML(text) {
  let htmlConversions = {
    'b': 'strong',
    'i': 'em',
    'u': 'u',
    'br': 'br',
    'p': 'p',
    'code': 'pre',
    'hr': 'hr',
    'bq': 'blockquote'
  }
  for (let htmlTag in htmlConversions) {
    // console.log(htmlTag)
    text = text.replaceAll(`[${htmlTag}]`, `<${htmlConversions[htmlTag]}>`);
    text = text.replaceAll(`[/${htmlTag}]`, `</${htmlConversions[htmlTag]}>`);
    // if (oldText !== text) console.log(text)
    // oldText = text;
  }
  return text;
}

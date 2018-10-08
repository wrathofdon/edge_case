/*
* Parses anything basic that can be handled early
*/
function preprocessRaw(text) {
  // What if a user wants "[b][/b]" to show up on the screen, without being
  // parsed into the HTML?  Adding the tilda ('~') acts as an escape character,
  // only it only works for the open square bracket.
  text = text.replaceAll('~[', '&lsqb;');
  text = preprocessRemoveComments(text);
  text = preprocessConvertAngledBrackets(text);
  text = preprocessBasicHTML(text);
  return text;
}
/*
* Removes comments, which are marked with the [$]comment[/$] tag
*/
function preprocessRemoveComments(text) {
  let array = splitTextIntoBlocks (text, {'2$': null});
  for (let i = 0; i < array.length; i++) {
    if (typeof(array[i]) !== 'string') array[i] = '';
  }
  return array.join('');
}

/*
* Converts angled brackets into a form that won't be interpreted as an html bracket
* To bypass, use the [html][/html] tag
*/
function preprocessConvertAngledBrackets(text) {
  let array = splitTextIntoBlocks (text, {'2html': null});
  for (let i = 0; i < array.length; i++) {
    if (typeof(array[i]) === 'string') {
      array[i] = array[i].replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    } else {
      array[i] = array[i].rawContent;
    }
  }
  return array.join('');
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
  for (let tag in htmlConversions) {
    text = text.replace(new RegExp(`\\[${tag}\\]`, 'ig'), `<${htmlConversions[tag]}>`);
    text = text.replace(new RegExp(`\\[/${tag}\\]`, 'ig'), `</${htmlConversions[tag]}>`);
  }
  return text;
}

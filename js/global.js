/*
* Removes quotation marks.  You can also request an alternative symbol
*/
function removeQuotes(text, symbol='\'"') {
  if (!text || !text.trim()) {
    return false;
  }
  text = text.trim();
  if (text[0] === text[-1] && (symbol.includes(text[0]))) {
    text = text.substring(1, text.length - 1);
  }
  return text;
}

/*
* A method of generating unique numbers for unique html IDs
*/
var sUniqueIdCounter = 0;
function getUniqueId() {
  sUniqueIdCounter += 1;
  return sUniqueIdCounter;
}

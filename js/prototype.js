/*
* you can now use [-1] as an array index to quickly retrieve the last element
*/
Object.defineProperty(Array.prototype, '-1', {
  get() { return this[this.length - 1] ;}
});

/*
* you can now use [-1] as an string index to quickly retrieve the last element
*/
Object.defineProperty(String.prototype, '-1', {
  get() { return this[this.length - 1] ;}
});

/*
* Replaces all occurances of a substring within a string
*/
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};


// activates non-button interactive elements of the slide
function activateEventListeners() {
  $('.cardlink').off('click');
  $('.cardlink').click(function(){
    let id = this.getAttribute('cardlink');
    let card = globalCardDict[id];
    if (card) {
      card.loadCard();
    } else {
      console.log(`${id} not found`);
    }
  });
  $('.button').off('click');
  $('.button').click(function(){
    let id = this.getAttribute('id');
    let button = currentButtons[id];
    if (!button) {
      console.log(`error loading button: ${id}`);
      return;
    }
    button.clickButton();
  });

}

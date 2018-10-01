rawScript += `
[card:'Buttons-Intro']
  [b][u]Buttons[/u][/b]

  Buttons, like cards, are a special type of block.  They have attached event listeners that allow for direct interaction upon being clicked.

  To customize the button, you can insert the following blocks in the main content:

  [ol]
    [*][b]The 'label' tag:[/b]  Any text or image to appear in the button itself
    [*][b]The 'toggle' or 'reveal' tag:[/b]  If you want content to be revealed upon clicking, but without having to leave the page.
    [*][b]The 'js' tag:[/b]  Any custom JS code that you would like to run when the button is clicked
  [/ol]

  All buttons need a label, but the other tags are option.  Here is an example of what a button with all three elements looks like:

  [bq]
  Script:[br]
  [b]~[button][br][/b]
  [b]~[label][/b]Click this to toggle text[b]~[/label][br][/b]
  [b]~[js][/b]console.log('Do you know how to check the console log?')[b]~[/js][br][/b]
  [b]~[toggle][/b]And now we're toggling text.[b]~[/toggle][br][/b]
  [b]~[/button][/b]

  Output:
  [button]
  [label]Click this to toggle text[/label]
  [js]console.log('Do you know how to check the console log?')[/js]
  [toggle]And now we're toggling text.[/toggle]
  [/button]
  [/bq]

  [b]Labels:[/b]

  The label tag is actually optional.  If there is no action block or toggle/reveal block inside the label, then Edge Case assumes that the label is the [i]entire contents[/i].

  [b]Toggle Labels:[/b]

  If you want the label display to change when being toggled, then you can use the "togglelabel" tag.

  [bq]
  Script:[br]
  [b]~[button][br][/b]
  [b]~[label][/b]Watch this label change when you click[b]~[/label][br][/b]
  [b]~[togglelabel][/b]You changed the label text[b]~[/togglelabel][br][/b]
  [b]~[toggle][/b]That's a new label[b]~[/toggle][br][/b]
  [b]~[/button][/b]

  Output:
  [button]
  [label]Watch this label change when you click[/label]
  [togglelabel]You changed the label text[/togglelabel]
  [toggle]That's a new label[/toggle]
  [/button]
  [/bq]

  [b]The Order:[/b]

  The order of these three blocks doesn't matter.  If, for some reason, you've included two or more blocks with the same tag, then Edge Case will go with the more recent one.

  [b]Reveal Tag:[/b]

  'Reveal' is a tag that works similar to toggle, except that it dissappears upon being clicked.  This would be useful in modeling games and interactive stories.  You cannot have both a toggle and a reveal together, so if you try to offer both, Edge Case goes with the last one you submited.

  [bq]
  Script:[br]
  [b]~[button][br][/b]
  [b]~[label][/b]Make the button disappea[b]r~[/label][br][/b]
  [b]~[reveal][/b]You made the button disappear[b]~[/reveal][br][/b]
  [b]~[/button][/b]

  Output:
  [button]
  [label]Make the button disappear[/label]
  [reveal]You made the button disappear[/reveal]
  [/button]
  [/bq]

  [button cardlink:'Cards-cardlink']Click here to learn how to link a button to a card[/button]

[/card]
`

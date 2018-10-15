rawScript = rawScript + `

[card:'Blocks-Intro']

  [u][b]Block Library[/b][/u]

  Once you understand how blocks what blocks are and how they work, you can start using this tutorial to teach you what all the different types of blocks actually do so that you can use them in your project.

  [button]
    [label]Can you please remind me of what blocks are and how they work?[/label]
    [toggle][bq]
      If you need a refresher, you should check out the "getting started" guide and read it thoroughly.  If you'd like to do anything more complicated than linking cards together, make sure you also review the section on how object-oriented programming work if you haven't already done that.

      [button cardlink:'GettingStarted-Intro']Writing your first project[/button]

      [button cardlink:'GettingStarted-OOP']Brief summary of object oriented programming[/button]
    [/bq][/toggle]
  [/button]
  [button cardlink:'Blocks-HTML']HTML Formatting Blocks[/button]

  [button cardlink:'Blocks-SpecialProperties']Learn about Special Properties:  IDs, Conditions and Updates[/button]

  [button cardlink:'Blocks-CopyTag']Re-using block excerpts with the ~[copy] tag[/button]

  [button cardlink:'Blocks-JavaScript']Blocks that run JavaScript[/button]

[/card]

[card:'Blocks-HTML']
  [u][b]Simple HTML Formatting[/b][/u]

  These are blocks that offer simple formatting.  In the underlying Edge Case code, they are translated directly into the HTML equivalent during the prepocessing stage.

  [button][label]Bold tag: ~[b]~[/b][/label][toggle]
  Script:[br]
  [b]~[b][/b] The quick red fox jumped over the lazy dogs [b]~[/b][/b]

  Output:[br]
  [b] The quick red fox jumped over the lazy dogs [/b]
  [/toggle][/button]

  [button][label]Italicized tag: ~[i]~[/i][/label][toggle]
  Script:[br]
  [b]~[i][/b] The quick red fox jumped over the lazy dogs [b]~[/i][/b]

  Output:[br]
  [i] The quick red fox jumped over the lazy dogs [/i]
  [/toggle][/button]

  [button][label]Underline tag: ~[u]~[/u][/label][toggle]
  Script:[br]
  [b]~[u][/b] The quick red fox jumped over the lazy dogs [b]~[/u][/b]

  Output:[br]
  [u] The quick red fox jumped over the lazy dogs [/u]
  [/toggle][/button]

  [button][label]Blockquote Tag: ~[bq]~[/bq][/label][toggle]
  Script:[br]
  The quick [b]~[bq][/b]red fox jumped over[b]~[/bq][/b] the lazy dogs

  Output:[br]
  The quick [bq]red fox jumped over[/bq] the lazy dogs
  [/toggle][/button]

  [button][label]Line Break Tag: ~[br][/label][toggle]
  Script:[br]
  The quick [br]red fox [br]jumped over [br]the lazy dogs

  Output:[br]
  The quick
  red fox
  jumped over
  the lazy dogs

  Script:[br]
  The quick [b]~[br][/b]red fox [b]~[br][/b]jumped over [b]~[br][/b]the lazy dogs

  Output:[br]
  The quick [br]red fox [br]jumped over [br]the lazy dogs
  [/bq]

  [b]Horizontal Rule Tag: ~[hr][/b][br]
  Adds a horizontal line
  [bq]
  Script:[br]
  The quick red fox jumped over[b]~[hr][/b] the lazy dogs

  Output:[br]
  The quick red fox jumped over[hr] the lazy dogs
  [/toggle][/button]

  [u][b]Intermediate HTML Formatting[/b][/u]

  Intermediate formatting tags are tags that require a bit more logic in order to use.

  [b]Several of these tags can be customized with the HTML/CSS attribute equivalent.[/b]  If you're not familiar with what that means, then don't worry about it for now.  If you are familiar with what that means, then treat the open tag the same way you would in HTML, but use JavaScript formatting instead (colons instead of equal signs, multiple properties should be separated by commas).

  [button]
    [label]Ordered List Tag: ~[ol]~[/ol][/label]
    [toggle]
      Creates a numbered list of items.  Use the [b]~[ol]~[/ol][/b] around the entire list, and then put the [b]~[*][/b] tag before each entry.
      [bq]
      Script:[br]
      [b]~[ol][br] ~[*][/b] Item 1 [b]~[*][/b] Item 2 [b]~[*][/b] Item 3 [br][b]~[/ol][/b]

      Output:[br]
      [ol] [*] Item 1 [*] Item 2 [*] Item 3 [/ol]
      [/bq]
    [/toggle]
  [/button]

  [button]
    [label]Unordered List Tag: ~[ul]~[/ul][/label]
    [toggle]
      Similar to the ordered list, only this created an unnumbered bullet list.
      [bq]
      Script:[br]
      [b]~[ul][br] ~[*][/b] Item 1 [b]~[*][/b] Item 2 [b]~[*][/b] Item 3 [br]
      [b]~[/ul][/b]

      Output:[br]
      [ul]
      [*] Item 1 [*] Item 2 [*] Item 3
      [/ul]
      [/bq]
    [/toggle]
  [/button]

  [button]
    [label]Image Tag: ~[img]~[/img][/label]
    [toggle]
      Displays image.  The content of the tag should contain the image url.
      [bq]
      Script:[br]
      [b]~[img][/b]https://image.flaticon.com/icons/svg/25/25231.svg[b]~[/img][/b]

      Output:[br]
      [img]https://image.flaticon.com/icons/svg/25/25231.svg[/img]
      [/bq]

      The "img" tag supports HTML/CSS customization.

      [bq]
      Script:[br]
      [b]~[img alt:'Github logo', width:'50'][/b]https://image.flaticon.com/icons/svg/25/25231.svg[b]~[/img][/b]

      Output:[br]
      [img alt:'Github logo', width:'50']https://image.flaticon.com/icons/svg/25/25231.svg[/img]
      [/bq]
    [/toggle]
  [/button]

  [button]
    [label]URL Tag: ~[url]~[/url][/label]
    [toggle]
      Creates a link.
      [bq]
      Script:[br]
      [b]~[url:'http://www.github.com'][/b]Let's make a GitHub repo![b]~[/url][/b]

      Output:[br]
      [url:'http://www.github.com']Let's make a GitHub repo![/url]
      [/bq]
    [B]Block content:[/b]  Should contain the text to present to the user.

    [b]url property:[/b]  Should contain the url of the page you want to link to.

    The "url" tag supports HTML/CSS customization.

    [bq]
    Script:[br]
    [b]~[url:'http://www.github.com', style:'font-size:200%;'][/b]Let's make a GitHub repo![b]~[/url][/b]

    Output:[br]
    [url:'http://www.github.com', style:'font-size:200%;']Let's make a GitHub repo![/url]
    [/bq]
    [/toggle]
  [/button]

  [button]
    [label]Div tag and Span tag: ~[div]~[/div] and ~[span]~[/span][/label]
    [toggle]
      The div and span tags both create containers.  If you're familiar with HTML/CSS, you should already know how they work.  If not, then you probably aren't at the point where you need to learn them.  They don't do much on their own, but they can give you the ability play around with the properties to give you a greater level of control.

      Div and Span attributes that can be customized in HTML can also be set in specified in Edge Case. Use the same property name and values that you would use in regular HTML, but use the JavaScript style formatting.

      They're also useful to use as excerpts for copying to other cards.

      Examples of this will be provided later.
    [/toggle]
  [/button]
[/card]

[card:'Blocks-CopyTag']
  [u][b]Re-Using Block Excerpts[/b][/u]

  Sometimes, you'll want to re-use a block in multiple locations.  In that case, you can use the [b]~[copy][/b] tag in the location where you want the copy to appear.  The copy tag is self-closing.  Most blocks can be copied if you provide them with an "id" property.  The ones that can't be copied are the simple HTML formatting blocks (i.e., ~[b], ~[u], ~[i], etc.).

  The copy tag takes two properties:
  [ul][*][b]card:[/b]  The title of the card where the block is located.[br][br]
  [*][b]id:[/b]  The unique id of the block you want copied.[/ul]

  Here are a few scenarios where the copy tag could come in handy:

  [ul]
    [*] If you have many repetitive elements, the copy tag can help streamline your script, since you can use a single line of code to represent a much larger excerpt.[br][br]
    [*] When you edit the source block, those changes will be reflected in all of the copies.[br][br]
    [*] You can create a card called "glossay" to include a bunch of standard definitions, then have code to copy those definitions over to the relavant pages.
  [/ul]

  Here is a sample of the copy tag in action:

  [bq]
    [b]~[card:'CopyTagExample1'][/b]
      [bq]This is ~[b]card #1~[/b] from the copy tag example.

      [b]~[div id:'excerpt'][/b][br]
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non fermentum neque. Proin non ex at elit dignissim pellentesque. Quisque sed arcu turpis. Integer dictum quam ut magna vestibulum tristique. Phasellus sit amet neque in dui sagittis vehicula eu vitae lacus. In vulputate ipsum id urna rhoncus tincidunt. Maecenas ac convallis velit, vel convallis urna. Sed pellentesque quis ante nec tempus.[br]
      [b]~[/div][br][/bq]
    ~[/card]

    ~[card:'CopyTagExample2'][/b]
      [bq]This is ~[b]card #2~[/b] from the copy tag example.

      [b]~[copy card:'CopyTagExample1', id: 'excerpt'][/bq]
    ~[/card][/b]
  [/bq]

    [button cardlink:'CopyTagExample1']see card #1[/button]
      [button cardlink:'CopyTagExample2']see card #2[/button]
[/card]


[card:'CopyTagExample1']
  This is [b]card #1[/b] from the copy tag example.

  [div id:'excerpt']
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non fermentum neque. Proin non ex at elit dignissim pellentesque. Quisque sed arcu turpis. Integer dictum quam ut magna vestibulum tristique. Phasellus sit amet neque in dui sagittis vehicula eu vitae lacus. In vulputate ipsum id urna rhoncus tincidunt. Maecenas ac convallis velit, vel convallis urna. Sed pellentesque quis ante nec tempus.
  [/div]
[/card]

[card:'CopyTagExample2']
  This is [b]card #2[/b] from the copy tag example.

  [copy card:'CopyTagExample1', id: 'excerpt']
[/card]

[card:'Blocks-SpecialProperties']
  [u][b]Special Properties:  IDs, Conditions and Updates[/b][/u]

  [button][label]Learn more about the ID properties[/label]
  [toggle]
    The ID properties is supported by most blocks, and represents the ID used as an HTML for the html node associated with it.  It can also be used in conjunction with the copy tag.

    [bq]
    [b]~[tag id:'section01'][/b] content [b]~[/tag][/b]
    [/bq]

    IDs within a card must be unique.  If two blocks in the same card share the same ID, then a new ID will be generated automatically.

    [bq][button cardlink:'Blocks-CopyTag']Learn about the copy tag.[/button][/bq]
  [/toggle]
  [/button]

  [button][label]Learn more about the Condition Property[/label]
  [toggle]
    This property requires a basic understanding of programming logic.  Attaching the "condition" property to a block means that the block is only visible if a certain condition is met.  The value should be a string that will be evaluated as JavaScript, and it needs to be able to return a boolean.

    For example:

    [bq]
      [b]~[div condition:'level < 8'][/b][br]
      The princess is in another castle[br]
      [b]~[/div][/b]
    [/bq]

    In this case, if your character finishes a castle in any level below level 8, then the boolean returns "true", you're told that the princess is in another castle.  Once you reach level 8, the boolean returns "false", and the message doesn't appear.

    Let's create some code which checks for the current day of the month.  We create a div tag with a condition that will only return true if the day is even:

    [bq]
    Script:[br]
    [b]~[div condition:'new Date().getDate() % 2 == 0'][/b][br]
    The current day of the month must be even[br]
    [b]~[/div][/b]

    Output:[br]
    [div condition:'new Date().getDate() % 2 == 0']
    The current day of the month must be even[br]
    [/div]
    [/bq]

    And here is similar code, but now the condition only returns true if the current day is odd:

    [bq]
    Script:[br]
    [b]~[div condition:'new Date().getDate() % 2 == 1'][/b][br]
    The current day of the month must be even[br]
    [b]~[/div][/b]

    Output:[br]
    [div condition:'new Date().getDate() % 2 == 1']
    The current day of the month must be even[br]
    [/div]
    [/bq]

    Depending on the current day of the month, only one of those blocks will appear.  The other block will show up as blank.  If you can again tomorrow, then you should see the opposite result.
  [/toggle]
  [/button]

  [button][label]Learn more about the Update Property[/label]
  [toggle]
    Finally, we have the update property.

    If you're integrating JavaScript into your script, then you might have dynamic text that changes based on certain variables.  By default, the content of that text will update every time the card is reloaded.  However, there are two cases where you might want to override this.

    [b]Setting update to "always"[/b]

    This means that your block will reload contents every time a button from the current card is pressed.  For instance, suppose you are creating a game, and you have a block that displays the current hit points of the boss.  Every time you do something, those hit points can go up or down, which means that the display should change accordingly.

    [b]Setting update to "never"[/b]

    This means that once your block loads its contents for the first time, it's stuck with those contents by default, and doesn't automatically update even when the card is reloaded.

    For instance, suppose you're writing an interactive story where your character must have a certain amount of money to pay for health care, or else your character loses a leg.  If your character loses a leg and gains more money later on, it doesn't undo the damage.

    Note that content is only locked in place if the block is actually loaded.  If you're using a condition and the block is hidden as a result, then no content is stored.  Likewise, if you're using a button toggle and setting it to "never", the toggle contents do not lock in place until after the first time the button gets pushed.
  [/toggle]
  [/button]
[/card]

[card:'Blocks-JavaScript']
  [u][b]Integrating JavaScript into Blocks[/b][/u]

  If you're familiar with JavaScript, then you can unlock a lot more functionality.

  Edge Case has three types of JavaScript blocks:  [b]~[js]~[/js][/b], [b]~[jsreturn]~[/jsreturn][/b], and [b]~[jseval][/b].  Each of these blocks perform different purposes.

  [button]
  [label]The ~[js]~[/js] tag is for running code in the background[/label]
  [toggle]
  This is for when you have JavaScript code that performs behavior, but does not display any text.  This is usually for the sake of manipulating variables in the background.

  By default, this block will activate as the text is being generated, but before anything is presented to the user.  For instance, you wouldn't be able to use this tag to write JavaScript that manipulates HTML elements directly, because those elements wouldn't have shown up yet.

  However, you can manually set a custom trigger point by adding a "trigger" property.

  [ul]
  [*] [b]~[js trigger:'start'][/b] code [b]~[/js]:[/b] Activates every time the card is loaded, before the contents are retrieved.[br][br]
  [*] [b]~[js trigger:'initial'][/b] code [b]~[/js]:[/b] Activates the first time the card is loaded, before the contents are retrieved.  Does not activate when the card is loaded afterwards.[br][br]
  [*] [b]~[js trigger:'end'][/b] code [b]~[/js]:[/b] Activates every time the card is loaded, after the contents have been retrieved and are already on the screen.[br][br]
  [*] [b]~[js trigger:'exit'][/b] code [b]~[/js]:[/b] Activates when you exit the card to load a different one.[br][br]
  [/ul]
  [/toggle]
  [/button]

  [button]
  [label]The ~[jseval] tag evaluates and displays JavaScript code[/label]
  [toggle]
  [b]~[jseval][/b] is a self-closing tag, where the name of the tag is also the name of the property.  The value of the property is the JavaScript code you would like to run.

  [bq]
  Script:[br]
  [b]~[jseval:'2+2;'][/b]

  Output:[br]
  [jseval:'2+2;']

  Script:[br]
  [b]~[js][/b]tempVar.x = 3;[b]~[/js][/b][br]
  [b]~[jseval:'tempVar.x + 100;'][/b]

  Output:[br]
  [js]tempVar.x = 3;[/js]
  [jseval:'tempVar.x + 100;']

  Script:[br]
  [b]~[jseval:'"You roll a D12 and get a " + Math.floor((Math.random() * 12) + 1);'][/b]

  Output:[br]
  [js]tempVar.x = 3;[/js]
  [jseval:'"You roll a D12 and get a " + Math.floor((Math.random() * 12) + 1);']
  [/bq]

  This is useful for quick code snippets.
  [/toggle]
  [/button]

  [button]
  [label]The ~[jsreturn] tag treats the contents as an anonymous function and displays the return[/label]
  [toggle]
  [b]~[jsreturn][/b] is similar to jseval, but it's for situations where you don't want to put all your code in a single line, and/or where you might have more than one possible return.  For instance, if you're dealing with an if/else condition, then this tag would probably work better.

  [bq]
  Script:[br]
  You rolled a [b]~[jsreturn][/b]var dice = Math.floor((Math.random() * 12) + 1);[br]
  if (dice < 4) return dice + ", which is really low.";[br]
  else if (dice > 9) return dice + ", which is really high.";[br]
  else  return dice + ", which is really fairly average.";[br]
  [b]~[/jsreturn][/b]

  Output:[br]
  You rolled a [jsreturn]var dice = Math.floor((Math.random() * 12) + 1);
  if (dice < 4) return dice + ", which is really low.";
  else if (dice > 9) return dice + ", which is really high.";
  else  return dice + ", which is really fairly average.";
  [/jsreturn]
  [/toggle]
  [/button]

[/card]
`

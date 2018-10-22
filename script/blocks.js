rawScript = rawScript + `

[card:'Blocks-Intro']

  [center][u][b]Block Library[/b][/u][/center]

  Once you understand how blocks what blocks are and how they work, you can now explore more options on how to use them to build your project.

  [button cardlink:'Blocks-SimpleFormatting']Simple Formatting Blocks[/button]
  [button cardlink:'Blocks-IntermediateFormatting']Intermediate Formatting Blocks[/button]

  [button cardlink:'Blocks-SpecialProperties']Learn about Special Properties:  IDs, Conditions and Updates[/button]

  [button cardlink:'Blocks-CopyTag']Re-using block excerpts with the ~[copy] tag[/button]

  [button cardlink:'Blocks-JavaScript']Blocks that run JavaScript[/button]
[/card]

[card:'Blocks-SimpleFormatting']
  [center][u][b]Simple Formatting Blocks[/b][/u][/center]

  This section is for blocks that generally do not require or accept additional properties, or any other special considerations.  Many of these are replaced with direct HTML substitutions during the preprocessing stage, and are not actually stored as blocks in memory.

  [button][label]Bold tag: ~[b]~[/b][/label][toggle]
  [bq]Script:
  [eccode]~[b]The quick red fox jumped over the lazy dogs~[/b][/eccode]
  Output:[br]
  [div class:'grayback'][b]The quick red fox jumped over the lazy dogs[/b][/div][/bq]
  [/toggle][/button]

  [button][label]Italicized tag: ~[i]~[/i][/label][toggle]
  [bq]Script:
  [eccode]~[i]The quick red fox jumped over the lazy dogs~[/i][/eccode]
  Output:[br]
  [div class:'grayback'][i]The quick red fox jumped over the lazy dogs[/i][/div][/bq]
  [/toggle][/button]

  [button][label]Underline tag: ~[u]~[/u][/label][toggle]
  [bq]Script:
  [eccode]~[u]The quick red fox jumped over the lazy dogs~[/u][/eccode]
  Output:[br]
  [div class:'grayback'][u]The quick red fox jumped over the lazy dogs[/u][/div][/bq]
  [/toggle][/button]

  [button][label]Blockquote Tag: ~[bq]~[/bq][/label][toggle]
  Indents subsection of text.
  [bq]Script:
  [eccode]The quick ~[bq]red fox jumped over~[/bq] the lazy dogs[/eccode]
  Output:[br]
  [div class:'grayback']The quick [bq]red fox jumped over[/bq] the lazy dogs[/div][/bq]
  [/toggle][/button]

  [button][label]Line Break Tag: ~[br][/label][toggle]
  Individual line breaks in the script are simply ignored.  In order to include them, you must manually insert them with the [b]~[br][/b] tag.
  [bq]Script:
  [eccode]The quick [br]red fox [br]jumped over [br]the lazy dogs[/eccode]
  Output:[br]
  [div class:'grayback']The quick
  red fox
  jumped over
  the lazy dogs[/div][br][br]
  Script:
  [eccode]The quick ~[br]red fox ~[br]jumped over ~[br]the lazy dogs[/eccode]
  Output:[br]
  [div class:'grayback']The quick [br]red fox [br]jumped over [br]the lazy dogs[/div][/bq]
  [/toggle][/button]

  [button][label]Horizontal Rule Tag: ~[hr][/label][toggle]
  Adds a horizontal line
  [bq]Script:
  [eccode]The quick red fox jumped over~[hr] the lazy dogs[/eccode]
  Output:[br]
  [div class:'grayback']The quick red fox jumped over[hr] the lazy dogs[/div][/bq]
  [/toggle][/button]

  [button][label]Comments Tag: ~[~]~[/~] (tilda symbol)[/label][toggle]
  This tag is for author comments that will appear in the raw script file, but which will be excluded from the raw output.
  [bq]
    Script:
    [eccode]aaaaaaaaaaa~[~] COMMENT TEXT ~[/~]aaaaaaaaaaaaaaa.[/eccode]

    Output:
    [div class:'grayback']aaaaaaaaaaa[~] COMMENT TEXT [/~]aaaaaaaaaaaaaaa.[/div]
  [/bq]
  [/toggle][/button]
[/card]

[card:'Blocks-IntermediateFormatting']
  [center][u][b]Intermediate Formatting Blocks[/b][/u][/center]

  This section is for blocks that can or should be formatted in a specific way, usually in the form of an additional property.

  [b]Several of these tags can be customized with the HTML/CSS attribute equivalent.[/b]  If you're not familiar with what that means, then don't worry about it for now.  If you are familiar with what that means, then treat the open tag the same way you would in HTML, but use JavaScript formatting instead (colons instead of equal signs, multiple properties should be separated by commas).

  [button]
    [label]Ordered List Tag: ~[ol]~[/ol][/label]
    [toggle]
      Creates a numbered list of items.  Use the [b]~[ol]~[/ol][/b] around the entire list, and then put the [b]~[*][/b] tag before each entry.
      [bq]Script:
      [eccode]
        ~[ol][*]
          ~[*]Item 1[br]
          ~[*]Item 2[br]
          ~[*]Item 3
        [/*]~[/ol]
      [/eccode]
      Output:
      [div class:'grayback'][ol]
        [*]Item 1
        [*]Item 2
        [*]Item 3
      [/ol][/div][/bq]
    [/toggle]
  [/button]

  [button]
    [label]Unordered List Tag: ~[ul]~[/ul][/label]
    [toggle]
      Similar to the ordered list, only this created an unnumbered bullet list.
      [bq]Script:
      [eccode]
        ~[ul][*]
          ~[*]Item 1[br]
          ~[*]Item 2[br]
          ~[*]Item 3
        [/*]~[/ul]
      [/eccode]
      Output:
      [div class:'grayback'][ul]
        [*]Item 1
        [*]Item 2
        [*]Item 3
      [/ul][div class:'grayback'][/div][/bq]
    [/toggle]
  [/button]

  [button]
    [label]Image Tag: ~[img]~[/img][/label]
    [toggle]
      Displays image.  The content of the tag should contain the image url.
      [bq]Script:
      [eccode]~[img]https://image.flaticon.com/icons/svg/25/25231.svg~[/img][/eccode]
      Output:[br]
      [img]https://image.flaticon.com/icons/svg/25/25231.svg[/img][/bq]

      The "img" tag supports HTML/CSS customization.
      [bq]Script:
      [eccode]~[img alt:'Github logo', width:'50']https://image.flaticon.com/icons/svg/25/25231.svg~[/img][/eccode]
      Output:[br]
      [img alt:'Github logo', width:'50']https://image.flaticon.com/icons/svg/25/25231.svg[/img][/bq]
    [/toggle]
  [/button]

  [button]
    [label]URL Tag: ~[url]~[/url][/label]
    [toggle]
      Creates a link.
      [bq]Script:
      [eccode]~[url:'http://www.github.com']Let's make a GitHub repo!~[/url][/eccode]
      Output:[br]
      [div class:'grayback'][url:'http://www.github.com']Let's make a GitHub repo![/url][/div][/bq]

      [B]Block content:[/b]  Should contain the text to present to the user.

      [b]url property:[/b]  Should contain the url of the page you want to link to.

      The "url" tag supports HTML/CSS customization.

      [bq]Script:
      [eccode]~[url:'http://www.github.com', style:'font-size:200%;']Let's make a GitHub repo!~[/url][/eccode]
      Output:[br]
      [div class:'grayback'][url:'http://www.github.com', style:'font-size:200%;']Let's make a GitHub repo![/url][/div][/bq]
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

  Sometimes, you'll want to re-use a block in multiple locations.  In that case, you can use the [b]~[copy][/b] tag in the location where you want the copy to appear.  The copy tag is self-closing.  Blocks can generally be copied if they support the "id" property, such as [span class:'eccodetag']~[div][/span] and [span class:'eccodetag']~[span][/span].

  Here are a few scenarios where the copy tag could come in handy:

  [ul]
    [*] If you have many repetitive elements, the copy tag can help streamline your script, since you can use a single line of code to represent a much larger excerpt.[br][br]
    [*] When you edit the source block, those changes will be reflected in all of the copies.[br][br]
    [*] You can create a card called "glossay" to include a bunch of standard definitions, then have code to copy those definitions over to the relavant pages.
  [/ul]

  The copy tag takes two properties:
  [ul][*][span class:'eccodeproperty']card:[/span] The title of the card where the block is located.[br][br]
  [*][span class:'eccodeproperty']id:[/span]  The unique id of the block you want copied.[/ul]

  For instance, the first [span class:'eccodeproperty']~[card][/span] you visited when you launched this project was called [span class:'eccodeproperty']"main"[/span].

  In that card, there is a [span class:'eccodetag']~[div][/span] block with property [span class:'eccodeproperty']id:'sample'[/span], which contains the raw code for the sample project.  So what happens if I want to copy that div over to this page?

  [bq]Script:
  [eccode]~[copy card:'main', id:'sample'][/eccode]
  Output:[/bq]
  [copy card:'main', id:'sample']

  Here is another sample of the copy tag in action:

  [bq][eccode]
    rawScript += \`
    [*]~[card:'CopyTagExample1']
      [*]This is ~[b]card #1~[/b] from the copy tag example.[br][br]
      ~[div id:'excerpt']
      [*]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non fermentum neque. Proin non ex at elit dignissim pellentesque. Quisque sed arcu turpis. Integer dictum quam ut magna vestibulum tristique. Phasellus sit amet neque in dui sagittis vehicula eu vitae lacus. In vulputate ipsum id urna rhoncus tincidunt. Maecenas ac convallis velit, vel convallis urna. Sed pellentesque quis ante nec tempus.[/*]
      ~[/div][/*]
    ~[/card][br][br]

    ~[card:'CopyTagExample2'][/b]
      [*]This is ~[b]card #2~[/b] from the copy tag example.[br][br]

      ~[copy card:'CopyTagExample1', id: 'excerpt'][/*]
    ~[/card][/b]\`[/*]
  [/eccode][/bq]

  The excerpted text is only included in the first card, but it appears in the final output for both of them.

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
  [center][u][b]Special Properties:  IDs, Conditions and Updates[/b][/u][/center]

  [button][label]Learn more about the ID properties[/label]
  [toggle]
    The ID properties is supported by most blocks, and represents the ID used as an HTML for the html node associated with it.  It can also be used in conjunction with the copy tag.

    [bq]
    [eccode]~[tag id:'section01'] content ~[/tag][/eccode]
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
      [eccode]~[div condition:'level < 8']
      [*]The princess is in another castle[/*]
      ~[/div][/eccode]
    [/bq]

    In this case, if your character finishes a castle in any level below level 8, then the boolean returns "true".  In that case, the condition is met, and you are told that the princess is in another castle.  Once you reach level 8, the boolean returns "false", and the message doesn't appear.

    Let's create some code which checks for the current day of the month, which for today, is [b][jseval:'new Date().getDate()'][/b].  We create a div tag with a condition that will only return true if the day is even:

    [bq]
    Script:
    [eccode]~[div condition:'new Date().getDate() % 2 == 0']
    [*]The current day of the month must be even[/*]
    ~[/div][/eccode]

    Output:
    [div class:'grayback', condition:'new Date().getDate() % 2 == 0']
      The current day of the month must be even
    [/div]
    [/bq]

    And here is similar code, but now the condition only returns true if the current day is odd:

    [bq]
    Script:
    [eccode]~[div condition:'new Date().getDate() % 2 == 1']
    [*]The current day of the month must be odd[/*]
    ~[/div][/eccode]

    Output:
    [div class:'grayback', condition:'new Date().getDate() % 2 == 1']
      The current day of the month must be odd
    [/div]
    [/bq]

    Depending on the current day of the month, only one of those blocks will appear.  The other block will show up as blank.  If you come back and look at this tomorrow, then you should see the opposite result.
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

  Edge Case has three types of JavaScript blocks:  [span class:'eccodetag']~[js] insert code[/js][/span], [span class:'eccodetag']~[jsreturn] insert code[/jsreturn][/span], and [span class:'eccodetag']~[[span class:'eccodeproperty']jseval:'insertcode'[/span]][/span].  Each of these blocks perform different purposes.

  [button]
    [label]The ~[js]~[/js] tag is for running code in the background[/label]
    [toggle]
      This is for when you have JavaScript code that performs behavior, but does not display any text.  This is usually for the sake of manipulating variables in the background.

      By default, this block will activate as the text is being generated, but before anything is presented to the user.  For instance, you wouldn't be able to use this tag to write JavaScript that manipulates HTML elements directly, because those elements wouldn't have shown up yet.

      However, you can manually set a custom trigger point by adding a "trigger" property.  For instance:

      [bq][eccode]~[js trigger:'start'] insert code[/js][/eccode][/bq]

      [ul]
        [*][span class:'eccodeproperty']js trigger:'start'[/span]:  Activates every time the card is loaded, before the contents are retrieved.[br][br]
        [*][span class:'eccodeproperty']js trigger:'init'[/span]: Activates the first time the card is loaded, before the contents are retrieved.  Does not activate when the card is loaded afterwards.[br][br]
        [*][span class:'eccodeproperty']js trigger:'end'[/span]: Activates every time the card is loaded, after the contents have been retrieved and are already on the screen.[br][br]
        [*][span class:'eccodeproperty']js trigger:'exit'[/span]: Activates when you exit the card to load a different one.
      [/ul]
    [/toggle]
  [/button]

  [button]
  [label]The ~[jseval] tag evaluates and displays JavaScript code[/label]
  [toggle]
  [span class:'eccodetag']~[[span class:'eccodeproperty']jseval[/span]][/span] is a self-closing tag, where the name of the tag is also the name of the property.  The value of the property is a string containing the JavaScript code you would like to run.

  [bq]
    Script:[br]
    [eccode]~[jseval:'2+2;'][/eccode]

    Output:[br]
    [div class:'grayback'][jseval:'2+2;'][/div]

    Script:
    [eccode]
      ~[js]tempVar.x = 3;~[/js][br]
      ~[jseval:'tempVar.x + 100;']
    [/eccode]

    Output:[br]
    [div class:'grayback']
      [js]tempVar.x = 3;[/js]
      [jseval:'tempVar.x + 100;']
    [/div]

    Script:
    [eccode]~[jseval:'"You roll a D12 and get a " + Math.floor((Math.random() * 12) + 1);'][/eccode]

    Output:[br]
    [div class:'grayback'][jseval:'"You roll a D12 and get a " + Math.floor((Math.random() * 12) + 1);'][/div]
  [/bq]

  This is useful for quick code snippets.
  [/toggle]
  [/button]

  [button]
    [label]The ~[jsreturn] tag treats the contents as an anonymous function and displays the return[/label]
    [toggle]
      This tag is similar to jseval, but it's for situations where you don't want to put all your code in a single line, and/or where you might have more than one possible return.  For instance, if you're dealing with an if/else condition.

      [bq]
        Script:
        [eccode]
          You rolled a ~[jsreturn]
            [*]let dice = Math.floor((Math.random() * 12) + 1);[br]
            let message = ', which is ';[br]
            if (dice < 4) message += 'really low';[br]
            else if (dice > 9) message += 'really high';[br]
            else message += 'fairly average';[br]
            return dice + message[/*]
          ~[/jsreturn].  Would you like to try again?
        [/eccode]

        Output:[br]
        [div class:'grayback']
          You rolled a [jsreturn]
            let dice = Math.floor((Math.random() * 12) + 1);
            let message = ', which is ';
            if (dice < 4) message += 'really low';
            else if (dice > 9) message += 'really high';
            else message += 'fairly average';
            return dice + message
          [/jsreturn].  Would you like to try again?
        [/div]
      [bq]
    [/toggle]
  [/button]

[/card]
`

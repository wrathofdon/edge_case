rawScript += `[card:'Setup-Intro']
  [b][u]Building your first project - Setup[/u][/b]

  Edge Case is a markup language which can be written in plain text and parsed entirely in your local browser.  Ideally, you would save your script as a text file, and then the JavaScript would import that code and load it into memory.  Unfortunately, browsers limit access to local files for basic security reasons.  Otherwise, malicious websites could scan your computer for private data and send it over the internet.  One way around this is to setup a server with special permissions, but that defeats the goal that Edge Case was designed for.

  But there's a workaround.  Imagine if a pizza delivery driver didn't have access to any outside pizza oven, so instead, the driver installs an oven for baking pizza directly inside the van.  Instead of trying to program JavaScript to retrieve your project from an outside source, we instead insert your project into the JavaScript code itself.

  Unfortunately, this does require some understanding of how JavaScript works.


  [button cardlink:'Setup-Styling']
    Style Guidelines for Edge Case.
  [/button]

  [button cardlink:'Setup-Formatting']
    Click here to learn about how to properly format text for JavaScript.
  [/button]

  [button cardlink:'Setup-Loading']Click here to learn how to load your files.[/button]

[/card]

[card:'Setup-Styling']
  [b][u]Style Guidelines for Edge Case[/u][/b]

  Edge Case is designed to be accessible, so readability is very important.  For instance, suppose we create the following button:

    [eccode]~[card:'main']~[button]~[label]This is a toggle~[/label]~[toggle]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin varius vulputate. Vivamus interdum tempor lectus nec interdum. Integer vehicula mollis ipsum ut dignissim. Curabitur sagittis arcu sed lectus sollicitudin, ac interdum est suscipit. Fusce pulvinar aliquet volutpat. Curabitur finibus maximus libero id sodales. Fusce elementum nulla mauris, a faucibus velit placerat et. Phasellus maximus dapibus orci in rhoncus.~[/toggle]~[/button]~[/card][/eccode]

  This code works, and a computer will have no problem understanding it, but it's not very readable for a human.  Let's try reformatting it:

  [eccode]
    ~[card:'main']
      [*]~[button]
        [*]~[label]
          [*]This is a toggle[/*]
        ~[/label][br][/*]
        [*]~[toggle]
          [*]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin varius vulputate. Vivamus interdum tempor lectus nec interdum. Integer vehicula mollis ipsum ut dignissim. Curabitur sagittis arcu sed lectus sollicitudin, ac interdum est suscipit. Fusce pulvinar aliquet volutpat. Curabitur finibus maximus libero id sodales. Fusce elementum nulla mauris, a faucibus velit placerat et. Phasellus maximus dapibus orci in rhoncus.[/*]
        ~[/toggle][/*]
      ~[/button][/*]
    ~[/card]
  [/eccode]

  Now it's much easier to following along the code.  You can quickly determine when the button starts, and when the button ends.

  In general, white space in Edge Case obeys the following rules:

  [ul]
    [*] Any number of consecutive spaces above 1 will be ignored.
    [*] Consecutive double line breaks within the same tag will be treated as separate paragraphs
    [*] Individual line breaks within a tab will be ignored
  [/ul]

  That means that the two examples posted earlier are considered equivalent.  Even though the second example has a lot more spacing and a lot more line breaks for the sake of readability, all that extra white space will be ignored by the interpreter, so you don't have to worry about it messing up your code.

  Currently, I am editing Edge Case projects using [url:'https://atom.io/']Atom[/url], a free text editor for coding produced by GitHub.  This makes it easy to add indentation.  Simply select the text you want to indent, and hit "tab."  Make sure you turn on "soft wraps" by going to settings -> editor.  The indentation will stay consistent even if you edit the text afterwards.  To reverse the indent, simply select the text and hit shift+tab.
[/card]

[card:'Setup-Formatting']

  [b][u]Formatting text in JavaScript[/u][/b]

  By default, the software assigns an empty string variable called "rawScript" to hold the script data.  Your code simple appends additional text to the variable.  Here is what that would look like:

  [bq][eccode]rawScript += "[b]additional text[/b]";[/eccode][/bq]

  For the rest of these examples, the bolded portion of the code will be interpreted as a string, whereas the unbolded portion will be interpreted as coding instructions.

  [button]
  [label]Please click here if any of this is confusing.[/label]
  [togglelabel]Where are you confused?[/togglelabel]
  [toggle]
  [bq]
  [button]
    [label]"I am unfamiliar with the concept of strings and variables"[/label]
    [toggle]
      In programming, a "variable" is a placeholder for storing data.  Variables can be "assigned" a value, and then "called" to retrieve that value.  A "string" type variable is a variable containing text.  You must wrap the string in quotation marks so that the compiler doesn't try to interpret it as code, which would likely result in an error.

      Other common types of variables include:
      [ul]
      [*]Integers:  Whole numbers
      [*]Floats:  Numbers support a decimal amount
      [*]Booleans:  A value that is either "true" or "false"
      [/ul]
    [/toggle]
  [/button]
  [button]
    [label]"I am unfamiliar with the use of the '+=' operator"[/label]
    [toggle]
      The "+=" symbol is a short hand way of saying, "the new value of this variable is equal to it's previous value, plus an added value."

      For instance, suppose the value for variable x is 5, and I type "x += 3."  In that case, the new value of x is 5 + 3, or 8.

      This logic also applies to string.  If the previous value of rawScript is "[b]apple[/b]" and added value is "[b]orange[/b]", then combining them would result in the new value of "[b]apple[/b]" + "[b]orange[/b]", or "[b]appleorange[/b]".
    [/toggle]
  [/button]
  [/toggle]
  [/button]

  In the above example, we're only adding a single line of text.  But we can actually add as much or as little content as we like, as long as the content is wrapped between quotation marks.  We can also break these commands down into many smaller chunks, and load them accross many different files.

  [button][label]Click here for an example of loading longer pieces of text[/label]
  [toggle]
    [bq]The following example is considered valid as long as the string input is still wrapped in quotation marks:
    [bq][eccode]
    rawScript += "[b]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi tortor, posuere quis bibendum vel, dapibus sed purus. Mauris sagittis nulla dolor, ac pharetra lorem laoreet sed. Duis diam magna, tempus eget dapibus nec, fermentum eu nisl. Sed imperdiet porta urna in semper. Aliquam nec ornare urna, sed luctus orci. Aenean eu mauris sed sapien consectetur condimentum nec ac quam. In quis dignissim ligula.

    Maecenas sit amet tortor ligula. Quisque varius urna vitae mi ultricies volutpat. Ut vitae hendrerit mi. Pellentesque luctus lacus eu tortor ullamcorper aliquam. Nam non maximus eros. Fusce porttitor sem sit amet ligula efficitur mollis. Pellentesque vel neque eu lectus rutrum volutpat ut vitae ligula. Mauris at dapibus ex. Sed ac metus rutrum enim elementum tempus.

    Quisque non justo nec velit interdum pretium consectetur id quam. Cras pellentesque nisi vitae lorem pellentesque interdum. Nulla interdum purus sit amet urna congue commodo. Curabitur sollicitudin porttitor magna eu laoreet. Aenean iaculis, risus non fermentum fermentum, lectus tellus porttitor sem, ac tincidunt purus purus a turpis. Praesent eros nunc, facilisis in magna et, rutrum semper mauris. Maecenas venenatis vel nisl id consectetur. Quisque non volutpat dolor.

    Sed euismod feugiat enim, ac fringilla est condimentum id. Aliquam interdum malesuada risus ut pulvinar. Aenean elit risus, imperdiet ut euismod vel, vehicula sit amet ligula. Donec sagittis convallis turpis, in egestas tellus. Morbi in lorem ullamcorper, cursus turpis ultrices, ultrices diam. In vel cursus risus, vitae cursus erat. Integer faucibus congue pulvinar. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer a sapien egestas, posuere leo ut, laoreet enim. Integer vel massa et libero rhoncus vulputate a a sapien. Nunc at elit eget justo condimentum tincidunt. Proin eleifend nibh elit, sed lacinia magna venenatis in. Vestibulum congue libero sit amet quam gravida rhoncus.

    Curabitur fringilla magna dui, eget laoreet lectus volutpat in. Morbi ut tincidunt velit. Vivamus lacinia dolor ac nisl molestie, quis lacinia nisl vestibulum. Aenean sed mauris condimentum, euismod lorem et, varius tellus. In sit amet tellus ut felis fringilla tincidunt at ut risus. Cras mi nunc, ullamcorper in sagittis at, porttitor nec orci. Maecenas feugiat bibendum sapien quis interdum. Sed vitae vulputate tortor. Cras urna massa, malesuada non ultricies ut, posuere in nisi. Suspendisse metus augue, ultricies et cursus mattis, scelerisque vitae tellus. Aliquam id libero nunc. Duis accumsan, diam id cursus maximus, odio lacus interdum velit, id efficitur nisi diam in velit. Curabitur dapibus vehicula interdum.[/b]"
    [/eccode][/bq][/bq]
  [/toggle]
  [/button]

  [button][label]Click here to learn more about loading from multiple files[/label]
  [toggle]
    [bq]
    The "+=" operator simply updates the variable.  This can happen as many times as you like, and across many different files.  For example:
      [bq]
      File #1:
      [eccode]rawScript += "~[card:'apple']apple~[/card]"[/eccode]

      File #2:
      [eccode]rawScript += "~[card:'orange']orange~[/card]"[/eccode]

      File #3:
      [eccode]rawScript += "~[card:'pear']pear~[/card]"[/eccode]

      Final Value for rawScript:[br]
      [eccode]"~[card:'apple']apple~[/card]~[card:'orange']orange~[/card]~[card:'pear']pear~[/card]"[/eccode][/bq]
    The nice thing about this is that it means that you can group cards together.  For instance, if you were making an interactive adventure story, you could have different files representing different towns.  If you were making a game, you can have different files for different types of encounters.  How you choose to organize the project is up to you.

    Note that the order the files are loaded doesn't actually matter.  When the script is loaded into memory, the software breaks it down into individual cards, and then searches for the card titled "main" as the starting point.  It doesn't matter if "main" was the first card loaded into memory, or the last card loaded into memory, as long as it exists.  From there, the contents of "main" will dictate where we navigate to next.
    [/bq]
  [/toggle]
  [/button]

  Of course, there's a problem.  In JavaScript, string variables are wrapped in quotation marks.  But what happens if you have quotation marks within the string itself?  This will usually result in an error.

  [bq][eccode]rawScript += "[b]I would like to buy tickets for [/b]"The Avengers"[b] at 3pm[/b]"[/eccode][/bq]

  In this case, the code tries to end the string too early, and the it tries to interpret "The Avengers" as code.  Both of these things are bad.  If you're already familiar with JavaScript, then the easiest way around this is with backticks and escape characters.

  [bq]Using Backticks:[br]
  rawScript += \`[b]I would like to buy tickets for "The Avengers" at 3pm[/b]\`

  Using Escape Characters:[br]
  rawScript += "[b]I would like to buy tickets for [/b]\\[b]"The Avengers[/b]\\[b]" at 3pm[/b]"
  [/bq]

  [button]
  [label]Click here for an explanation of the backtick symbol[/label]
  [toggle][bq]
  In JavaScript, strings must be wrapped in matching quotation marks.  You have three options:  Double quotes ("text"), single quotes ('text'), and backticks (\`text\`).  It doesn't actually matter which one you use, as long as they match.

  In the earlier example, a conflict occurred because we decided to use double quotation marks to wrap the string.  Unfortunately, the string will terminate early and result in an error because there is also a matching double quoation mark in the text itself.

  What would happen if we used the single quotes instead?

  [bq]rawScript += '[b]I would like to buy tickets for "The Avengers" at 3pm[/b]'[/bq]

  For this example, using single quotation marks fixes the problem.  Since the double quotation marks around "The Avengers" no longer matches, we're now in the clear.  But there's a problem.  What happens if we replace the phrase "I would" with a contraction?

  [bq]rawScript += '[b]I[/b]' like to buy tickets for [b]"The Avengers"[/b] at 3pm'[/bq]

  Now, the string terminates early after the letter "I".  Another string would begin for "The Avengers," but the code would hit an error first.  In a large sized project, you're likely to use both single quotes and double quotes, which means you need a solution that can handle both.

  That's where backticks come in handy.  Backticks are so uncommon that most people aren't even aware that they exist.  It's the lower case version of the "tilda" key, above the "tab" key and next to the "1" key.

  [bq]rawScript += \`[b]I'd like to buy tickets for "The Avengers" at 3pm[/b]\`[/bq]

  This fixes the problem.  And for most people, this should be enough.  But for more ambitious projects, you might need to include backtick symbols within the text itself.  And for that, you need to understand escape characters.
  [/bq][/toggle]
  [/button]

  [button]
  [label]Click here for an explanation of JavaScript escape characters[/label]
  [toggle][bq]
  Often times when coding, we'll have a character that can have two different meanings.  Let's go back to the earlier example:

  [bq]rawScript += "[b]I would like to buy tickets for [/b]"The Avengers"[b] at 3pm[/b]"[/bq]

  Let's break this down:

  [ol][*]In this case, the quotation marks are actually part of the programming code.  When the first quotation mark is found, it acts as an operator that says "everything following this symbol should be interpreted as a string.  Keep going, until you find a matching symbol."
  [*]When the second quotation is found, the software treats assumes that it's supposed to be a part of the code, rather than a part of the string.  In this case, the second quotation mark acts as an operator that says, "everything following this symbol should be interpreted as code."
  [*]It then tries to interpret "The Avengers" as code, rather than as a string, resulting in an error.
  [*]If the error had not occured, it would interpret the third quotation mark after "The Avengers" as the start of a new string.
  [/ol]

  In order to prevent this from happening, we need to tell the computer to interpret the second quotation mark as part of the string, rather than part of the code.  This is handled via the escape character, "\\".  The escape character is an operator that tells JavaScript to ignore default behavior.  Characters that would normally be interpreted as code will now be interpreted as text, and vice verse.  The end product looks like this:

  [bq]Input:[br]
  [b]"[b]I would like to buy tickets for [/b]\\[b]"The Avengers[/b]\\[b]" at 3pm[/b]"[/b]

  Result:[br]
  [b]"[b]I would like to buy tickets for "The Avengers" at 3pm[/b]"[/b]
  [/bq]
  Unfortunately, expecting people to add an escape character everytime they intend to use quotation marks can be rather cumbersome, especially if you're dealing with laypersons who aren't used to programming.  That's why it's good to use backticks, so this happens very rarely.
  [/bq][/toggle]
  [/button]

  [button]
  [label]Click here for an explanation of Edge Case escape characters[/label]
  [toggle][bq]
  Edge Case has it's own escape character in the form of the tilda symbol, next to the number "1" on the keyboard.  This symbol tells the computer to process Edge Case tags and HTML tags as text, rather than code.

  For instance, suppose I want to write out instructions on how the [b]"~[b]"[/b] tag works.  I don't want to actually bold any text, I just want to show users what the tag for bolding text is supposed to look.

  [bq]
    Script:[/b][br]
    Wrapping "text" in the ~[b]~[/b] tag ("~[b] text ~[/b]"), will make that text bold.

    Output:[/b][br]
    Wrapping "text" in the [b][/b] tag ("[b] text [/b]"), will make that text bold.
  [/bq]

  Unfortunately, once the software sees a valid tag, it tries to interpret it as code, rather than text.  That's why we add the tilda as an escape character:

  [bq]
    Script:[/b][br]
    Wrapping "text" in the ~~[b]~~[/b] tag ("~~[b] text ~~[/b]"), will make that text bold.

    Output:[/b][br]
    Wrapping "text" in the ~[b]~[/b] tag ("~[b] text ~[/b]"), will make that text bold.
  [/bq]

  The tilda escape character can also be used for raw HTML:
  [bq]
    Script:[/b][br]
    Wrapping "text" in the ~<strong>~</strong> tag ("~<strong> text ~</strong>"), will make that text bold.

    Output:[/b][br]
    Wrapping "text" in the <strong></strong> tag ("<strong> text </strong>"), will make that text bold.

    Script:[/b][br]
    Wrapping "text" in the ~~<strong>~~</strong> tag ("~~<strong> text ~~</strong>"), will make that text bold.

    Output:[/b][br]
    Wrapping "text" in the ~<strong>~</strong> tag ("~<strong> text ~</strong>"), will make that text bold.
  [/bq]
  Most people will never need to know this feature, but it could come in handy if you're ever trying to write instruction manuals.
  [/bq][/toggle]
  [/button]

  [button]
  [label]Click here to learn how to write comments in Edge Case[/label]
  [toggle][bq]
  Sometimes, you'll want to write comments in your code that doesn't appear in the actual output

  Comments in Edge Case are simply another tag.  In this case, a tag with the tilda symbol.

  [bq]
    Script:[/b][br]
    aaaaaaaaaaa~[~] COMMENT TEXT ~[/~]aaaaaaaaaaaaaaa.

    Output:[/b][br]
    aaaaaaaaaaa[~] COMMENT TEXT [/~]aaaaaaaaaaaaaaa.

   This can be so you don't remember why you did something, or to explain your decisions to other authors, or to write a "TODO" for future tasks.
  [/bq]
  [/bq][/toggle]
  [/button]

  And that's pretty much all you need to know for now to create a properly formatted script file.

  [button cardlink:'Setup-Loading']Learn how to load your files.[/button]
  [button cardlink:'main']Return to main menu[/button]

[/card]

[card:'Setup-Loading']
  [b][u]Loading your files[/u][/b]

  I'm writing this in the hopes that you are already somewhat familiar with how to link files in HTML.  If not...  I'll try to do a better job explaining this in the future.

  To edit your own script, simply make a copy of the Edge Case folder, and then create your own .js files for holding text.  You can look at the existing .js files to see how this should look.

  Then edit the index.html page.  Under where it says "Insert Script Files Here", include links to the .js files for your product.  Again, pay attention to how the existing links are formatted.  You can also remove any links to files from the "script" folder that you didn't create or edit yourself.

  [button cardlink:'main']Return to main menu[/button]
[/card]
`

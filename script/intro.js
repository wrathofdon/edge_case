rawScript = rawScript + `
  [card:'placeholder']
    This is a placeholder for future content.
  [/card]

  [card:'main']
    [b][u]Welcome to Edge Case[/u][/b]

    Edge Case is a custom markup language for creating non-linear scripts.  It can be used for interactive tutorials, simple games, "choose your own adventure" style stories, modeling control flows, and more.

    These scripts can be written in any text editor and launched client-side in any browser, without the need for any special software or server.  It is best suited for evolving "works-in-progress" and rapid prototyping.  Software teams can include an Edge Case folder in existing private repositories for documentation, and track changes in their existing git workflows.

    I will try my best to keep the current draft of this tutorial accessible to everyone, but it does help if you're at least moderately familiar with the basics of HTML and JavaScript.  I assume that anyone who stumbled upon this project already has that background.  If not, stay tuned for future versions, which will simplify things even further.

    [button cardlink:'GettingStarted-Intro']Writing your first project[/button]

    [button cardlink:'GettingStarted-Setup']Learn how to setup files[/button]

  [/card]

  [card:'GettingStarted-Intro']
    [b][u]Writing your first project[/u][/b]

    Let's walk through the process of creating a basic project.

    Edge Case is a markup language, similar to HTML and BBCode.  If you're familiar with either of those, then you might already be able to follow along.  Markup languages use "tags" in order to format text.  In Edge Case, we refer to these as "blocks," and we can use blocks to represent more complex data structures, like cards and butons.

    [bq]
      [button persist:'true']
        [label]Click here to see a sample of the scripting language.[/label]
        [toggle]
          [b]~[card:'main'][/b][br]
          "Hello World!  Why don't you pick a door?"

          [b]~[button cardlink:'door1'][/b] Pick door #1 [b]~[/button][/b]

          [b]~[button cardlink:'door2'][/b] Pick door #2 [b]~[/button][/b][br]
          [b]~[/card][/b]

          [b]~[card:'door1'][/b]You open door #1 and you win a prize.[b]~[/card][/b]

          [b]~[card:'door2'][/b]You open door #2 and win nothing.[b]~[/card][/b]
        [/toggle]
      [/button]
    [/bq]

    Don't worry if that doesn't make any sense yet, we're about to cover that right now.

    [button cardlink:'GettingStarted-Markup']If you've never worked with a markup language before, click here for an introduction.[/button]

    [button cardlink:'GettingStarted-Cards']Otherwise, we can skip to working on our first card.[/button]

  [/card]

  [card:'GettingStarted-Markup']
    [b][u]Introduction to Markup Languages[/u][/b]

    In a markup language, text is "marked" with specific tags that tell the computer what to do with them.  In Edge Case, we refer to this as a "block," which we assemble one at a time to build a project.

    Most blocks will wrap content between an opening tag, and a matching closing tag.  The closing tag is signified by the use of the "/" symbol before the tag name.  Here is an example of what this looks like:

    [bq][b] ~[tag][/b] Content [b]~[/tag][/b][/bq]

    Different tags do different things.  For instance, the [b]"~[b]"[/b] tag makes text bold, the [b]"~[u]"[/b] makes text underlined, and the [b]"~[i]"[/b] tag makes text italicized.

    [bq]
      Script:[/br]
      [b]~[b][/b] Bolded [b]~[/b] ~[u][/b] Underlined [b]~[/u] ~[i][/b] italicized [b]~[/i][/b]

      Output:[/br]
      [b] Bolded [/b] [u] Underlined [/u] [i] italicized [/i]
    [/bq]

    Other blocks are [b]self-closing[/b], meaning that they only have one tag, with no contents.  For instance, to add a line break, simply use the the [b]"~[br]"[/b] tag.

    [bq]
      Script:[/br]
      Hello [b]~[br][/b] World!

      Output:[/br]
      Hello [br] World!
    [/bq]

    [button cardlink:'GettingStarted-OOP']If you're still confused, it might help to learn the basics of object-oriented programming.[/button]

    [button cardlink:'GettingStarted-Cards']Or if you're good for now, click here to learn how to make cards.[/button]

  [/card]

  [card:'GettingStarted-Cards']
    [b][u]Understanding Cards[/u][/b]

    When the Edge Case script is interpreted by the software, it is first broken down into individual cards, which are basically equivalent to pages in a book, or nodes in a flowchart.

    Cards are the main containers of content.  All other blocks are stored within cards, and cards cannot be stored within any other type of block.  Navigation occurs by loading one card after another.  Cards can either be displayed one at a time like a PowerPoint presentation, or you can attach multiple cards in a chain.

    How do you create a card?  Well, since Edge Case is a markup language, you create as a block with the "card" tag, and then add as much or as little content as you would like:

    [bq]
      [b]~[card][/b][br]
      "Hello World!"[/br]
      [b]~[/card][/b]
    [/bq]

    But this is incomplete.  If you have multiple cards, and you likely will, then how do you navigate between them?  How do you let the software know the specific card you would like to visit?  To handle this, each card must be assigned it's own title, which is handled by adding a property.

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World!"[/br]
      [b]~[/card][/b]
    [/bq]

    If you're familiar with object-oriented programming, then you should already understand the concept of properties, or attributes.  Just like with HTML and BBCode, properties are specified in the opening tag.  However, since Edge Case is parsed entirely in JavaScript, the actual formatting is in JavaScript style.  Assignment happens via ":" rather than "=", and multiple properties must be separated by commas.

    [button cardlink:'GettingStarted-OOP']"Can you explain what you mean by object-oriented programming?"[/button]

    [button cardlink:'GettingStarted-main']"I'm following along okay so far.  So how do I make a project?"[/button]

  [/card]

  [card:'GettingStarted-OOP']
    [b][u]Object Oriented Programming[/u][/b]

    From Wikipedia:

    [bq][i]Object-oriented programming (OOP) is a programming paradigm based on the concept of "objects", which may contain data, in the form of fields, often known as attributes; and code, in the form of procedures, often known as methods. A feature of objects is that an object's procedures can access and often modify the data fields of the object with which they are associated (objects have a notion of "this" or "self"). In OOP, computer programs are designed by making them out of objects that interact with one another. There is significant diversity of OOP languages, but the most popular ones are class-based, meaning that objects are instances of classes, which typically also determine their type."[/i][/bq]

    This might sound complicated, but it's actually fairly simple.  In JavaScript, everything is an object, and every object has a state (attributes) and behavior (methods).  The state is the object's raw data, whereas the behavior is what the object can do.  For instance, if you play Dungeons and Dragon, then your STRENGTH score is a state.  Your ability to make an attack is a behavior.  In Mario Brothers, the number of lives you have and the number of coins you collected is a state.  Your ability to run and jump when you press the right buttons is a behavior.

    State is stored in the form of key-value pairs, also known as "properties" or "attributes" or "fields."  Think of it like fields on a form.  The key is the name of the property, while the value is the data being stored.

    In Edge Case blocks are a type of object.  Different tags perform different behaviors, and different behaviors require different properties.  The content is one type of property.  Additional property can be specified in the opening tag as key-value pairs.  Here is a common example:

    [bq]Script:[br]
    [b]~[url:'http://github.com'][/b] Let's make a repo [b]~[/url][/b]

    Output:[br]
    [url:'http://github.com'] Let's make a repo [/url]
    [/bq]

    In this example, the "url" contains a behavior to tell the software to create a link to an outside website.  For that, it needs link text to present to the user, and a link url of the page to visit.  In this case, "url" is both the name of the tag, and the name of the property.  Most of the time, you will have tag names that are not properties, and property names names that are not tags.

  [/card]

  [card:'GettingStarted-main']

    [b][u]Creating your first card[/u][/b]

    By now, you should understand how to make a card, so let's create one with the title of "main".

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World!"[/br]
      [b]~[/card][/b]
    [/bq]

    Why did we choose "main" for the title?  Well, when Edge Case first launches, it has many cards to choose from, and doesn't know where to start.  By default, it searches the project for a card called "main", and uses that as the starting point.  So that's where we should start.  The card titled "main" will always be treated as the first page, and from there, you should present options to branch off into other cards.

    [button cardlink:'example-main1']
    [label]Click here to see the an example of the card we just made.[/label]
    [reveal]Below is the "Hello World" card that we just created.  Of course, there's a problem.  The card we created has text, but it doesn't give us anywhere to go or anything to do.  The next step is to add some buttons.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]

    [button cardlink:'GettingStarted-AddingOptions', condition:'globalCardDict["example-main1"].cardVar.timesLoaded > 0']Let's fix that by adding additional cards to navigate to.[/button]

  [/card]

  [card:'GettingStarted-AddingOptions']
    [b][u]Adding additional cards[/u][/b]

    By now, we have already started on our first script and written out our first card, 'main'.  Here's a recap of what 'main' looks like:

    [bq]
      [b]~[card:'main'][/b][br]
      "Hello World"[/br]
      [b]~[/card][/b]
    [/bq]

    Now, let's present the user with two different choices, which are linked to two different cards.  One cards opens door #1, and the other card opens door #2:

    [bq]
      [b]~[card:'main'][/b]"Hello World!  Why don't you pick a door?"[b]~[/card][/b]

      [b]~[card:'door1'][/b]You open door #1 and you win a prize.[b]~[/card][/b]

      [b]~[card:'door2'][/b]You open door #2 and win nothing.[b]~[/card][/b]
    [/bq]

    See how simple that was?  Note how in this version, we're not bothering to add line breaks.  In an Edge Case script, line breaks are usually considered optional for the sake of making things easier to read.  Two consecutive line breaks in the same block will be recognized as a separate paragraph.  But a single line break, or line breaks in separate blocks, will simply be ignored.  Choose whatever format you think will make things more readable and easier to understand.

    [button cardlink:'example-main2']
    [label]Click here to see the an example of the card we just made.[/label]
    [reveal]Now we have new cards to visit, but we still don't have any way to reach them.  Let's fix that by learning to add some buttons.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]

    [button cardlink:'GettingStarted-Buttons']Click here to learn how to add buttons.[/button]

  [/card]

  [card:'GettingStarted-Buttons']
    [b][u]Adding buttons[/u][/b]

    The easiest way to add interaction is by adding buttons.  How do you do that in Edge Case?  Simple.  You just create another block:

    [bq][b]~[button][/b] Button label [b]~[/button][/b][/bq]

    The button label is the contents that you want the user to interact with.  This usually means text, but it could also be an image, or a combination of both.  Let's add two new buttons to the "main" card:

    [bq]
      [b]~[card:'main'][/b]"Hello World!  Why don't you pick a door?"[b][/b]

      [b]~[button cardlink:'door1'][/b] Pick door #1 [b]~[/button][/b]

      [b]~[button cardlink:'door2'][/b] Pick door #1 [b]~[/button][/b][br]
      [b]~[/card][/b]
    [/bq]

    [button cardlink:'example-main3']
    [label]Click here to see the an example of the card we just made.[/label]
    [reveal]Now we have a card with buttons.  But... the buttons don't actually do anything when you click them.  To make those buttons functional, we need to add cardlinks.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]

    [button cardlink:'GettingStarted-Cardlinks']Click here to learn how to add cardlinks to a button.[/button]
  [/card]

  [card:'GettingStarted-Cardlinks']
    [b][u]Adding cardlinks[/u][/b]

    In order to link a button to another card, you need to add a cardlink.  A cardlink is an optional property that you can add to the button tag, which adds an additional modifier.  They take on the following format:

    [bq]
      [b]~[button cardlink:'TitleOfCardToLinkTo'][/b][br]
      Button label[/br]
      [b]~[/button][/b]
    [/bq]

    The cardlink property of the button block should match to the card property of the card block.  You might have noticed that in the earlier example with cards, the word "card" is followed by a colon, but the word "button" is not.  Property names will end with a colon, including properties that are also a tag name.  Tag names that are not being used as a property do not end with a colon.

    [ul]
      [*][b]"card"[/b] is both the name of a tag, and the name of a property.  It ends with a colon.
      [*][b]"button"[/b] is the name of a tag, but not the name of a property.  It does not end with a colon.
      [*][*]"cardlink"[/b] is the name of a property, but not the name of a tag.  It ends with a colon.
    [/ul]

    With that in mind, let's create the updated code, with the proper cardlinks attached:

    [bq]
      [b]~[card:'main'][/b]"Hello World!  Why don't you pick a door?"[b][/b]

      [b]~[button cardlink:'door1'][/b] Pick door #1 [b]~[/button][/b]

      [b]~[button cardlink:'door2'][/b] Pick door #2 [b]~[/button][/b][br]
      [b]~[/card][/b]
    [/bq]

    This is the same code that you saw at the introduction.  If it didn't make any sense to you back then, then hopefully it should make sense now.

    And there you have it.  That's all you need in order to create a card which can link to other cards.  There's a lot more you can do with Edge Case which we can cover later on, but for now, this should be enough to get you started.  You already have enough information to create a basic "Choose Your Own Adventure" style storyline.

    [button cardlink:'example-main4']Let's see this in action[/button]
    [button cardlink:'GettingStarted-Recap']Recap of what you learned[/button]
    [button cardlink:'main']Return to main menu[/button]
  [/card]

  [card:'example-main1']"Hello World"[/card]

  [card:'example-main2']"Hello World!  Why don't you pick a door?"[/card]

  [card:'example-main3']
  "Hello World!  Why don't you pick a door?"

  [button] Pick door #1 [/button]
  [button] Pick door #2 [/button]
  [/card]

  [card:'example-main4']
    "Hello World!  Why don't you pick a door?"

    [button cardlink:'example-door1'] Pick door #1 [/button]
    [button cardlink:'example-door2'] Pick door #2 [/button]
  [/card]

  [card:'example-door1']You open door #1 and you win a prize.[/card]

  [card:'example-door2']You open door #2 and win nothing.[/card]

  [card:'GettingStarted-Recap']
    [b][u]Building your first project - Recap[/u][/b]

    Now that we've gone over the basics, let's recap what we've learned:

    [ol]
      [*]Edge Case is a [b]markup language[/b], which uses tags wrapped in square brackets.  A markup language is a language that can be written in any ordinary word processor, where sections of the text are "tagged" to let the computer know that you would like to do something special with it.  We refer to these as [b]blocks[/b], and we can use blocks to construct more complex data objects, such as [b]cards[/b] and [b]buttons[/b].[br][br]
      [*]Most blocks contain some type of content, and when they do, you should have both an opening tag and a matching closing tag with a "/" symbol.  Some blocks are self-closing, meaning they do not have a separate closing tag, and they do not contain any contents.[br][br]
      [*]Blocks can include additional modifiers, known as properties, which are key-value pairs specified in the opening tag.  We've seen examples of how properties are used when creating cards and buttons, and we'll see more examples as we delve deeper.  Cards use properties to specify a title, and buttons can use properties to link to other cards.
    [/ol]

    [button cardlink:'main']Return to main menu[/button]
  [/card]

  [card:'GettingStarted-Setup']
    [b][u]Building your first project - Setup[/u][/b]

    Edge Case is a markup language which can be written in plain text and parsed entirely in your local browser.  Ideally, you would save your script as a text file, and then the JavaScript would import that code and load it into memory.  Unfortunately, browsers limit access to local files for basic security reasons.  Otherwise, malicious websites could scan your computer for private data and send it over the internet.  One way around this is to setup a server with special permissions, but that defeats the goal that Edge Case was designed for.

    But there's a workaround.  Imagine if a pizza delivery driver didn't have access to any outside pizza oven, so instead, the driver installs an oven for baking pizza directly inside the van.  Instead of trying to program JavaScript to retrieve your project from an outside source, we instead insert your project into the JavaScript code itself.

    Unfortunately, this does require some understanding of how JavaScript works.

    [button cardlink:'GettingStarted-Formatting']Click here to learn about how to properly format text for JavaScript.[/button]

    [button cardlink:'GettingStarted-Loading']Click here to learn how to load your files.[/button]

  [/card]

  [card:'GettingStarted-Formatting']

    [b][u]Formatting text in JavaScript[/u][/b]

    By default, the software assigns an empty string variable called "rawScript" to hold the script data.  Your code simple appends additional text to the variable.  Here is what that would look like:

    [bq]rawScript += "[b]additional text[/b]";[/bq]

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
      [bq]
      rawScript += "[b]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi tortor, posuere quis bibendum vel, dapibus sed purus. Mauris sagittis nulla dolor, ac pharetra lorem laoreet sed. Duis diam magna, tempus eget dapibus nec, fermentum eu nisl. Sed imperdiet porta urna in semper. Aliquam nec ornare urna, sed luctus orci. Aenean eu mauris sed sapien consectetur condimentum nec ac quam. In quis dignissim ligula.

      Maecenas sit amet tortor ligula. Quisque varius urna vitae mi ultricies volutpat. Ut vitae hendrerit mi. Pellentesque luctus lacus eu tortor ullamcorper aliquam. Nam non maximus eros. Fusce porttitor sem sit amet ligula efficitur mollis. Pellentesque vel neque eu lectus rutrum volutpat ut vitae ligula. Mauris at dapibus ex. Sed ac metus rutrum enim elementum tempus.

      Quisque non justo nec velit interdum pretium consectetur id quam. Cras pellentesque nisi vitae lorem pellentesque interdum. Nulla interdum purus sit amet urna congue commodo. Curabitur sollicitudin porttitor magna eu laoreet. Aenean iaculis, risus non fermentum fermentum, lectus tellus porttitor sem, ac tincidunt purus purus a turpis. Praesent eros nunc, facilisis in magna et, rutrum semper mauris. Maecenas venenatis vel nisl id consectetur. Quisque non volutpat dolor.

      Sed euismod feugiat enim, ac fringilla est condimentum id. Aliquam interdum malesuada risus ut pulvinar. Aenean elit risus, imperdiet ut euismod vel, vehicula sit amet ligula. Donec sagittis convallis turpis, in egestas tellus. Morbi in lorem ullamcorper, cursus turpis ultrices, ultrices diam. In vel cursus risus, vitae cursus erat. Integer faucibus congue pulvinar. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer a sapien egestas, posuere leo ut, laoreet enim. Integer vel massa et libero rhoncus vulputate a a sapien. Nunc at elit eget justo condimentum tincidunt. Proin eleifend nibh elit, sed lacinia magna venenatis in. Vestibulum congue libero sit amet quam gravida rhoncus.

      Curabitur fringilla magna dui, eget laoreet lectus volutpat in. Morbi ut tincidunt velit. Vivamus lacinia dolor ac nisl molestie, quis lacinia nisl vestibulum. Aenean sed mauris condimentum, euismod lorem et, varius tellus. In sit amet tellus ut felis fringilla tincidunt at ut risus. Cras mi nunc, ullamcorper in sagittis at, porttitor nec orci. Maecenas feugiat bibendum sapien quis interdum. Sed vitae vulputate tortor. Cras urna massa, malesuada non ultricies ut, posuere in nisi. Suspendisse metus augue, ultricies et cursus mattis, scelerisque vitae tellus. Aliquam id libero nunc. Duis accumsan, diam id cursus maximus, odio lacus interdum velit, id efficitur nisi diam in velit. Curabitur dapibus vehicula interdum.[/b]"
      [/bq][/bq]
    [/toggle]
    [/button]

    [button][label]Click here to learn more about loading from multiple files[/label]
    [toggle]
      [bq]
      The "+=" operator simply updates the variable.  This can happen as many times as you like, and across many different files.  For example:
        [bq]
        File #1:[br]
        rawScript += "[b]~[card:'apple']apple~[/card][/b]"

        File #2:[br]
        rawScript += "[b]~[card:'orange']orange~[/card][/b]"

        File #3:[br]
        rawScript += "[b]~[card:'pear']pear~[/card][/b]"

        Final Value for rawScript:[br]
        "[b]~[card:'apple']apple~[/card]~[card:'orange']orange~[/card]~[card:'pear']pear~[/card][/b]"
        [/bq]
      The nice thing about this is that it means that you can group cards together.  For instance, if you were making an interactive adventure story, you could have different files representing different towns.  If you were making a game, you can have different files for different types of encounters.  How you choose to organize the project is up to you.

      Note that the order the files are loaded doesn't actually matter.  When the script is loaded into memory, the software breaks it down into individual cards, and then searches for the card titled "main" as the starting point.  It doesn't matter if "main" was the first card loaded into memory, or the last card loaded into memory, as long as it exists.  From there, the contents of "main" will dictate where we navigate to next.
      [/bq]
    [/toggle]
    [/button]

    Of course, there's a problem.  In JavaScript, string variables are wrapped in quotation marks.  But what happens if you have quotation marks within the string itself?  This will usually result in an error.

    [bq]rawScript += "[b]I would like to buy tickets for [/b]"The Avengers"[b] at 3pm[/b]"[/bq]

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

    [bq]rawScript += \`[b]I like to buy tickets for "The Avengers" at 3pm[/b]\`[/bq]

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

    [button cardlink:'GettingStarted-Loading']Learn how to load your files.[/button]
    [button cardlink:'main']Return to main menu[/button]

  [/card]

  [card:'GettingStarted-Loading']
    [b][u]Loading your files[/u][/b]

    I'm writing this in the hopes that you are already somewhat familiar with how to link files in HTML.  If not...  I'll try to do a better job explaining this in the future.

    To edit your own script, simply make a copy of the Edge Case folder, and then create your own .js files for holding text.  You can look at the existing .js files to see how this should look.

    Then edit the index.html page.  Under where it says "Insert Script Files Here", include links to the .js files for your product.  Again, pay attention to how the existing links are formatted.  You can also remove any links to files from the "script" folder that you didn't create or edit yourself.

    [button cardlink:'main']Return to main menu[/button]
  [/card]

`

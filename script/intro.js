rawScript += `
  [card:'placeholder']
    This is a placeholder for future content.
  [/card]

  [card:'main']
    [b][u]Welcome to Edge Case[/u][/b]

    Edge Case is a custom markup language for creating non-linear scripts.  It can be used for interactive tutorials, simple games, "choose your own adventure" style stories, modeling control flows, and more.

    These scripts can be written in any text editor and launched client-side in any browser, without the need for any special software or server.  It is best suited for evolving "works-in-progress" and rapid prototyping.  Software teams can include an Edge Case folder in existing private repositories for documentation, and track changes in their existing git workflows.

    I will try my best to keep the current draft of this tutorial accessible to everyone, but it does help if you're at least moderately familiar with the basics of HTML and JavaScript.  I assume that anyone who stumbled upon this project already has that background.  If not, stay tuned for future versions, which will simplify things even further.

    [button cardlink:'GettingStarted-Intro']How does Edge Case Work[/button]

    [button cardlink:'Setup-Intro']Learn how to setup files[/button]

    [button cardlink:'Blocks-Intro']Block Library[/button]

  [/card]

  [card:'GettingStarted-Intro']
    [b][u]How does Edge Case Work[/u][/b]

    To get started with Edge Case, let's walk through the step-by-step process of creating a basic project.

    Edge Case is a markup language, similar to HTML and BBCode.  Markup languages use "tags" in order to format text.  In Edge Case, we refer to these as "blocks," and we can use blocks to represent more complex data structures, like cards and butons.

    Here is a sample of what this looks like:

    [bq][eccode id:'sample']
    ~[card:'main']
    [*]
      "Hello World!  Why don't you pick a door?"

      ~[button cardlink:'door1'] Pick door #1 ~[/button]

      ~[button cardlink:'door2'][/b] Pick door #2 ~[/button]
    [/*]
    ~[/card]

    ~[card:'door1']You open door #1 and you win a prize.~[/card]

    ~[card:'door2']You open door #2 and win nothing.~[/card]
    [/eccode][/bq]

    If you're already familiar with how markup languages and object-oriented programming, then this might already make sense to you.  If not, I will try my best to help you along.

    [button cardlink:'GettingStarted-Markup']Introduction to markup languages[/button]

    [button cardlink:'GettingStarted-Cards']Otherwise, we can skip to working on our first card.[/button]

  [/card]

  [card:'GettingStarted-Markup']
    [b][u]Introduction to Markup Languages[/u][/b]

    In a markup language, text is "marked" with specific tags in order to give the software special instructions.  In Edge Case, we refer to this as a "block," which we assemble one at a time to build a project.  Most blocks take the following form:

    [bq][eccode]~[tag] Content ~[/tag][/eccode][/bq]

    In this case, you content wrapped between an opening tag and a matching closing tag, both of which are in red.  The closing tag is signified by the use of the "/" symbol before the tag name, to signify the end of the block.  Different tags do different things.  Here is an example of different tags in action:

    [bq]
      Script:[/br]
      [eccode]~[b]Bolded~[/b] ~[u] Underlined ~[/u] ~[i] italicized ~[/i][/eccode]

      Output:[/br]
      [b]Bolded[/b] [u]Underlined[/u] [i]italicized[/i]
    [/bq]

    However, some tags do not hold any content.  These are known as "self-closing" tags, since there's no need for a separate closing tag at the end.  For instance, the [b]~[hr][/b] tag simply adds a horizontal line.

    [bq]
      Script:[/br]
      [eccode]Hello~[hr]world![/eccode]

      Output:[/br]
      Hello[hr]world!
    [/bq]

    Finally, some can blocks be written with additional properties in the opening tag.  We'll go over examples of this when creating cards and buttons.  However, if you've never dealth with the concept of object properties before, then you might want a brief introduction to object-oriented programming before moving forward.

    [button cardlink:'GettingStarted-OOP']Introduction to object-oriented programming.[/button]

    [button cardlink:'GettingStarted-Cards']Learn how to make cards.[/button]
  [/card]

  [card:'GettingStarted-Cards']
    [b][u]Understanding Cards[/u][/b]

    When the Edge Case script is interpreted by the software, it is first broken down into individual cards, which are basically equivalent to pages in a "choose your own adventure" book, or nodes in a graph/flowchart.

    Cards are the main containers of content.  All other blocks are stored within cards, and cards cannot be stored within any other type of block.  Navigation occurs by loading one card after another.  They can either be displayed one at a time, or consecutively in a chain.

    How do you create a card?  Well, since Edge Case is a markup language, you create as a block with the "card" tag, and then add as much or as little content as you would like:

    [bq][eccode]
      ~[card]
      [*]"Hello World!"[/*]
      ~[/card]
    [/eccode][/bq]

    But this is incomplete.  If you have multiple cards, and you likely will, then how do you navigate between them?  How do you let the software know the specific card you would like to visit?  To handle this, each card must be assigned it's own title, by adding a property.

    [bq][eccode]
      ~[card:'main']
      [*]"Hello World!"[/*]
      ~[/card]
    [/eccode][/bq]

    In this case, "card" is the name of the tag, but it is also the key to a property with the value of "main".  The title of "main" is very important.  Edge Case is designed to allow for non-linear projects, which means that cards do not have to be entered in any particular order.  After all the cards have been loaded, the software will search for the card titled "main" to use as the starting point.  And so that should always be the title of the first card on display.

    Property formatting in Edge Case follows JavaScript convention, using colons to assign a value and commas to separate multiple entries.  This is different from HTML and BBCode, which use equal signs instead of colons, and which do not use commas.

    If you're unfamiliar with how properties work, I recomend you back to reviewing the explanations on markup languages and object oriented programming.

    [button cardlink:'GettingStarted-Markup']Review section on markup languages[/button]

    [button cardlink:'GettingStarted-AddingOptions']Create additional cards to visit[/button]

    [button cardlink:'example-main1']
    [label]Check out the card we just made[/label]
    [reveal]Below is the "Hello World" card that we just created.  Of course, there's a problem.  The card we created has text, but it doesn't give us anywhere to go or anything to do.  The next step is to add some buttons.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]

  [/card]

  [card:'GettingStarted-OOP']
    [b][u]Object-Oriented Programming[/u][/b]

    While you don't need to understand objected-oriented programming (OOP) to get started with Edge Case, it can certainly help.  OOP is paradigm or idea, a way of breaking down complex projects down into smaller and more manageable chunks.  Instead of having one massive procedure that tries to do everything, you degelate to individual objects.

    Objects require three things:  Properties, methods, and identity.  Properties are the attributes and data, methods are the actions and behavior, and identity...  you don't have to worry about that for now.  If you have a car object, then the VIN number and the license are examples of properties.  The ability to accelerate or turn on the headlights are examples of method.  The ability to check the odometer for your current speed is also a method.  Even though it's a piece of data, it's data that uses a method to calculate speed on the fly, rather than data that was being stored.

    In Edge Case, every block is a type of object.  Different blocks require different properties, and will perform different actions.  Here's an example of a block with the URL tag:

    [bq]Script:[br]
    [eccode][url:'http://github.com'] Let's make a repo ~[/url][/eccode]

    Output:[br]
    [url:'http://github.com'] Let's make a repo [/url]
    [/bq]

    Properties are stored as key-value pairs.  The key is the name of the property that the program can call upon, and the value is the data being stored.  These are often refered to as "fields," as in, fields on a form.  In this case, there are three main properties to consider:

    [ul]
      [*][b]Tag Name:[/b] "url"
      [*][b]URL address:[/b] "http://github.com"
      [*][b]Link Text:[/b] "Let's make a repo"
    [/ul]

    The link text is stored in the content.  Additional properties, such as the URL, can be specified in the opening tag, which is highlighted in green.

    The block object created also has a method:  Take the contents of the block and convert it into a link, which should point to the URL address.  In this case, the tag name is also the name of the property.  Most of the time, you will have tag names that are not properties, and property names names that are not tags.

  [card:'GettingStarted-AddingOptions']
    [b][u]Adding additional cards[/u][/b]

    By now, we have already started on our first script and written out our first card, 'main'.  Here's a recap of what 'main' looks like:

    [bq][eccode]
      ~[card:'main']
      [*]"Hello World"[/*]
      ~[/card]
    [/eccode][/bq]

    Now, let's present the user with two different choices, which are linked to two different cards.  One cards opens door #1, and the other card opens door #2:

    [bq][eccode]
      ~[card:'main']"Hello World!  Why don't you pick a door?"~[/card]

      ~[card:'door1']You open door #1 and you win a prize.~[/card]

      ~[card:'door2']You open door #2 and win nothing.~[/card]
    [/eccode][/bq]

    See how simple that was?

    Two things to note.  First, in Edge Case, you can put multiple cards in the same file, which makes it a lot easier if you're planning to make a lot of them.  Second, you might have noticed that the formatting from the two examples is different.  In the first example, you have line breaks and indentation within the first card.  In the second example, it's all one line.  Both ways are correct, and it's up to you to decide which way you prefere.

    [button cardlink:'GettingStarted-Buttons']Click here to learn how to add buttons.[/button]

    [button cardlink:'example-main2']
    [label]Click here to see the an example of the card we just made.[/label]
    [reveal]Now we have new cards to visit, but we still don't have any way to reach them.  Let's fix that by learning to add some buttons.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]
  [/card]

  [card:'GettingStarted-Buttons']
    [b][u]Adding buttons[/u][/b]

    The easiest way to add interaction is by adding buttons.  How do you do that in Edge Case?  Simple.  You just create another block:

    [bq][eccode]~[button]Button label~[/button][/eccode][/bq]

    The button label is the contents that you want the user to interact with.  This usually means text, but it could also be an image, or a combination of both.  Let's add two new buttons to the "main" card:

    [bq]
      [eccode]~[card:'main']"Hello World!  Why don't you pick a door?"
      [*]~[button cardlink:'door1'] Pick door #1 ~[/button]

      ~[button cardlink:'door2'] Pick door #1 ~[/button][/*]
      ~[/card][/eccode]
    [/bq]

    [button cardlink:'GettingStarted-Cardlinks']Click here to learn how to add cardlinks to a button.[/button]

    [button cardlink:'example-main3']
    [label]Click here to see the an example of the card we just made.[/label]
    [reveal]Now we have a card with buttons.  But... the buttons don't actually do anything when you click them.  To make those buttons functional, we need to add cardlinks.

    [b]Note:  If you ever get stuck on a card with no active buttons, remember you can use the "go back" link at the bottom.[/b][/reveal]
    [/button]
  [/card]

  [card:'GettingStarted-Cardlinks']
    [b][u]Adding cardlinks[/u][/b]

    In order to link a button to another card, you need to add a cardlink.  A cardlink is an optional property that you can add to the button tag, which adds an additional modifier.  They take on the following format:

    [bq][eccode]
      ~[button cardlink:'TitleOfCardToLinkTo']
      [*]Button label[/*]
      ~[/button]
    [/eccode][/bq]

    The cardlink property of the button block should match to the card property of the card block.  You might have noticed that in the earlier example with cards, the word "card" is followed by a colon, but the word "button" is not.  Property names will end with a colon, including properties that are also a tag name.  Tag names that are not being used as a property do not end with a colon.

    [ul]
      [*][b]"card"[/b] is both the name of a tag, and the name of a property.  It ends with a colon.
      [*][b]"button"[/b] is the name of a tag, but not the name of a property.  It does not end with a colon.
      [*]"cardlink"[/b] is the name of a property, but not the name of a tag.  It ends with a colon.
    [/ul]

    With that in mind, let's create the updated code, with the proper cardlinks attached

    [bq][copy card:'GettingStarted-Intro', id:'sample'][/bq]

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
`

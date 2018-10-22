rawScript += `
[card:'placeholder']
  This is a placeholder for future content.
[/card]

[card:'main']
  [center][b][u]Welcome to Edge Case[/u][/b][/center]

  [tab]Edge Case is a layperson-friendly markup language for scripting agile documentation for agile environments.  It be used to create interactive tutorials, simple games, "choose your own adventure" style stories, modeling control flows, and more.  The platform is best suited for rapid prototyping and constantly changing works-in-progress, especially in collaborative environments.

  [tab]Everything in Edge Case can be broken down into cards, which are the main containers of content.  They're equivalent to pages in a "choose your own adventure" store, or nodes in a flow chart.  The script is written so that people can move from one card to the next, in any order that the author allows for.  This page you're looking at right now is all from a single card.

  [tab]The main advantage for Edge Case is its simplicity.  No prior programming experience is required.  Scripts can be written in any text editor and launched in any browser.  Everything is rendered client-side, without the need for any special software or server setup.

  [tab]One of the biggest hurdles in STEM is the lack of effective documentation.  Software teams can integrate Edge Case in their existing workflows by putting a folder in their private repositories.  Since everything is text based, it's easy to revise and easy to track changes using Git.

  [div id:'sampleWithIntro'][tab]Here is an example of an entire working script, from start to finish, in just 8 lines of code:

  [div id:'sample'][bq][eccode]
  rawScript += \`[*]~[card:'main']
      [*]Why don't you pick a door?

        ~[button cardlink:'door1'] Pick door #1 ~[/button]

        ~[button cardlink:'door2'][/b] Pick door #2 ~[/button]
      [/*]
    ~[/card]

    ~[card:'door1']You open door #1 and you win a prize.~[/card]

    ~[card:'door2']You open door #2 and win nothing.~[/card]\`;[/*]
  [/eccode][/bq][/div]

  [tab]Once you understand the basics, you can customize the content however you'd like.  But there's also a lot of room to grow if you'd like to add more advanced functionality.

  [button cardlink:'Demo-Sample']
    [label]Getting Started with Edge Case: Sample Project[/label]
    [js]hideLocalElement('sampleWithIntro');[/js]
  [/button]

  [button cardlink:'Blocks-Intro']Block Library[/button]

[/card]

[card:'Demo-Sample']
  [center][b][u]Getting Started with Edge Case: Sample Project[/u][/b][/center]

  Disclaimor: This version of the guide is for people who have previous programming experience, or who prefer to dive head first with hands-on learning.  In the future, we will create additional guides from people who are starting with no prior experience, and who need a more in-depth explanation.

  Once again, here is the sample project from the main page:

  [copy card:'main', id:'sample']

  Now, let's try to explain what this means.

  [button persist:true]
    [label]Introduction to Blocks[/label]
    [toggle][bq]
      Edge Case is an object-oriented markup languages, where the objects are referred to as "blocks," and the blocks are constructed via markup.  It's very similar to HTML, only with square brackets.  Content and functionality is added one block at a time, every block has a tag, and different tags do different things.

      Most blocks take the following form:

      [bq][eccode]~[tagname] content ~[/tagname][/eccode][/bq]

      When reading sample code, the brackets and the tag name will appear as [span class:'eccodetag']red[/span], [i]except[/i] in cases where the tag name is also a property (see next section below).

      The tag name is not case sensitive.  They are automatically converted to lowercase when read by the interpreter.

      In the project example, there are two types of blocks:  [span class:'eccodetag']~[card][/span] and [span class:'eccodetag']~[button][/span].  As with HTML, blocks can be nested within other blocks.  In this example, you have [span class:'eccodetag']~[button][/span] nested within a [span class:'eccodetag']~[card][/span]. There are also some blocks which are self-closing, meaning a single tag serves as both the beginning and end.
    [/bq][/toggle]
  [/button]

  [button persist:true]
    [label]Adding Block Properties[/label]
    [toggle][bq]
      In addition to the internal content between the opening and closing tag, you can also specify additional properties as key-value pairs in the opening tag.  When reading sample code, the properties will be be colored [span class:'eccodeproperty']green[/span].  This is similar to how attributes are used in HTML, though the formatting itself is based on JavaScript.  Property values are assigned with colons, and multiple properties must be separated by colons.

      The [span class:'eccodetag']~[card][/span] block and the [span class:'eccodetag']~[button][/span]  block both make use of properties.  However, it's important to notice some differences.

      [ul]
        [*][span class:'eccodeproperty']card[/span] is both the name of a tag, as well as the key to a property.[br][br]
        [*][span class:'eccodetag']button[/span] is the name of a tag, but not the name of a property[br][br]
        [*][span class:'eccodeproperty']cardlink[/span] is the name of a property, but not the name of a tag[br][br]
      [/ul]

      In many cases, properties will be strictly optional, and the parser will assume a default value if no value is specified.
    [/bq][/toggle]
  [/button]

  [button persist:true]
    [label]Creating Cards[/label]
    [toggle][bq]
      Cards are a special type of block, since they're the main containers for every other type of block.  A card  cannot be nested within any type of block, including another card.  They are equivalent to nodes in a flowchart or a graph, and the user navigates the project by moving from one card  to the next.

      The word "card" is both the name of the tag, as well as the name of a block property.  In this case, the block property "card" specifies a title.  Every card must contain a unique title, so that the software can properly navigate to it.  In this case, we have three different cards:

      [ul]
        [*][span class:'eccodeproperty']'main'[/span]
        [*][span class:'eccodeproperty']'door1'[/span]
        [*][span class:'eccodeproperty']'door2'[/span]
      [/ul]

      Cards titles are case sensitive.  Just like in many programming languages, the first card in any project should have the title "main".
    [/bq][/toggle]
  [/button]

  [button persist:true]
    [label]Creating Buttons[/label]
    [toggle][bq]
      Additional cards are useless if we have no way to navigate to them.  Buttons are another special type of block, which feature event handlers that activate upon being clicked.

      By default, the contents of the block will serve as the label.  Button blocks accept an optional [span class:'eccodeproperty']cardlink[/span] property, which specifies the title of the card being linked to.

      [ul]
        [*]In the sample project, the card [span class:'eccodeproperty']"main"[/span] includes two button blocks.
        [*]The first button includes a cardlink, which corresponds to the title [span class:'eccodeproperty']"door1"[/span]
        [*]The second button includes a cardlink, which corresponds to the title [span class:'eccodeproperty']"door2"[/span]
      [/ul]

      Of course, buttons can also be programmed to do a lot more than this.  For instance, on this page, you're already familiar with toggle.  In addition, buttons can be programmed to run JavaScript code upon being clicked.  Below is an example of a button that will show an alert.

      [bq][button][label]Click on me to show an alert.[/label][js]alert('You just clicked a button');[/js][/button][/bq]

      We will delve into these more advanced features in a later section.
    [/bq][/toggle]
  [/button]

  [button persist:true]
    [label]Loading the Files[/label]
    [toggle][bq]
      The Edge Case script is parsed entirely in client-side JavaScript, without the aid of a server.  Unfortunately, this prevents us from loading text directly from text files in the background, since most browsers specifically prevent this for security reasons.

      The workaround is to include the script text within the JavaScript files itself, by creating a command to load the script text into memory.  One of the first things Edge Case does is create an empty string variable called [b]"rawScript",[/b] which you can append your own text to using the "+=" symbol.  When the software is ready to launch, it loads the value of [b]"rawScript"[/b] into the parser.

      Appending text to rawScript can happen in a single file, or across many different files.  The specific order the files are loaded doesn't matter, because the card titled "main" will always be the first card presented to the user, regardless of when it was added to the project.  This means that you can organize your files however you want.  For instance, if you were making an RPG, you might have different files for different locations.

      The final thing to note is the use of backticks, which is the lowercase form of the tilda key above the "tab" button.  In JavaScript, strings can be wrapped in single quotes, double quotes, or backticks.  It's generally recommended you use backticks, since they are the least likely to cause a conflict.
    [/bq][/toggle]
  [/button]

  [button persist:true]
    [label]Style Guidelines for Formatting[/label]
    [toggle][bq]
    Here are two examples of how to format text in Edge Case:
    [bq]Example #1:
      [eccode]~[card:'main']~[button]~[label]This is a toggle~[/label]~[toggle]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin varius vulputate. Vivamus interdum tempor lectus nec interdum. Integer vehicula mollis ipsum ut dignissim. Curabitur sagittis arcu sed lectus sollicitudin, ac interdum est suscipit. Fusce pulvinar aliquet volutpat. Curabitur finibus maximus libero id sodales. Fusce elementum nulla mauris, a faucibus velit placerat et. Phasellus maximus dapibus orci in rhoncus.~[/toggle]~[/button]~[/card][/eccode]

      Example #2:
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
    [/bq]
    Which example is correct?  Technically, they both are.  As far as the parser is concerned, both examples are treated as identical.  However, to human eyes, the second example is a lot more readable.  Matching tags are lined up vertically, and the contents are indented, so you can clearly keep track of what goes where.  This is very important collaborative environments where other people will read your code.

    The easiest way to add indentation is to use a text editor specifically designed for writing code.  I personally use Atom.  Go to settings -> editor and check the box for "soft wrap."  To indent text, simply select the excerpt and hit "tab".  To move text back, select it again and hit "shift + tab".

    [button][label]Whitespace[/label]
      [toggle]
        The use of white space is important to make text readable, so that everything isn't clustered together.  Whitespace in Edge Case is relatively flexible, as long as you understand these three things:
        [ol]
          [*]More than 1 consecutive spaces will be ignored.
          [*]Single line breaks within a block are ignored
          [*]Two consecutive line breaks within a block will be treated as a new paragraph
        [/ol]

        Click below for examples of this in action.
        [bq][button][label]Multiple spaces[/label]
          [toggle]
            Script:[/br]
            [eccode]hello    &emsp;    &emsp;    &emsp;    &emsp; world![/eccode]

            Output:[/br]
            [div class:'grayback']hello                 world![/div]
          [/toggle]
        [/button]
        [button][label]Single line break[/label]
          [toggle]
            Script:[/br]
            [eccode]hello[br]world![/eccode]

            Output:[/br]
            [div class:'grayback']hello
            world![/div]
          [/toggle]
        [/button]
        [button][label]Double line break[/label]
          [toggle]
            Script:[/br]
            [eccode]hello[br][br]world![/eccode]

            Output:[/br]
            [div class:'grayback']hello

            world![/div]
          [/toggle]
        [/button][/bq]
      [/toggle]
    [/button]
    [button][label]Overriding the Parsing to Display Blocks as Text[/label]
      [toggle]
        By default, if the parser sees a valid tag name inside of brackets, it will attempt to parse it as a block.  But there's a problem.  Suppose I'm writing documentation of how tags work, and I want to present an example:

        [bq]
          Script:
          [eccode]The ~[b]~[/b] tag in Edge Case is equivalent to the ~<strong>~</strong> tag in HTML.  Wrap the ~[b]~[/b] tags around the word "text" to end up with "~[b]text~[/b]".  This creates a block, which makes the text ~[b]bold~[/b][/eccode]

          Output:
          [div class:'grayback']The [b][/b] tag in Edge Case is equivalent to the <strong></strong> tag in HTML. Wrap the [b][/b] tags around the word "text" to end up with "[b]text[/b]".  This creates a block, which makes the text [b]bold[/b][/div]
        [/bq]

        I wanted to explain how these tags work, but the parser assumed that I was creating a block, and so it processed them accordingly.  To override this, simply use the tilda symbol ("~") as an escape character before the left bracket, which will cause the parser to ignore it.  This also applies if you want to add native html.

        [bq]
          Script:
          [eccode]The ~~[b]~~[/b] tag in Edge Case is equivalent to the ~~<strong>~~</strong> tag in HTML.  Wrap the ~~[b]~~[/b] tags around the word "text" to end up with "~~[b]text~~[/b]".  This creates a block, which makes the text ~[b]bold~[/b][/eccode]

          Output:
          [div class:'grayback']The ~[b]~[/b] tag in Edge Case is equivalent to the ~<strong>~</strong> tag in HTML. Wrap the ~[b]~[/b] tags around the word "text" to end up with "~[b]text~[/b]".  This creates a block, which makes the text [b]bold[/b][/div]
        [/bq]
      [/toggle]
    [/button]
    [/bq][/toggle]
  [/button]

  [button cardlink:'Demo-main']Click here to see the demo project in action.[/button]
[/card]

[card:'Demo-main']
  Why don't you pick a door?

  [button cardlink:'Demo-door1'] Pick door #1[/button]

  [button cardlink:'Demo-door2'][/b] Pick door #2[/button]
[/card]

[card:'Demo-door1']You open door #1 and you win a prize.[/card]

[card:'Demo-door2']You open door #2 and win nothing.[/card]

`

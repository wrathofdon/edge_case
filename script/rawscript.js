rawScript += `
[card:'TODO']
Nothing here yet.  This is still a work in progress.

[card:'main']
[b][u]Introduction[/u][/b]

Welcome to [b]Edge Case[/b], a scripting engine for creating interactive works-in-progress, especially for the sake of learning.  By adopting a "choose your own adventure" style experience, students are encouraged to discover their own path towards education.

Scripts can be written in any text editor and launched in any web browser, with no special software or setup required.  The language is based on the user friendly bulletin board code designed for laypersons, with room for more advanced functionality.  It is easy to update and easy to track changes, which makes this an ideal tool for collaborations.

My goal was to create a tool to troubleshoot the learning process.  When a computer gets stuck on a problem, we usually blame the program for failing to account for the circumstance.  But when a human student gets stuck on a problem, there's a tendency to blame the student, and a resistance to take individual circumstance into account.  Under the edge case model, if a student is stuck for that the tutorial didn't account for, then that gets treated as a bug that needs to be fixed.

[button cardlink:'GettingStarted']
How does Edge Case Work?
[/button]
[/card]

[card:'GettingStarted']
[b][u]Getting Started with Edge Case[/u][/b]

All of the content for an Edge Case Project is broken down into three main levels:  Cards, Blocks, and Butons.

[b]Cards:[/b]

A card is the main container for content, and is basically equivalent to a single page on a website, or a single slide from a PowerPoint Presentation.  Currently, Edge Case only loads one card at a time, and all navigation happens by moving from one card to the next.  When a new card opens, the previous card is closed.

[b]Blocks[/b]

Content within a card can be further broken down into individual blocks.  A block is basically equivalent to an HTML node.  Different blocks use different tags for different instructions.  For instance, the "~[b]" tag makes text bold, the "~[i]" tag makes text italicized, and the "~[u]" tag makes text underlined.  The following example are three different blocks in the same line:

[bq]Input: [code]~[b]Bolded text~[/b] ~[i]italicized text~[/i] ~[u]underlined text~[/u][/code]

Output:[br] [b]Bolded text[/b] [i]italicized text[/i] [u]underlined text[/u][/bq]

Most block will feature both an opening tag and a closing tag, with additional content in between.  The inner content can have additional blocks on it's own.  You cannot store a card within a card, but you can store a block inside a block.

[b]Buttons[/b]

Finally, a button is a special type of block, which can be program to perform specific actions upon being clicked.  You can navigate to a new card, toggle display text, run native JavaScript code, etc.

[B]Loading the Project[/b]

The entire script for an Edge Case file is stored within a single string, but that single string can be stored across many different files.  Once loaded, the string is broken down into individual cards, and those cards are broken down into individual blocks.  These blocks are then converted into HTML upon being loaded.

[/card]



[card:'BlockProperties']dfds
[/card]
`

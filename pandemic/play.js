/*jshint esversion: 6 */

rawText += `

====project$Pandemic====
====namespace#Play====

===#Intro===

[b]On your turn:[/b]
Each player turn is divided into 3 parts:
[ol][*] 1. Do 4 actions.
[*] 2. Draw 2 Player cards.
[*] 3. Infect cities.[/ol]
After a player is done infecting cities, the player on their left goes next.
Players should freely give each other advice. Let everyone offer opinions and ideas. However, the player
whose turn it is decides what to do. Your hand can have City and Event cards in it.
City cards are used in some actions and Event cards can be played at any time.

++ Do 4 Actions -> #Actions
++ Draw 2 Player Cards -> #Draw
++ Infect cities -> $Obstacles.InfectCiies
++ Read Example -> #Example_1


===#Actions===
You may do up to 4 actions each turn.
Select any combination of the actions listed below. You may do the same action several times, each time counting as 1 action. Your role's special abilities may change how an action is done. Some actions involve discarding a card from your hand; all these discards go to the Player Discard Pile.
++ Movement Actions -> #Movement
++ Build a Research Station -> #Build
++ Treat Disease -> #Treat
++ Share Knowledge -> #Share
++ Discover a Cure -> #Cure
++ Special Actions Based on Role -> $Roles
++ Read Example -> #Example_1

===#Movement===
[b]Movement Actions:[/b]
[ul][*][b]Drive / Ferry[/b]: Move to a city connected by a white line to the one you are in.
[*][b]Direct Flight[/b]: Discard a City card to move to the city named on the card.
[*][b]Charter Flight[/b]: Discard the City card that matches the city you are in to move to any city.
[*][b]Shuttle Flight[/b]: Move from a city with a research station to any other city that has a research station[/ul]
[cite]$Roles@Operations[/cite]
[cite]$Roles@Dispatch[/cite]
[cite]$Roles@Medic[/cite]

===#Build===
[b]Build a Research Station[/b]
[ul][*]Discard the City card that matches the city you are in to place a research station there. [*]Take the research station from the pile next to the board.
[*]If all 6 research stations have been built, take a research station from anywhere on the board.
[*]If more than 6 research stations were supplied, set any extra aside during setup.[/ul]
[cite]$Roles@Operations[/cite]

===#Treat===
[b]Treat Disease[/b]
[ul][*]Remove 1 disease cube from the city you are in, placing it in the cube supply next to the board. If this disease color has been cured (see Discover a Cure below), remove all cubes of that color from the city you are in.
[*]If the last cube of a cured disease is removed from the board, this disease is eradicated. Flip its cure marker from its "vial" side to its "//" side.
[*]If there are cubes from several cured diseases in a city, you must still Treat Disease once for each cured color to remove these cubes.
[*]Eradicating a disease is not needed to win. However, when cities of an eradicated disease are infected, no new disease cubes are placed there (see Epidemics and Infections on page 6). Removing the last cube of a disease that is not cured has no effect.[/ul]
[cite]$Roles@Medic[/cite]

===#Share===
[b]Share Knowledge[/b]
You can do this action in two ways:
[ul][*] give the City card that matches the city you are in to another player
[*] or take the City card that matches the city you are in from another player.[/ul]
The other player must also be in the city with you. Both of you need to agree to do this.[br][br]
[i]Example: If you have the Moscow City card and are with another player in Moscow, you can give this card to that player. Or, if another player has the Moscow card and you both are in Moscow, then you can take it from that player. In either case, you both must agree before handing the card over[/i]
[cite]$Roles@Researcher[/cite]
++ Hand Size Limit (7 Cards) -> #Draw

===#Cure===
[b]Discover a Cure[/b]
At any research station, discard 5 City cards of the same color from your hand to cure the disease of that color. Move the disease's cure marker to its Cure Indicator.
If no cubes of this color are on the board, this disease is now eradicated. Flip its cure marker from its "vial" side to its "//" side.
When a disease is cured, its cubes remain on the board and new cubes can still be placed during epidemics or infections (see Epidemics and Infections on page 6). However, treating this disease is now easier and you are closer to winning.
[cite]$Roles@Scientist[/cite]

===#Example_1===
[b]Play Example #1: On the first turn, Ben does 4 actions:[/b]
[ol][*] Drive to Chicago (from Atlanta)
[*] Drive to San Francisco,
[*] Treat Disease in San Francisco, removing a blue disease cube there, and
[*]Treat Disease in San Francisco again, removing a second blue disease cube.[/ol]
Ben has finished the Actions part of his turn

===#Draw===
After doing 4 actions, draw the top 2 cards together from the Player Deck.
[b]If, as you are about to draw, there are fewer than 2 cards left in the Player Deck, the game ends and your team has lost! (Do not reshuffle the discards to form a new deck.)[/b]
==@Limit==
If you ever have more than 7 cards in hand (after first resolving any Epidemic cards you may have drawn), discard cards or play Event cards until you have 7 cards in hand (see Event Cards on page 7).[br][br]Only Player cards count towards your hand limit. Your Role and your Reference cards are not part of your hand.
++ Epidemic Cards -> $Obstacles.EpidemicCards

===#NotYourTurn===
[b]Things you can do on another players turn:[/b][br][br]
Players are encouraged to discuss strategy throughout the game.
++ Event Cards -> #EvantCards
++ Gather_Info -> #Gather_Info

===#EvantCards===
[b]EVENT CARDS[/b]'
During a turn, any player may play Event cards. [b]Playing an Event card is not an action.[/b] The player who plays an
Event card decides how it is used.
Event cards can be played at any time, except in between drawing and resolving a card.
[b]When 2 Epidemic cards are drawn together, events can be played after resolving the first epidemic.[/b]
Example: During infections, the first Infection card drawn causes an outbreak. You may not play the Airlift Event card to move the Quarantine Specialist to prevent this. After this outbreak happens however, you may use Airlift to move the Quarantine Specialist (to possibly protect other cities) before flipping over the next Infection card.
After playing an Event card, discard it to the Player Discard Pile.

===#Gather_Info===
[b]Gathering Information:[/b]
When playing the Introductory game (4 Epidemic cards), place your cards face up in front of you, for all players to see.
When playing the Standard (5 Epidemics) or Heroic (6 Epidemics) games, keep your cards private, so everyone has information to contribute to play discussions.
Players may freely examine either discard pile at any time.

`;
/*jshint esversion: 6 */

rawText += `

====project$Pandemic====
====namespace#Obstacles====

===#Intro===

Here are a list of the things that can go wrong.

++ Lose Conditions -> $Intro.Overview
++ Epidemic Cards -> #EpidemicCards
++ Infections -> #InfectCiies

===#EpidemicCards===
If your draws include any Epidemic cards, immediately do the following steps in order:
[toggle=[b]1. Increase[/b]]Move the infection rate marker forward 1 space on the Infection Rate Track.[/toggle]
[toggle=[b]2. Infect[/b]]Draw the bottom card from the Infection Deck. Unless its disease color has been eradicated, put 3 disease cubes of that color on the named city.[br]br]If the city already has cubes of this color, do not add 3 cubes to it. Instead, add just enough cubes so that it has 3 cubes of this color and then an outbreak of this disease occurs in the city (see Outbreaks below). Discard this card to the Infection Discard Pile.[/toggle]
[toggle=[b]3. Intensify[/b]]Reshuffle just the cards in the Infection Discard Pile and place them on top of the Infection Deck.[br][br]
When doing these steps, remember to draw from the bottom of the Infection Deck and to then reshuffle only the Infection Discard Pile, placing it on top of the existing Infection Deck.[/toggle]
[toggle=[b]After resolving[/b]]After resolving any Epidemic cards, remove them from the game.[br][br]
Do not draw replacement cards for them.[/toggle]
++ Not Enough Cubes? -> #NoCubes
++ Outbreaks -> 
++ Drawing Two Epidemic Cards -> #2EpidemicCards

====#NoCubes===
If you cannot place the number of cubes actually needed on the board, because there are not enough cubes of the needed color left in the supply, the game ends and your team has lost! This can occur during an epidemic, an outbreak, or
infections (see Outbreaks and Infections below).
+ Outbreak Rules -> Outbreak
+ Infection Rules -> Infection

===#2EpidemicCards===
[b]Drawing two epidemic cards:[/b]
It is rare but possible to draw 2 Epidemic cards at once. In this case, do all three steps above once and then again.


===#InfectCiies===
[b]INFECTIONS[/b]
Flip over as many Infection cards from the top of the Infection Deck as the current infection rate. This number is below the space of the Infection Rate Track that has the infection rate marker.
Flip these cards over one at a time, infecting the city named on each card.
To infect a city, place 1 disease cube matching its color onto the city, unless this disease has been eradicated. If the city already has 3 cubes of this color, do not place a 4th cube. Instead, an outbreak of this disease occurs in the city (see Outbreaks below). Discard this card to the Infection Discard Pile.
++ Outbreak Rules -> #Outbreak
++ Read Example -> #Example

===#Example===
Anna draws 2 cards. Neither is an Epidemic card and Anna is well under her 7-card hand limit, so Anna continues her turn.
Anna ends her turn by infecting cities. The current infection rate is 3, so Anna flips over the top 3 Infection cards: Seoul, then Paris, then Algiers.
The red disease is eradicated, so Anna simply discards the Seoul card. Paris has a blue cube on it, so Anna adds a second blue cube there and discards the Paris card.
The black disease has been cured — but not eradicated (black cubes are still on the board) — so Anna must infect Algiers. Since 3 black disease cubes are already in Algiers, Anna does not place a 4th cube there.
Instead, a black disease outbreak happens in Algiers.

===#Outbreak===
When a disease outbreak occurs, move the outbreaks marker forward 1 space on the Outbreaks Track. Then, place 1 cube of the disease color on every city connected to the city. If any of them already has 3 cubes of the disease color, do not place a 4th cube in those cities. Instead, in each of them, a chain reaction outbreak occurs after the current outbreak is done.
When a chain reaction outbreak occurs, first move the outbreaks marker forward 1 space. Then, place cubes as above, except [b]do not add a cube to cities that have already had an outbreak[/b] (or a chain reaction outbreak) as part of resolving the current Infection card.
As a result of outbreaks, a city may have disease cubes of multiple colors on it; up to 3 cubes of each color.
[b]If the outbreaks marker reaches the last space of the Outbreaks Track, the game ends and your team has lost![/b]
[cite]$Roles@Quarantine[/cite]
+ There are not enough cubes -> #NoCubes
+ Read Example -> #Outbreak_Example

===#Outbreak_Example===
Play Example (cont.): A black disease outbreak occurs in Algiers. Anna moves the outbreaks marker forward 1 space and places 1 black cube on every city connected to Algiers: Madrid, Paris, Istanbul, and Cairo. Cairo already has 3 black
cubes, so Anna does not place a 4th cube there.
Instead, a chain reaction outbreak occurs in Cairo. Anna moves the outbreaks marker forward 1 more space. She places 1 black cube on every city connected to Cairo — Istanbul, Baghdad, Riyadh, and Khartoum — but not Algiers, as Algiers has already had an outbreak while resolving this Infection card. Then, Anna discards the Algiers Infection card.


`;
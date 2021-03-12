# Chess

Chess is one of the oldest games around and is thought to have been brought to the western world from India via Persia in the 7th century. Back then it was known as Chaturanga, had a few different pieces, but the same principles remain with only a few minor changes being implemented in recent years. Nowadays chess is played in every country with Russia having the most grandmasters.

# Here are some screenshots of my game:

![screenshot 1](/media/screenshots/screenshot-1.png)
![screenshot 2](/media/screenshots/screenshot-2.png)
![screenshot 3](/media/screenshots/screenshot-3.png)
![screenshot 4](/media/screenshots/screenshot-4.png)

## Technologies used:

1. HTML
2. CSS
3. JavaScript

# A Few Rules...

## generics:
* If any piece of the player finishes their move on the same square as a piece of the opposing colour, then the opponent's piee is removed from th game, and the player's piece claims that square.
* A player's piece may not take the place of any of their own pieces.

## Pawns:
* Pawns move one square directly in front of them per turn.
* They can take an opposing piece that is either directly diagonally to the right or directly diagonally to the left.
* If they reach the other side of the board, they will be 'promoted' to a queen.

## Bishops:
* Bishops can move in all 4 directions diagonally like an X.
* As long as their paths are unobstructed, bishops move multiple squares in one turn.
* Bishops cannot 'jump' over pieces.

## Knights:
* Knights move in an L shape.
  * Imagine you draw an L with the squares on the board.
  * 2 squares away from the knight makes the stem of the L
  * One square on either side of the stem finishes the knights move.
* Knights can 'jump' over any piece on the board.

## Rooks:
* Rooks can move in all 4 directions up and down like a +.
* As long as their paths are unobstructed, rooks move multiple squares in one turn.
* Rooks cannot 'jump' over pieces.

## Queens:
* Queens can move as though a bishop and a rook combined.
* She is the most powerful piece on the board, use her well.

## Kings:
* Kings can move in any direction at all but only one square at a time.
* Kings are invaluable. If you lose him, you lose the game, so take care of him.

## Castleing:

Castling is when both the king and either rook can move in the same turn to 'swap' places The rules are as follows:

1. The King and Rook may not have moved from their starting squares
2. All spaces between the King and Rook must be empty
3. The King cannot be in Check
4. The squares the King will pass over may not be under attack, nor can the square on which the King will land


## Icebox Items...

* En-Passant
* Stalemate logic
* If a player is in check, inform them!

## As convention states, white plays first. Click any piece to [start the game](https://jackhr.github.io/chess-project). The first person to take their opponent's king will be crowned victor! Good luck...

# wireframe & Pseudocode:

![Wireframe](/media/screenshots/wireframe.jpg)

# Pseudocode!

1. Define required constants:
	1. Define a player lookup object with keys of ‘null’, when the square is unoccupied, ‘1’ for when it is occupied by white, and ‘-1’ when it occupied by black.
	2. Define possible boards, pieces, and other descriptive data.
	3. Define a piece lookup that contains data about piece movement.

2. Define required variables used to track the state of the game:
	1. Use an array of arrays to represent the board squares.
	2. Use a turn variable to remember whose turn it is.
	3. Use a winner variable which represents a stalemate, or which player has won, or even a game in progress (null).
	4. use an array to represent the most recent white pieces to taken progressively pushed onto that array.
	5. use an array to represent the most recent black pieces to taken progressively pushed onto that array.
	6. use an orientation variable to represent the orientation of the board for white’s turn and black’s turn.

3. Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
	1. Store the 64 elements that represent the squares on the board.
	2. Store the message section which will display various messages for the winner, loser, cat’s game, choose board etc...
	3. Store the replay button in the event that a player wants to play some more chess!
	4. Store the board itself to use for the main click event when moving pieces.

4. Upon loading the app should:
	1. Initialise the state variables:
		1. Initialise the board array to 32 nulls to represent the empty middle section of the board and two ranks initialised with ‘1’ to represent white, and on the opposite end of the board initialise 2 ranks with ‘-1’ to represent black.
		2. Initialise whose turn it is, although white moves first.
		3. Initialise the winner to null to represent there is no winner or stalemate yet. Winner will hold a value of ‘1’ or ‘-1’ to represent white or black respectively, and ’T’ to represent a stalemate.
		4. Initialise both black and white’s taken-pieces array to null to represent empty containment areas.
		5. Initialise the orientation variable as ‘1’ to represent the board facing towards the player who is using the white pieces. The variable can hold the value of ‘1’ or ‘-1’.
	2. Render those state variables to the page:
		1. Render the board:
			1. Loop through all 64 squares on the page, and for each iteration:
				1. Use the index of the iteration to access the mapped value from the board array.
				2. Style the current square’s backgroundImg to a value accessed from within the playerLookup constant.
		2. Render a Message:
			1. If winner is equal to ’T’, render a stalemate message.
			2. If winner is equal to either ‘1’ or ‘-1’, render a winner message.
			3. Otherwise, winner must be equal to null, so render whose turn it is. 
	3. Wait for user to click a square.

5. Handle a player selecting which board to use during gameplay:
	1. Obtain the index of the selected board that was clicked by either:
		1. Extracting the index from an id assigned to the element in the DOM
		2. Looping through the the cached board elements and breaking out when the current square element equals the event object’s target.
	2. Obtain the value of the selected board at that index.
	3. Use that value to select the correct image source via the board lookup.
	4. Set the value obtained via the board lookup as the url to set the background image for the main section of the DOM in order the represent the chosen board colours.
	
6. Handle a player’s first click (selecting a piece to move):
	1. Obtain the index of the square that was clicked by either:
		1. Extracting the index from an id assigned to the element in the DOM
		2. Looping through the the cached square elements and breaking out when the current square element equals the event object’s target.
	2. Obtain the value of the square at that index.
	3. If the value at that square is !NOT equal to the positive or negative (black or white) |OR| winner is a truthy value, immediately return out of the function.
  4. Else, Assign the index as a value to a variable for use in the second click event.
	5. Determine which squares to which the player can move their selected piece via a move function by accessing data within the player lookup, and highlight them.
	6. Assign the indexes of the highlighted squares to an array for use in the second click event.

7. Handle a player’s second click (moving the selected piece):
	1. Obtain the index of the square that was clicked by either:
		1. Extracting the index from an id assigned to the element in the DOM
		2. Looping through the the cached square elements and breaking out when the current square element equals the event object’s target.
	2. If the index of that square is equal to the index identified int he first click event:
		1. Reinitialise the highlighted squares to a value of null and empty the indexes array for the next pass of the first click event.
		2. Return
	3. Else if the index of the square is !NOT equal to the index identified in the first click event &AND& the value of the square is equal to turn:
		1. Immediately return out of the function.
	4. Else if the value is equal to null &AND& is equal to any of the values in the index array created in the first click event then:
		1. Update the board array at the index which was most recently occupied (where the piece was moved from) back to null to represent a now empty square. 
		2. Update the event target to hold the value of the piece that just moved.
		3. Reinitialise the highlighted squares to a value of null and empty the indexes array for the next pass of the first click event.
	5. Else if the value is equal to turn * -1 &AND& the value is equal to any of the values in the index array created in the first click event then:
		1. Update the board array at the index which was most recently occupied (where the piece was moved from) back to null to represent a now empty square.
		2. Push the value of the event target to be placed into either white’s or black’s taken pieces array.
		3. Update the event target to hold the value of the piece that just moved.
		4. Reinitialise the highlighted squares to a value of null and empty the indexes array for the next pass of the first click event.
	6. Change the turn variable by multiplying turn by -1.
	7. Set the winner if there is a winner:
		1. If the opponents king is unable to move &AND& it is being attacked:
			1. Set winner = turn * -1
		2. Else if none of the opponent’s pieces are able to move |OR| checkmate is unattainable:
			1. Set winner = ’T’
	8. Render the board since all state has been updated.
	
8. Handle a player clicking the replay button:
	1. Do step 4 to reinitialise the board and state variables, and render.







Check state variable for selected piece variable set to null so when first click nd null, then piece is selected, but if not null then time to bust a move






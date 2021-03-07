/*----- constants -----*/
const playerLookup = {
  '-1': {
    imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
    // move: pawnMove()
    // value: 1,
  },
  '-2': {
    imgURL: "url('media/chess-piece-sprites/b-pieces/b-bishop.svg')",
    // move: bishopMove()
    // value: 3,
  },
  '-3': {
    imgURL: "url('media/chess-piece-sprites/b-pieces/b-knight.svg')",
    // move: knightMove()
    // value: 3,
  },
  '-4': {
    imgURL: "url('media/chess-piece-sprites/b-pieces/b-rook.svg')",
    // move: rookMove()
    // value: 5,
  },
  '-5': {
    imgURL: "url('media/chess-piece-sprites/b-pieces/b-queen.svg')",
    // move: queenMove()
    // value: 9,
  },
  '-6': {
    imgURL: "url('media/chess-piece-sprites/b-pieces/b-king.svg')",
    // move: kingMove()
    // value: 50,
  },
  '1': {
    imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
    // move: pawnMove()
    // value: 1,
  },
  '2': {
    imgURL: "url('media/chess-piece-sprites/w-pieces/w-bishop.svg')",
    // move: bishopMove()
    // value: 3,
  },
  '3': {
    imgURL: "url('media/chess-piece-sprites/w-pieces/w-knight.svg')",
    // move: knightMove()
    // value: 3,
  },
  '4': {
    imgURL: "url('media/chess-piece-sprites/w-pieces/w-rook.svg')",
    // move: rookMove()
    // value: 5,
  },
  '5': {
    imgURL: "url('media/chess-piece-sprites/w-pieces/w-queen.svg')",
    // move: queenMove()
    // value: 9,
  },
  '6': {
    imgURL: "url('media/chess-piece-sprites/w-pieces/w-king.svg')",
    // move: kingMove()
    // value: 50,
  },
  'null': {
    imgURL: "url('')"
  }
};
const boardMoveLookup = {
  '-1': {

  },
  '-2': {

  },
  '-3': {

  },
  '-4': {

  },
  '-5': {

  },
  '-6': {

  },
  '1': {

  },
  '2': {

  },
  '3': {

  },
  '4': {

  },
  '5': {

  },
  '6': {

  },
  
};

/*----- app's state (variables) -----*/
let board, winner, turn, pieceIdx, boardWidth, clickCounter, selectedDiv, placementDiv, legalMoves;

/*
icebox
let takenPiecesBlack, takenPiecesWhite, boardOrientation, boardChoice;
*/

/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const squareEls = [...document.querySelectorAll('#board div')];
const msgEl = document.getElementById('message-section');
const replayBtn = document.querySelector('button');

/*
icebox
const bTakenPiecesEl = document.getElementById('w-taken-pieces');
const wTakenPiecesEl = document.getElementById('w-taken-pieces');
*/
/*----- event listeners -----*/
boardEl.addEventListener('click', handlePieceSelection);
boardEl.addEventListener('click', handlePiecePlacement);
replayBtn.addEventListener('click', init);
/*
msgEl.assEventListener('click', handleBoardChoice)
*/

/*----- functions -----*/
function init() {
  board = [
    6, 6, 6, -1, null, null, 2, 6,
    6, 6, 1, null, null, 1, 6, null,
    null, 1, 6, null, 6, null, 1, null,
    null, null, null, null, -6, -6, null, 6,
    6, null, null, -6, null, null, 6, -6,
    null, 1, null, null, null, null, 1, null,
    6, 6, 1, null, null, 1, 6, null,
    6, null, null, -1, null, null, null, 6
  ];
  // Not sure whether or not to either have the board tracking the player or different pieces set to different values or even one kind of piece to one value whether it's black or white.
  pieceIdx = null;
  turn = 1;
  winner = null;
  render();
}

init();
function render() {
  board.forEach(function(squareValue, boardIdx) {
    const square = document.getElementById(`sq${boardIdx}`);
    square.style.backgroundImage = playerLookup[squareValue]['imgURL'];
    square.style.backgroundSize = 'cover';
  });
  if (winner === 'T') {
    msgEl.textContent = "it's a tie!";
  } else if (winner < 0) {
    msgEl.textContent = "Black wins!";
  } else if (winner > 0) {
    msgEl.textContent = "White wins!";
  }
  // msgEl.style.visibility = winner ? 'visible' : 'hidden'; //change this logic
  replayBtn.style.visibility = winner ? 'visible' : 'hidden';
  clickCounter = -2;
  legalMoves = [];
  boardWidth = 8;
}

function handlePieceSelection(evt) {
  if (clickCounter > -1) return;
  clickCounter++;
  selectedDiv = evt.target;
  let selectedIdx = squareEls.indexOf(selectedDiv);
  let pieceValue = board[selectedIdx];
  // console.log(piece)
  if ((pieceValue > 0 && turn < 0) || (pieceValue < 0 && turn > 0) || pieceValue === null || winner) return;
  pieceIdx = selectedIdx;
  // console.log(`the div ID = #${selectedDiv.id}, pieceIdx = ${pieceIdx}`);
  selectedDiv.style.transform = 'scale(1.35)';
  selectedDiv.style.transition = 'all 0.05s ease-in';
  /*
  icebox
  play a sound when selecting the piece.
  */
  if (Math.abs(pieceValue) === 1) whitePawnMove(pieceIdx);
  if (Math.abs(pieceValue) === 2) whiteBishopMove(pieceIdx);
  if (Math.abs(pieceValue) === 3) whiteKnightMove(pieceIdx);
  if (Math.abs(pieceValue) === 4) whiteRookMove(pieceIdx);
  if (Math.abs(pieceValue) === 5) whiteQueenMove(pieceIdx);
  if (Math.abs(pieceValue) === 6) whiteKingMove(pieceIdx);
  console.log(legalMoves);
  // highlightMoves(pieceIdx);
  // These functions should return an array of possible moves that I can itterate through and if the index is -1, it's an illegal move.
}

function handlePiecePlacement(evt) {
  clickCounter++;
  if (clickCounter < 1) return;
  placementDiv = evt.target;
  let selectedIdx = squareEls.indexOf(placementDiv);
  let pieceValue = board[selectedIdx];
  if (selectedDiv === placementDiv) {
    placementDiv.style.transform = 'scale(1)';
    placementDiv.style.transition = 'all 0.05s ease-in';
    render();
  }
  // console.log('hey!')
  if ((pieceValue > 0 && turn > 0) || (pieceValue < 0 && turn < 0)) return;
  // console.log('hey!')
  // inCheck()
  // winner = getWinner();
  // turn *= -1;
  // render();
}
/*
function highlightMoves(piece) {
  let pieceValue = board[piece];
  if (Math.abs(pieceValue) === 1) {
    pawnMove();
    // console.log(pieceValue);
  } else if (Math.abs(pieceValue) === 2) {
    bishopMove();
    // console.log(pieceValue);
  } else if (Math.abs(pieceValue) === 3) {
    knightMove();
    // console.log(pieceValue);
  } else if (Math.abs(pieceValue) === 4) {
    rookMove();
    // console.log(pieceValue);
  } else if (Math.abs(pieceValue) === 5) {
    queenMove();
    // console.log(pieceValue);
  } else if (Math.abs(pieceValue) === 6) {
    kingMove();
    // console.log(pieceValue);
  } else {return}
}

*/


function whitePawnMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let modal = pieceIdx % boardWidth;
  if (board[squareAbove] === null) {
    legalMoves.push(squareAbove);
  };
  if (modal === 7 || board[squareAbove + 1] > 0) {
  } else if (board[squareAbove + 1] !== null) {
    legalMoves.push(squareAbove + 1);
  };
  if (modal === 0 || board[squareAbove - 1] > 0) {
  } else if (board[squareAbove - 1] !== null) {
    legalMoves.push(squareAbove - 1);
  };
  // console.log(legalMoves);
}

function whiteBishopMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let squareBelow = pieceIdx + boardWidth;
  let modal = pieceIdx % boardWidth;
  let right = 1;
  let left = 1;
  let up = boardWidth;
  let down = boardWidth;
  let rUDiag = squareAbove + right;
  let lUDiag = squareAbove - left;
  let rDDiag = squareBelow + right;
  let lDDiag = squareBelow - left; //Maybe I don't need the "board[rUDiag] < 0" at all
    while (board[rUDiag] === null || board[rUDiag] < 0) {
      if (modal === 7) break;
      legalMoves.push(rUDiag);
      if (board[rUDiag] < 0 || (rUDiag % boardWidth) === 7) break;
      right++;
      up += boardWidth;
      rUDiag = pieceIdx - up + right;
    }
    up = boardWidth;
    right = 1;
    while (board[rDDiag] === null || board[rDDiag] < 0) {
      if (modal === 7) break;
      legalMoves.push(rDDiag);
      if (board[rDDiag] < 0 || (rDDiag % boardWidth) === 7) break;
      right++;
      down += boardWidth;
      rDDiag = pieceIdx + down + right;
    }
    down = boardWidth;
    right = 1;
    while (board[lUDiag] === null || board[lUDiag] < 0) {
      if (modal === 0) break;
      legalMoves.push(lUDiag);
      if (board[lUDiag] < 0 || (lUDiag % boardWidth) === 0) break;
      left++;
      up += boardWidth;
      lUDiag = pieceIdx - up - left;
    }
    up = boardWidth;
    left = 1;
    while (board[lDDiag] === null || board[lDDiag] < 0) {
      if (modal === 0) break;
      legalMoves.push(lDDiag);
      if (board[lDDiag] < 0 || (lDDiag % boardWidth) === 0) break;
      left++;
      down += boardWidth;
      lDDiag = pieceIdx + down - left;
    }
  // console.log(legalMoves);
}

function whiteKnightMove(pieceIdx) {
  let height = boardWidth * 2;
  let up = pieceIdx - height;
  let right = pieceIdx + 2;
  let down = pieceIdx + height;
  let left = pieceIdx - 2;
  let modal = pieceIdx % boardWidth;
  console.log(modal);
  if (pieceIdx < 16 && modal >= 0) {
  } else {
    if (board[up - 1] < 0 || board[up - 1] === null) {
      if (pieceIdx === 56) {  
      } else {
      legalMoves.push(up - 1);
      }
    }
    if (board[up + 1] < 0 || board[up + 1] === null) {
      if (pieceIdx === 63) {
      } else {
        legalMoves.push(up + 1);
      }
    }
  }
  if (modal > 5) {
  } else {
    if (board[right - boardWidth] < 0 || board[right - boardWidth] === null) {
      legalMoves.push(right - boardWidth);
    }
    if (board[right + boardWidth] < 0 || board[right + boardWidth] === null) {
      legalMoves.push(right + boardWidth);
    }
  }
  if (pieceIdx > 47 && modal >= 0) {
  } else {
    if (board[down + 1] < 0 || board[down + 1] === null) {
      if (pieceIdx === 7) {
      } else {
        legalMoves.push(down + 1);
      }
    }
    if (board[down - 1] < 0 || board[down - 1] === null) {
      if (pieceIdx === 0) {
      } else {
        legalMoves.push(down - 1);
      }
    }
  }
  if (modal < 2) {
  } else {
    if (board[left + boardWidth] < 0 || board[left + boardWidth] === null) {
      legalMoves.push(left + boardWidth);
    }
    console.log(modal)
    if (board[left - boardWidth] < 0 || board[left - boardWidth] === null) {
      legalMoves.push(left - boardWidth);
    }
  }
  // console.log(legalMoves)  
}

function whiteRookMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let squareBelow = pieceIdx + boardWidth;
  let modal = pieceIdx % boardWidth;
  let right = 1;
  let left = 1;
  while (board[squareAbove] === null || board[squareAbove] < 0) {
    legalMoves.push(squareAbove);
    if (board[squareAbove] < 0) break;
    squareAbove -= boardWidth;
  }
  while (board[pieceIdx + right] === null || board[pieceIdx + right] < 0) {
    if (modal === 7) break;
    legalMoves.push(pieceIdx + right);
    if ((pieceIdx + right) % boardWidth === 7 || board[pieceIdx + right] < 0) break;
    right++;
  }
  while (board[squareBelow] === null || board[squareBelow] < 0) {
    legalMoves.push(squareBelow);
    if (board[squareBelow] < 0) break;
    squareBelow += boardWidth;
  }
  while (board[pieceIdx - left] === null || board[pieceIdx - left] < 0) {
    if (modal === 0) break;
    legalMoves.push(pieceIdx - left);
    if ((pieceIdx - left) % boardWidth === 0 || board[pieceIdx - left] < 0) break;
    left++;
  }
  // console.log(legalMoves);
}

function whiteQueenMove(pieceIdx) {
  whiteBishopMove(pieceIdx);
  whiteRookMove(pieceIdx);
}

function whiteKingMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let squareBelow = pieceIdx + boardWidth;
  let modal = pieceIdx % boardWidth;
  console.log(pieceIdx)
  if (pieceIdx < 8) {
  } else if (board[squareAbove] === null || board[squareAbove] < 0) {
      legalMoves.push(squareAbove);
    }
  if (modal === 7) { 
  } else {
    if (board[squareAbove + 1] === null || board[squareAbove + 1] < 0) {
      legalMoves.push(squareAbove + 1);
    }
    if (board[pieceIdx + 1] === null || board[pieceIdx + 1] < 0) {
      legalMoves.push(pieceIdx + 1);
    }
    if (board[squareBelow + 1] === null || board[squareBelow + 1] < 0) {
      legalMoves.push(squareBelow + 1);
    }
  }
  if (pieceIdx > 55) {
  } else if (board[squareBelow] === null || board[squareBelow] < 0) {
    legalMoves.push(squareBelow);
  }
  if (modal === 0) {
  } else {
    if (board[squareBelow - 1] === null || board[squareBelow - 1] < 0) {
      legalMoves.push(squareBelow - 1);
    }
    if (board[pieceIdx - 1] === null || board[pieceIdx - 1] < 0) {
      legalMoves.push(pieceIdx - 1);
    }
    if (board[squareAbove - 1] === null || board[squareAbove - 1] < 0) {
      legalMoves.push(squareAbove - 1);
    }
  }
}

function blackPawnMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let modal = pieceIdx % boardWidth;
  if (board[squareAbove] === null) {
    legalMoves.push(squareAbove);
  };
  if (modal === 7 || board[squareAbove + 1] > 0) {
  } else if (board[squareAbove + 1] !== null) {
    legalMoves.push(squareAbove + 1);
  };
  if (modal === 0 || board[squareAbove - 1] > 0) {
  } else if (board[squareAbove - 1] !== null) {
    legalMoves.push(squareAbove - 1);
  };
}

function blackBishopMove() {
  // if (Math.abs(pieceIdx) === 2) return;
  
}

function blackKnightMove() {
  // if (Math.abs(pieceIdx) === 3) return;
  
}

function blackRookMove() {
  // if (Math.abs(pieceIdx) === 4) return;
  
}

function blackQueenMove() {
  // if (Math.abs(pieceIdx) === 5) return;
  
}

function blackKingMove() {
  // if (Math.abs(pieceIdx) === 6) return;

}

function getWinner() {

}
 
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
    -4, -3, -2, -5, -6, -2, -3, -4,
    -1, -1, -1, -1, -1, -1, -1, -1,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, 2, null, null, null,
    null, null, null, null, null, null, null, null,
    1, 1, 1, 1, 1, 1, 1, 1,
    4, 3, 2, 5, 6, null, 3, 4
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
  console.log(legalMoves)
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
  let lDDiag = squareBelow - left;
  while (board[rUDiag] === null) {
    legalMoves.push(rUDiag);
    right++;
    up += boardWidth;
    rUDiag = pieceIdx - up + right;
  }
  up = boardWidth;
  right = 1;
  while (board[lUDiag] === null) {
    legalMoves.push(lUDiag);
    left++;
    up += boardWidth;
    lUDiag = pieceIdx - up - left;
  }
  up = boardWidth;
  left = 1;
  while (board[rDDiag] === null) {
    legalMoves.push(rDDiag);
    right++;
    down += boardWidth;
    rDDiag = pieceIdx + down + right;
  }
  down = boardWidth;
  right = 1;
  while (board[lDDiag] === null) {
    legalMoves.push(lDDiag);
    left++;
    down += boardWidth;
    lDDiag = pieceIdx + down - left;
  }
  console.log(legalMoves)
  
}

function whiteKnightMove() {
  // if (Math.abs(pieceIdx) === 3) return;
  
}

function WhiteRookMove() {
  // if (Math.abs(pieceIdx) === 4) return;
  
}

function WhiteQueenMove() {
  // if (Math.abs(pieceIdx) === 5) return;
  
}

function WhiteKingMove() {
  // if (Math.abs(pieceIdx) === 6) return;

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
 
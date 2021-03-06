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
}
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
  
}

/*----- app's state (variables) -----*/
let board, winner, turn, pieceIdx, boardWidth;

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
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    1, 1, 1, 1, 1, 1, 1, 1,
    4, 3, 2, 5, 6, 2, 3, 4
  ];
  // Not sure whether or not to either have the board tracking the player or different pieces set to different values or even one kind of piece to one value whether it's black or white.
  boardWidth = 8;
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
}

function handlePieceSelection(evt) {
  let div = evt.target;
  let idx = squareEls.indexOf(div);
  let piece = board[idx];
  // console.log(piece)
  if ((piece > 0 && turn < 0) || (piece < 0 && turn > 0) || piece === null || winner) return;
  pieceIdx = idx;
  console.log(piece)
  /*
  icebox
  div.style.transform = 'scale(1.1)';
  div.style.transition = 'all 0.05s ease-in';
  play a sound when selecting the piece.
  */
  highlightMoves(pieceIdx);
}

function handlePiecePlacement(evt) {

  // inCheck()
  // winner = getWinner();
  // turn *= -1;
  // render();
}

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

function pawnMove() {

}
 
function bishopMove() {

}
 
function knightMove() {

}
 
function rookMove() {

}
 
function queenMove() {

}
 
function kingMove() {

}

function getWinner() {

}
 
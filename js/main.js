/*----- constants -----*/
const playerLookup = {
  b: {
    '-1': {
      imgURL: "url('../media/chess-piece-sprites/b-pieces/b-pawn')",
      move: pawnMove()
      // value: 1,
    },
    '-2': {
      imgURL: "url('../media/chess-piece-sprites/b-pieces/b-bishop')",
      move: bishopMove()
      // value: 3,
    },
    '-3': {
      imgURL: "url('../media/chess-piece-sprites/b-pieces/b-knight')",
      move: knightMove()
      // value: 3,
    },
    '-4': {
      imgURL: "url('../media/chess-piece-sprites/b-pieces/b-rook')",
      move: rookMove()
      // value: 5,
    },
    '-5': {
      imgURL: "url('../media/chess-piece-sprites/b-pieces/b-queen')",
      move: queenMove()
      // value: 9,
    },
    '-6': {
      imgURL: "url('../media/chess-piece-sprites/b-pieces/b-king')",
      move: kingMove()
      // value: 50,
    }
  },
  w: {
    '1': {
      '1': "url('../media/chess-piece-sprites/w-pieces/w-pawn')",
      move: pawnMove()
      // value: 1,
    },
    '2': {
      imgURL: "url('../media/chess-piece-sprites/w-pieces/w-bishop')",
      move: bishopMove()
      // value: 3,
    },
    '3': {
      imgURL: "url('../media/chess-piece-sprites/w-pieces/w-knight')",
      move: knightMove()
      // value: 3,
    },
    '4': {
      imgURL: "url('../media/chess-piece-sprites/w-pieces/w-rook')",
      move: rookMove()
      // value: 5,
    },
    '5': {
      imgURL: "url('../media/chess-piece-sprites/w-pieces/w-queen')",
      move: queenMove()
      // value: 9,
    },
    '6': {
      imgURL: "url('../media/chess-piece-sprites/w-pieces/w-king')",
      move: kingMove()
      // value: 50,
    }
  },
  'null': {
    imgURL: "url('')"
  }
}

/*----- app's state (variables) -----*/
let board, winner, turn;

/*
icebox
let takenPiecesBlack, takenPiecesWhite, boardOrientation;
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

/*----- functions -----*/
function init() {
  board = [
    -4, -3, -2, -6, -5, -2, -3, -4,
    -1, -1, -1, -1, -1, -1, -1, -1,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    1, 1, 1, 1, 1, 1, 1, 1,
    4, 3, 2, 6, 5, 2, 3, 4
  ];
  // Not sure whether or not to either have the board tracking the player or different pieces set to different values or even one kind of piece to one value whether it's black or white.
  turn = 1;
  winner = null;
  render();
}

init();

function render() {

  replayBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function handlePieceSelection() {

}

function handlePiecePlacement() {

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
 
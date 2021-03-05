/*----- constants -----*/
const playerLookup = {
  'black': {
    
  },
  'white': {

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
const squareEls = [...document.querySelectorAll('# board div')];
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



/*----- functions -----*/
function init() {
  board = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
  ];
  turn = 1;
  winner = null;
  render();
}



init();



function handlePieceSelection() {

}

function handlePiecePlacement() {

}

function render() {
  
}
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
const changePlayer = {
  '1': 'rotate(0deg)',
  '-1': 'rotate(180deg)'
}

/*----- app's state (variables) -----*/
let board, winner, turn, pieceIdx, boardWidth, clickCounter, selectedDiv, placementDiv, legalMoves, pieceValue, selectedIdx, placementIdx;

/*
icebox
let takenPiecesBlack, takenPiecesWhite, boardOrientation, boardChoice;
*/

/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const squareEls = [...document.querySelectorAll('#board div')];
const msgEl = document.getElementById('message-section');
const blackWins = document.getElementById('black-wins');
const whiteWins = document.getElementById('white-wins');
const replayBtn = document.querySelector('button');

/*
icebox
const bTakenPiecesEl = document.getElementById('w-taken-pieces');
const wTakenPiecesEl = document.getElementById('w-taken-pieces');
*/
/*----- event listeners -----*/
boardEl.addEventListener('click', handleMove);
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
    square.style.transform = changePlayer[turn];
  });
  if (winner === 'T') {
    msgEl.textContent = "Stalemate!";
  } else if (winner < 0) {
    blackWins.style.backgroundImage = playerLookup[winner]['imgURL'];
    blackWins.style.backgroundSize = 'cover';
    msgEl.textContent = "Black wins!";
  } else if (winner > 0) {
    whiteWins.style.backgroundImage = playerLookup[winner]['imgURL'];
    whiteWins.style.backgroundSize = 'cover';
    msgEl.textContent = "White wins!";
  }
  msgEl.style.visibility = winner ? 'visible' : 'hidden'; //change this logic
  replayBtn.style.visibility = winner ? 'visible' : 'hidden';
  blackWins.style.visibility = winner ? 'visible' : 'hidden';
  whiteWins.style.visibility = winner ? 'visible' : 'hidden';
  boardEl.style.transform = changePlayer[turn];
  clickCounter = 0;
  legalMoves = [];
  boardWidth = 8;
}
// console.log(legalMoves);
function handleMove(evt) {
  if (clickCounter < 1) {
    selectedDiv = evt.target;
    selectedIdx = squareEls.indexOf(selectedDiv);
    pieceValue = board[selectedIdx];
    if ((pieceValue > 0 && turn < 0) || (pieceValue < 0 && turn > 0) || pieceValue === null || winner) return;
    clickCounter++;
    if (pieceValue < 0) {
      selectedDiv.style.transform = 'scale(1.35) rotate(180deg)';
    } else {
      selectedDiv.style.transform = 'scale(1.35)';
      selectedDiv.style.transition = 'all 0.05s ease-in';
    }
    
    if (pieceValue === 1) whitePawnMove(selectedIdx);
    if (pieceValue === 2) whiteBishopMove(selectedIdx);
    if (pieceValue === 3) whiteKnightMove(selectedIdx);
    if (pieceValue === 4) whiteRookMove(selectedIdx);
    if (pieceValue === 5) whiteQueenMove(selectedIdx);
    if (pieceValue === 6) whiteKingMove(selectedIdx);
    if (pieceValue === -1) blackPawnMove(selectedIdx);
    if (pieceValue === -2) blackBishopMove(selectedIdx);
    if (pieceValue === -3) blackKnightMove(selectedIdx);
    if (pieceValue === -4) blackRookMove(selectedIdx);
    if (pieceValue === -5) blackQueenMove(selectedIdx);
    if (pieceValue === -6) blackKingMove(selectedIdx);
    legalMoves.forEach(function(move) {
      squareEls[move].style.backgroundColor = 'green';
    });
  } else if (clickCounter >= 1) {
    placementDiv = evt.target;
    placementIdx = squareEls.indexOf(placementDiv);
    if (selectedDiv === placementDiv) {
      selectedDiv.style.transform = 'scale(1)';
      selectedDiv.style.transition = 'all 0.05s ease-in';
      legalMoves.forEach(function(move) {
        squareEls[move].style.backgroundColor = '';
      });
      render();
    } else if (legalMoves.indexOf(placementIdx) !== -1) {
      board[placementIdx] = pieceValue;
      selectedDiv.style.transform = 'scale(1)';
      selectedDiv.style.transition = 'all 0.05s ease-in';
      legalMoves.forEach(function(move) {
        squareEls[move].style.backgroundColor = '';
      });
      board[selectedIdx] = null;
      winner = getWinner();
      turn *= -1;
      render();
    }
  }
}

function whitePawnMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let modal = pieceIdx % boardWidth;
  if (pieceIdx < 8) return;
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
  if (pieceIdx < 16 && modal >= 0) {
  } else {
    if (modal === 0) {  
    } else if (board[up - 1] < 0 || board[up - 1] === null) {
      if (pieceIdx === 56) {  
      } else {
      legalMoves.push(up - 1);
      }
    }
    if (modal === 7) {
    } else if (board[up + 1] < 0 || board[up + 1] === null) {
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
    if (modal === 7) {
    } else if (board[down + 1] < 0 || board[down + 1] === null) {
      if (pieceIdx === 7) {
      } else {
        legalMoves.push(down + 1);
      }
    }
    if (modal === 0) {
    } else if (board[down - 1] < 0 || board[down - 1] === null) {
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
  // console.log(legalMoves);
}

function blackPawnMove(pieceIdx) {
  let squareAbove = pieceIdx + boardWidth;
  let modal = pieceIdx % boardWidth;
  if (pieceIdx > 55) return;
  if (board[squareAbove] === null) {
    legalMoves.push(squareAbove);
  };
  if (modal === 7 || board[squareAbove + 1] < 0) {
  } else if (board[squareAbove + 1] !== null) {
    legalMoves.push(squareAbove + 1);
  };
  if (modal === 0 || board[squareAbove - 1] < 0) {
  } else if (board[squareAbove - 1] !== null) {
    legalMoves.push(squareAbove - 1);
  };
  // console.log(legalMoves);
}

function blackBishopMove(pieceIdx) {
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
    while (board[rUDiag] === null || board[rUDiag] > 0) {
      if (modal === 7) break;
      legalMoves.push(rUDiag);
      if (board[rUDiag] > 0 || (rUDiag % boardWidth) === 7) break;
      right++;
      up += boardWidth;
      rUDiag = pieceIdx - up + right;
    }
    up = boardWidth;
    right = 1;
    while (board[rDDiag] === null || board[rDDiag] > 0) {
      if (modal === 7) break;
      legalMoves.push(rDDiag);
      if (board[rDDiag] > 0 || (rDDiag % boardWidth) === 7) break;
      right++;
      down += boardWidth;
      rDDiag = pieceIdx + down + right;
    }
    down = boardWidth;
    right = 1;
    while (board[lUDiag] === null || board[lUDiag] > 0) {
      if (modal === 0) break;
      legalMoves.push(lUDiag);
      if (board[lUDiag] > 0 || (lUDiag % boardWidth) === 0) break;
      left++;
      up += boardWidth;
      lUDiag = pieceIdx - up - left;
    }
    up = boardWidth;
    left = 1;
    while (board[lDDiag] === null || board[lDDiag] > 0) {
      if (modal === 0) break;
      legalMoves.push(lDDiag);
      if (board[lDDiag] > 0 || (lDDiag % boardWidth) === 0) break;
      left++;
      down += boardWidth;
      lDDiag = pieceIdx + down - left;
    }
  // console.log(legalMoves);
}

function blackKnightMove(pieceIdx) {
  let height = boardWidth * 2;
  let up = pieceIdx - height;
  let right = pieceIdx + 2;
  let down = pieceIdx + height;
  let left = pieceIdx - 2;
  let modal = pieceIdx % boardWidth;
  if (pieceIdx < 16 && modal >= 0) {
  } else {
    if (modal === 0) {  
    } else if (board[up - 1] > 0 || board[up - 1] === null) {
      if (pieceIdx === 56) {  
      } else {
      legalMoves.push(up - 1);
      }
    }
    if (modal === 7) {
    } else if (board[up + 1] > 0 || board[up + 1] === null) {
      if (pieceIdx === 63) {
      } else {
        legalMoves.push(up + 1);
      }
    }
  }
  if (modal > 5) {
  } else {
    if (board[right - boardWidth] > 0 || board[right - boardWidth] === null) {
      legalMoves.push(right - boardWidth);
    }
    if (board[right + boardWidth] > 0 || board[right + boardWidth] === null) {
      legalMoves.push(right + boardWidth);
    }
  }
  if (pieceIdx > 47 && modal >= 0) {
  } else {
    if (modal === 7) {
    } else if (board[down + 1] > 0 || board[down + 1] === null) {
      if (pieceIdx === 7) {
      } else {
        legalMoves.push(down + 1);
      }
    }
    if (modal === 0) {
    } else if (board[down - 1] > 0 || board[down - 1] === null) {
      if (pieceIdx === 0) {
      } else {
        legalMoves.push(down - 1);
      }
    }
  }
  if (modal < 2) {
  } else {
    if (board[left + boardWidth] > 0 || board[left + boardWidth] === null) {
      legalMoves.push(left + boardWidth);
    }
    if (board[left - boardWidth] > 0 || board[left - boardWidth] === null) {
      legalMoves.push(left - boardWidth);
    }
  }
  // console.log(legalMoves)  
}

function blackRookMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let squareBelow = pieceIdx + boardWidth;
  let modal = pieceIdx % boardWidth;
  let right = 1;
  let left = 1;
  while (board[squareAbove] === null || board[squareAbove] > 0) {
    legalMoves.push(squareAbove);
    if (board[squareAbove] > 0) break;
    squareAbove -= boardWidth;
  }
  while (board[pieceIdx + right] === null || board[pieceIdx + right] > 0) {
    if (modal === 7) break;
    legalMoves.push(pieceIdx + right);
    if ((pieceIdx + right) % boardWidth === 7 || board[pieceIdx + right] > 0) break;
    right++;
  }
  while (board[squareBelow] === null || board[squareBelow] > 0) {
    legalMoves.push(squareBelow);
    if (board[squareBelow] > 0) break;
    squareBelow += boardWidth;
  }
  while (board[pieceIdx - left] === null || board[pieceIdx - left] > 0) {
    if (modal === 0) break;
    legalMoves.push(pieceIdx - left);
    if ((pieceIdx - left) % boardWidth === 0 || board[pieceIdx - left] > 0) break;
    left++;
  }
  // console.log(legalMoves);
}

function blackQueenMove(pieceIdx) {
  blackBishopMove(pieceIdx);
  blackRookMove(pieceIdx);
}

function blackKingMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let squareBelow = pieceIdx + boardWidth;
  let modal = pieceIdx % boardWidth;
  if (pieceIdx < 8) {
  } else if (board[squareAbove] === null || board[squareAbove] > 0) {
      legalMoves.push(squareAbove);
    }
  if (modal === 7) { 
  } else {
    if (board[squareAbove + 1] === null || board[squareAbove + 1] > 0) {
      legalMoves.push(squareAbove + 1);
    }
    if (board[pieceIdx + 1] === null || board[pieceIdx + 1] > 0) {
      legalMoves.push(pieceIdx + 1);
    }
    if (board[squareBelow + 1] === null || board[squareBelow + 1] > 0) {
      legalMoves.push(squareBelow + 1);
    }
  }
  if (pieceIdx > 55) {
  } else if (board[squareBelow] === null || board[squareBelow] > 0) {
    legalMoves.push(squareBelow);
  }
  if (modal === 0) {
  } else {
    if (board[squareBelow - 1] === null || board[squareBelow - 1] > 0) {
      legalMoves.push(squareBelow - 1);
    }
    if (board[pieceIdx - 1] === null || board[pieceIdx - 1] > 0) {
      legalMoves.push(pieceIdx - 1);
    }
    if (board[squareAbove - 1] === null || board[squareAbove - 1] > 0) {
      legalMoves.push(squareAbove - 1);
    }
  }
  // console.log(legalMoves)
}

function getWinner() {
  if (board.indexOf(6) === -1) {
    return -6;
  } else if (board.indexOf(-6) === -1) {
    return 6;
  } else {
    return null;
  }
}
// /*----- constants -----*/
// const playerLookup = {
//   '-1': {
//     imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
//     // move: pawnMove()
//     // value: 1,
//   },
//   '-2': {
//     imgURL: "url('media/chess-piece-sprites/b-pieces/b-bishop.svg')",
//     // move: bishopMove()
//     // value: 3,
//   },
//   '-3': {
//     imgURL: "url('media/chess-piece-sprites/b-pieces/b-knight.svg')",
//     // move: knightMove()
//     // value: 3,
//   },
//   '-4': {
//     imgURL: "url('media/chess-piece-sprites/b-pieces/b-rook.svg')",
//     // move: rookMove()
//     // value: 5,
//   },
//   '-5': {
//     imgURL: "url('media/chess-piece-sprites/b-pieces/b-queen.svg')",
//     // move: queenMove()
//     // value: 9,
//   },
//   '-6': {
//     imgURL: "url('media/chess-piece-sprites/b-pieces/b-king.svg')",
//     // move: kingMove()
//     // value: 50,
//   },
//   '1': {
//     imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
//     // move: pawnMove()
//     // value: 1,
//   },
//   '2': {
//     imgURL: "url('media/chess-piece-sprites/w-pieces/w-bishop.svg')",
//     // move: bishopMove()
//     // value: 3,
//   },
//   '3': {
//     imgURL: "url('media/chess-piece-sprites/w-pieces/w-knight.svg')",
//     // move: knightMove()
//     // value: 3,
//   },
//   '4': {
//     imgURL: "url('media/chess-piece-sprites/w-pieces/w-rook.svg')",
//     // move: rookMove()
//     // value: 5,
//   },
//   '5': {
//     imgURL: "url('media/chess-piece-sprites/w-pieces/w-queen.svg')",
//     // move: queenMove()
//     // value: 9,
//   },
//   '6': {
//     imgURL: "url('media/chess-piece-sprites/w-pieces/w-king.svg')",
//     // move: kingMove()
//     // value: 50,
//   },
//   'null': {
//     imgURL: "url('')"
//   }
// };
// const boardMoveLookup = {
//   '-1': {

//   },
//   '-2': {

//   },
//   '-3': {

//   },
//   '-4': {

//   },
//   '-5': {

//   },
//   '-6': {

//   },
//   '1': {

//   },
//   '2': {

//   },
//   '3': {

//   },
//   '4': {

//   },
//   '5': {

//   },
//   '6': {

//   },
  
// };

// /*----- app's state (variables) -----*/
// let board, winner, turn, pieceIdx, boardWidth, clickCounter, selectedDiv, placementDiv, legalMoves, selectedPieceValue, placementPieceVal;
//                                                                                   // fix these names ^^^^^^^^^^^^^^^   &  ^^^^^^^^^^^^^
// /*
// icebox
// let takenPiecesBlack, takenPiecesWhite, boardOrientation, boardChoice;
// */

// /*----- cached element references -----*/
// const boardEl = document.getElementById('board');
// const squareEls = [...document.querySelectorAll('#board div')];
// const msgEl = document.getElementById('message-section');
// const replayBtn = document.querySelector('button');

// /*
// icebox
// const bTakenPiecesEl = document.getElementById('w-taken-pieces');
// const wTakenPiecesEl = document.getElementById('w-taken-pieces');
// */
// /*----- event listeners -----*/
// boardEl.addEventListener('click', handlePieceSelection);
// boardEl.addEventListener('click', handlePiecePlacement);
// replayBtn.addEventListener('click', init);
// /*
// msgEl.assEventListener('click', handleBoardChoice)
// */

// /*----- functions -----*/
// function init() {
  // board = [
  //   -4, -3, -2, -5, -6, -2, -3, -4,
  //   -1, -1, -1, -1, -1, -1, -1, -1,
  //   null, null, null, null, null, null, null, null,
  //   null, null, null, null, null, null, null, null,
  //   null, null, null, null, null, null, null, null,
  //   null, null, null, null, null, null, null, null,
  //   1, 1, 1, 1, 1, 1, 1, 1,
  //   4, 3, 2, 5, 6, 2, 3, 4
  // ];
//   // Not sure whether or not to either have the board tracking the player or different pieces set to different values or even one kind of piece to one value whether it's black or white.
//   pieceIdx = null;
//   turn = 1;
//   winner = null;
//   render();
// }

// init();
// function render() {
//   board.forEach(function(squareValue, boardIdx) {
//     const square = document.getElementById(`sq${boardIdx}`);
//     square.style.backgroundImage = playerLookup[squareValue]['imgURL'];
//     square.style.backgroundSize = 'cover';
//   });
//   if (winner === 'T') {
//     msgEl.textContent = "it's a tie!";
//   } else if (winner < 0) {
//     msgEl.textContent = "Black wins!";
//   } else if (winner > 0) {
//     msgEl.textContent = "White wins!";
//   }
//   // msgEl.style.visibility = winner ? 'visible' : 'hidden'; //change this logic
//   replayBtn.style.visibility = winner ? 'visible' : 'hidden';
//   clickCounter = -1;
//   legalMoves = [];
//   boardWidth = 8;  // Maybe define boardWidth in each move helper function instead;
//   // selectedPieceValue = undefined;
// }

// function handlePieceSelection(evt) {
//   if (clickCounter > -1) return;
//   clickCounter++;
//   selectedDiv = evt.target;
//   let selectedIdx = squareEls.indexOf(selectedDiv);
//   selectedPieceValue = board[selectedIdx];
//   // console.log(piece)
//   if ((selectedPieceValue > 0 && turn < 0) || (selectedPieceValue < 0 && turn > 0) || selectedPieceValue === null || winner) return;
//   pieceIdx = selectedIdx;
//   // console.log(`the div ID = #${selectedDiv.id}, pieceIdx = ${pieceIdx}`);
//   selectedDiv.style.transform = 'scale(1.35)';
//   selectedDiv.style.transition = 'all 0.05s ease-in';
//   console.log(selectedPieceValue);
//   /*
//   icebox
//   play a sound when selecting the piece.
//   */
//   if (selectedPieceValue === 1) whitePawnMove(pieceIdx);
//   if (selectedPieceValue === 2) whiteBishopMove(pieceIdx);
//   if (selectedPieceValue === 3) whiteKnightMove(pieceIdx);
//   if (selectedPieceValue === 4) whiteRookMove(pieceIdx);
//   if (selectedPieceValue === 5) whiteQueenMove(pieceIdx);
//   if (selectedPieceValue === 6) whiteKingMove(pieceIdx);
//   if (selectedPieceValue === -1) blackPawnMove(pieceIdx);
//   if (selectedPieceValue === -2) blackBishopMove(pieceIdx);
//   if (selectedPieceValue === -3) blackKnightMove(pieceIdx);
//   if (selectedPieceValue === -4) blackRookMove(pieceIdx);
//   if (selectedPieceValue === -5) blackQueenMove(pieceIdx);
//   if (selectedPieceValue === -6) blackKingMove(pieceIdx);
//   // console.log(legalMoves);
//   legalMoves.forEach(function(move) {
//     squareEls[move].style.backgroundColor = 'green';
//   });
// }

// function handlePiecePlacement(evt) {
//   clickCounter++;
//   if (clickCounter < 1) return;
//   placementDiv = evt.target;
//   let selectedIdx = squareEls.indexOf(placementDiv);
//   placementPieceValue = board[selectedIdx];
//   console.log(board[selectedIdx], selectedPieceValue)
//   console.log(SelectedPieceValue);
//   if (selectedDiv === placementDiv) {
//     selectedDiv.style.transform = 'scale(1)';
//     selectedDiv.style.transition = 'all 0.05s ease-in';
//     legalMoves.forEach(function(move) {
//       squareEls[move].style.backgroundColor = '';
//     });
//     // render();
//   }
//   if ((placementPieceValue > 0 && turn > 0) || (placementPieceValue < 0 && turn < 0)) return;
//     // board[selectedIdx] = playerLookup[selectedPieceValue];
//     // selectedDiv.style.transform = 'scale(1)';
//     // selectedDiv.style.transition = 'all 0.05s ease-in';
//     // // selectedDiv.style.backgroundImage = playerLookup.null.imgURL;
//     // legalMoves.forEach(function(move) {
//     //   squareEls[move].style.backgroundColor = '';
//     // });
  
  
//   // console.log('hey!')
//   // render();
//   // console.log('hey!')
//   // inCheck()
//   // // // winner = getWinner();
//   // turn *= -1;
//   // render();
  
//   /* icebox items
//   */
// }

// function whitePawnMove(pieceIdx) {
//   let squareAbove = pieceIdx - boardWidth;
//   let modal = pieceIdx % boardWidth;
//   if (pieceIdx < 8) return;
//   if (board[squareAbove] === null) {
//     legalMoves.push(squareAbove);
//   };
//   if (modal === 7 || board[squareAbove + 1] > 0) {
//   } else if (board[squareAbove + 1] !== null) {
//     legalMoves.push(squareAbove + 1);
//   };
//   if (modal === 0 || board[squareAbove - 1] > 0) {
//   } else if (board[squareAbove - 1] !== null) {
//     legalMoves.push(squareAbove - 1);
//   };
//   // console.log(legalMoves);
// }

// function whiteBishopMove(pieceIdx) {
//   let squareAbove = pieceIdx - boardWidth;
//   let squareBelow = pieceIdx + boardWidth;
//   let modal = pieceIdx % boardWidth;
//   let right = 1;
//   let left = 1;
//   let up = boardWidth;
//   let down = boardWidth;
//   let rUDiag = squareAbove + right;
//   let lUDiag = squareAbove - left;
//   let rDDiag = squareBelow + right;
//   let lDDiag = squareBelow - left; //Maybe I don't need the "board[rUDiag] < 0" at all
//     while (board[rUDiag] === null || board[rUDiag] < 0) {
//       if (modal === 7) break;
//       legalMoves.push(rUDiag);
//       if (board[rUDiag] < 0 || (rUDiag % boardWidth) === 7) break;
//       right++;
//       up += boardWidth;
//       rUDiag = pieceIdx - up + right;
//     }
//     up = boardWidth;
//     right = 1;
//     while (board[rDDiag] === null || board[rDDiag] < 0) {
//       if (modal === 7) break;
//       legalMoves.push(rDDiag);
//       if (board[rDDiag] < 0 || (rDDiag % boardWidth) === 7) break;
//       right++;
//       down += boardWidth;
//       rDDiag = pieceIdx + down + right;
//     }
//     down = boardWidth;
//     right = 1;
//     while (board[lUDiag] === null || board[lUDiag] < 0) {
//       if (modal === 0) break;
//       legalMoves.push(lUDiag);
//       if (board[lUDiag] < 0 || (lUDiag % boardWidth) === 0) break;
//       left++;
//       up += boardWidth;
//       lUDiag = pieceIdx - up - left;
//     }
//     up = boardWidth;
//     left = 1;
//     while (board[lDDiag] === null || board[lDDiag] < 0) {
//       if (modal === 0) break;
//       legalMoves.push(lDDiag);
//       if (board[lDDiag] < 0 || (lDDiag % boardWidth) === 0) break;
//       left++;
//       down += boardWidth;
//       lDDiag = pieceIdx + down - left;
//     }
//   // console.log(legalMoves);
// }

// function whiteKnightMove(pieceIdx) {
//   let height = boardWidth * 2;
//   let up = pieceIdx - height;
//   let right = pieceIdx + 2;
//   let down = pieceIdx + height;
//   let left = pieceIdx - 2;
//   let modal = pieceIdx % boardWidth;
//   if (pieceIdx < 16 && modal >= 0) {
//   } else {
//     if (modal === 0) {  
//     } else if (board[up - 1] < 0 || board[up - 1] === null) {
//       if (pieceIdx === 56) {  
//       } else {
//       legalMoves.push(up - 1);
//       }
//     }
//     if (modal === 7) {
//     } else if (board[up + 1] < 0 || board[up + 1] === null) {
//       if (pieceIdx === 63) {
//       } else {
//         legalMoves.push(up + 1);
//       }
//     }
//   }
//   if (modal > 5) {
//   } else {
//     if (board[right - boardWidth] < 0 || board[right - boardWidth] === null) {
//       legalMoves.push(right - boardWidth);
//     }
//     if (board[right + boardWidth] < 0 || board[right + boardWidth] === null) {
//       legalMoves.push(right + boardWidth);
//     }
//   }
//   if (pieceIdx > 47 && modal >= 0) {
//   } else {
//     if (modal === 7) {
//     } else if (board[down + 1] < 0 || board[down + 1] === null) {
//       if (pieceIdx === 7) {
//       } else {
//         legalMoves.push(down + 1);
//       }
//     }
//     if (modal === 0) {
//     } else if (board[down - 1] < 0 || board[down - 1] === null) {
//       if (pieceIdx === 0) {
//       } else {
//         legalMoves.push(down - 1);
//       }
//     }
//   }
//   if (modal < 2) {
//   } else {
//     if (board[left + boardWidth] < 0 || board[left + boardWidth] === null) {
//       legalMoves.push(left + boardWidth);
//     }
//     if (board[left - boardWidth] < 0 || board[left - boardWidth] === null) {
//       legalMoves.push(left - boardWidth);
//     }
//   }
//   // console.log(legalMoves)  
// }

// function whiteRookMove(pieceIdx) {
//   let squareAbove = pieceIdx - boardWidth;
//   let squareBelow = pieceIdx + boardWidth;
//   let modal = pieceIdx % boardWidth;
//   let right = 1;
//   let left = 1;
//   while (board[squareAbove] === null || board[squareAbove] < 0) {
//     legalMoves.push(squareAbove);
//     if (board[squareAbove] < 0) break;
//     squareAbove -= boardWidth;
//   }
//   while (board[pieceIdx + right] === null || board[pieceIdx + right] < 0) {
//     if (modal === 7) break;
//     legalMoves.push(pieceIdx + right);
//     if ((pieceIdx + right) % boardWidth === 7 || board[pieceIdx + right] < 0) break;
//     right++;
//   }
//   while (board[squareBelow] === null || board[squareBelow] < 0) {
//     legalMoves.push(squareBelow);
//     if (board[squareBelow] < 0) break;
//     squareBelow += boardWidth;
//   }
//   while (board[pieceIdx - left] === null || board[pieceIdx - left] < 0) {
//     if (modal === 0) break;
//     legalMoves.push(pieceIdx - left);
//     if ((pieceIdx - left) % boardWidth === 0 || board[pieceIdx - left] < 0) break;
//     left++;
//   }
//   // console.log(legalMoves);
// }

// function whiteQueenMove(pieceIdx) {
//   whiteBishopMove(pieceIdx);
//   whiteRookMove(pieceIdx);
// }

// function whiteKingMove(pieceIdx) {
//   let squareAbove = pieceIdx - boardWidth;
//   let squareBelow = pieceIdx + boardWidth;
//   let modal = pieceIdx % boardWidth;
//   if (pieceIdx < 8) {
//   } else if (board[squareAbove] === null || board[squareAbove] < 0) {
//       legalMoves.push(squareAbove);
//     }
//   if (modal === 7) { 
//   } else {
//     if (board[squareAbove + 1] === null || board[squareAbove + 1] < 0) {
//       legalMoves.push(squareAbove + 1);
//     }
//     if (board[pieceIdx + 1] === null || board[pieceIdx + 1] < 0) {
//       legalMoves.push(pieceIdx + 1);
//     }
//     if (board[squareBelow + 1] === null || board[squareBelow + 1] < 0) {
//       legalMoves.push(squareBelow + 1);
//     }
//   }
//   if (pieceIdx > 55) {
//   } else if (board[squareBelow] === null || board[squareBelow] < 0) {
//     legalMoves.push(squareBelow);
//   }
//   if (modal === 0) {
//   } else {
//     if (board[squareBelow - 1] === null || board[squareBelow - 1] < 0) {
//       legalMoves.push(squareBelow - 1);
//     }
//     if (board[pieceIdx - 1] === null || board[pieceIdx - 1] < 0) {
//       legalMoves.push(pieceIdx - 1);
//     }
//     if (board[squareAbove - 1] === null || board[squareAbove - 1] < 0) {
//       legalMoves.push(squareAbove - 1);
//     }
//   }
//   // console.log(legalMoves);
// }

// function blackPawnMove(pieceIdx) {
//   let squareAbove = pieceIdx + boardWidth;
//   let modal = pieceIdx % boardWidth;
//   if (pieceIdx > 55) return;
//   if (board[squareAbove] === null) {
//     legalMoves.push(squareAbove);
//   };
//   if (modal === 7 || board[squareAbove + 1] < 0) {
//   } else if (board[squareAbove + 1] !== null) {
//     legalMoves.push(squareAbove + 1);
//   };
//   if (modal === 0 || board[squareAbove - 1] < 0) {
//   } else if (board[squareAbove - 1] !== null) {
//     legalMoves.push(squareAbove - 1);
//   };
//   // console.log(legalMoves);
// }

// function blackBishopMove(pieceIdx) {
//   let squareAbove = pieceIdx - boardWidth;
//   let squareBelow = pieceIdx + boardWidth;
//   let modal = pieceIdx % boardWidth;
//   let right = 1;
//   let left = 1;
//   let up = boardWidth;
//   let down = boardWidth;
//   let rUDiag = squareAbove + right;
//   let lUDiag = squareAbove - left;
//   let rDDiag = squareBelow + right;
//   let lDDiag = squareBelow - left; //Maybe I don't need the "board[rUDiag] < 0" at all
//     while (board[rUDiag] === null || board[rUDiag] > 0) {
//       if (modal === 7) break;
//       legalMoves.push(rUDiag);
//       if (board[rUDiag] > 0 || (rUDiag % boardWidth) === 7) break;
//       right++;
//       up += boardWidth;
//       rUDiag = pieceIdx - up + right;
//     }
//     up = boardWidth;
//     right = 1;
//     while (board[rDDiag] === null || board[rDDiag] > 0) {
//       if (modal === 7) break;
//       legalMoves.push(rDDiag);
//       if (board[rDDiag] > 0 || (rDDiag % boardWidth) === 7) break;
//       right++;
//       down += boardWidth;
//       rDDiag = pieceIdx + down + right;
//     }
//     down = boardWidth;
//     right = 1;
//     while (board[lUDiag] === null || board[lUDiag] > 0) {
//       if (modal === 0) break;
//       legalMoves.push(lUDiag);
//       if (board[lUDiag] > 0 || (lUDiag % boardWidth) === 0) break;
//       left++;
//       up += boardWidth;
//       lUDiag = pieceIdx - up - left;
//     }
//     up = boardWidth;
//     left = 1;
//     while (board[lDDiag] === null || board[lDDiag] > 0) {
//       if (modal === 0) break;
//       legalMoves.push(lDDiag);
//       if (board[lDDiag] > 0 || (lDDiag % boardWidth) === 0) break;
//       left++;
//       down += boardWidth;
//       lDDiag = pieceIdx + down - left;
//     }
//   // console.log(legalMoves);
// }

// function blackKnightMove(pieceIdx) {
//   let height = boardWidth * 2;
//   let up = pieceIdx - height;
//   let right = pieceIdx + 2;
//   let down = pieceIdx + height;
//   let left = pieceIdx - 2;
//   let modal = pieceIdx % boardWidth;
//   if (pieceIdx < 16 && modal >= 0) {
//   } else {
//     if (modal === 0) {  
//     } else if (board[up - 1] > 0 || board[up - 1] === null) {
//       if (pieceIdx === 56) {  
//       } else {
//       legalMoves.push(up - 1);
//       }
//     }
//     if (modal === 7) {
//     } else if (board[up + 1] > 0 || board[up + 1] === null) {
//       if (pieceIdx === 63) {
//       } else {
//         legalMoves.push(up + 1);
//       }
//     }
//   }
//   if (modal > 5) {
//   } else {
//     if (board[right - boardWidth] > 0 || board[right - boardWidth] === null) {
//       legalMoves.push(right - boardWidth);
//     }
//     if (board[right + boardWidth] > 0 || board[right + boardWidth] === null) {
//       legalMoves.push(right + boardWidth);
//     }
//   }
//   if (pieceIdx > 47 && modal >= 0) {
//   } else {
//     if (modal === 7) {
//     } else if (board[down + 1] > 0 || board[down + 1] === null) {
//       if (pieceIdx === 7) {
//       } else {
//         legalMoves.push(down + 1);
//       }
//     }
//     if (modal === 0) {
//     } else if (board[down - 1] > 0 || board[down - 1] === null) {
//       if (pieceIdx === 0) {
//       } else {
//         legalMoves.push(down - 1);
//       }
//     }
//   }
//   if (modal < 2) {
//   } else {
//     if (board[left + boardWidth] > 0 || board[left + boardWidth] === null) {
//       legalMoves.push(left + boardWidth);
//     }
//     if (board[left - boardWidth] > 0 || board[left - boardWidth] === null) {
//       legalMoves.push(left - boardWidth);
//     }
//   }
//   // console.log(legalMoves)  
// }

// function blackRookMove(pieceIdx) {
//   let squareAbove = pieceIdx - boardWidth;
//   let squareBelow = pieceIdx + boardWidth;
//   let modal = pieceIdx % boardWidth;
//   let right = 1;
//   let left = 1;
//   while (board[squareAbove] === null || board[squareAbove] > 0) {
//     legalMoves.push(squareAbove);
//     if (board[squareAbove] > 0) break;
//     squareAbove -= boardWidth;
//   }
//   while (board[pieceIdx + right] === null || board[pieceIdx + right] > 0) {
//     if (modal === 7) break;
//     legalMoves.push(pieceIdx + right);
//     if ((pieceIdx + right) % boardWidth === 7 || board[pieceIdx + right] > 0) break;
//     right++;
//   }
//   while (board[squareBelow] === null || board[squareBelow] > 0) {
//     legalMoves.push(squareBelow);
//     if (board[squareBelow] > 0) break;
//     squareBelow += boardWidth;
//   }
//   while (board[pieceIdx - left] === null || board[pieceIdx - left] > 0) {
//     if (modal === 0) break;
//     legalMoves.push(pieceIdx - left);
//     if ((pieceIdx - left) % boardWidth === 0 || board[pieceIdx - left] > 0) break;
//     left++;
//   }
//   // console.log(legalMoves);
// }

// function blackQueenMove(pieceIdx) {
//   blackBishopMove(pieceIdx);
//   blackRookMove(pieceIdx);
// }

// function blackKingMove(pieceIdx) {
//   let squareAbove = pieceIdx - boardWidth;
//   let squareBelow = pieceIdx + boardWidth;
//   let modal = pieceIdx % boardWidth;
//   if (pieceIdx < 8) {
//   } else if (board[squareAbove] === null || board[squareAbove] > 0) {
//       legalMoves.push(squareAbove);
//     }
//   if (modal === 7) { 
//   } else {
//     if (board[squareAbove + 1] === null || board[squareAbove + 1] > 0) {
//       legalMoves.push(squareAbove + 1);
//     }
//     if (board[pieceIdx + 1] === null || board[pieceIdx + 1] > 0) {
//       legalMoves.push(pieceIdx + 1);
//     }
//     if (board[squareBelow + 1] === null || board[squareBelow + 1] > 0) {
//       legalMoves.push(squareBelow + 1);
//     }
//   }
//   if (pieceIdx > 55) {
//   } else if (board[squareBelow] === null || board[squareBelow] > 0) {
//     legalMoves.push(squareBelow);
//   }
//   if (modal === 0) {
//   } else {
//     if (board[squareBelow - 1] === null || board[squareBelow - 1] > 0) {
//       legalMoves.push(squareBelow - 1);
//     }
//     if (board[pieceIdx - 1] === null || board[pieceIdx - 1] > 0) {
//       legalMoves.push(pieceIdx - 1);
//     }
//     if (board[squareAbove - 1] === null || board[squareAbove - 1] > 0) {
//       legalMoves.push(squareAbove - 1);
//     }
//   }
//   // console.log(legalMoves)
// }

// function getWinner() {

// }
 
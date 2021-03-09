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

/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const squareEls = [...document.querySelectorAll('#board div')];
const msgEl = document.getElementById('message-section');
const blackWins = document.getElementById('black-wins');
const whiteWins = document.getElementById('white-wins');
const replayBtn = document.querySelector('button');

/*----- event listeners -----*/
boardEl.addEventListener('click', handleMove);
replayBtn.addEventListener('click', init);

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
    /* icebox in-check messages
    if (check === null) {
      square.style.backgroundColor = "";
      msgEl.style.visibility = "hidden"
    } else if (check === -1) {
      document.getElementById(`sq${placementIdx}`).style.backgroundColor = "rgba(255, 0, 0, 1)";
      msgEl.textContent = "Black is in check!"
      msgEl.style.visibility = "visible"
    } else if (check === 1) {
      document.getElementById(`sq${placementIdx}`).style.backgroundColor = "rgba(255, 0, 0, 1)";
      msgEl.textContent = "White is in check!"
      msgEl.style.visibility = "visible"
    }
    */
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
  } else {
    whiteWins.style.backgroundImage = "";
    blackWins.style.backgroundImage = "";
  }

  msgEl.style.visibility = winner ? 'visible' : 'hidden';
  replayBtn.style.visibility = winner ? 'visible' : 'hidden';
  blackWins.style.visibility = winner ? 'visible' : 'hidden';
  whiteWins.style.visibility = winner ? 'visible' : 'hidden';
  boardEl.style.transform = changePlayer[turn];
  clickCounter = 0;
  legalMoves = [];
  boardWidth = 8;
}

function handleMove(evt) {
  if (clickCounter < 1) {
    // Handles piece selection.
    selectedDiv = evt.target;
    selectedIdx = squareEls.indexOf(selectedDiv);
    pieceValue = board[selectedIdx];
    if ((pieceValue > 0 && turn < 0) || (pieceValue < 0 && turn > 0) || pieceValue === null || winner) return;
    // if the player clicks on anything but their own pieces, they are returned from the function and the click counter never increments allowing for another attempt at a better first click.
    clickCounter++;
    if (pieceValue < 0) {
      selectedDiv.style.transform = 'scale(1.35) rotate(180deg)';
    } else {
      selectedDiv.style.transform = 'scale(1.35)';
      selectedDiv.style.transition = 'all 0.05s ease-in';
    }
    // Depending on which piece has been selected, the functions return an array of indexes which represent legal moves to be highlighted green in the view.
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
      squareEls[move].style.backgroundColor = 'rgba(0, 155, 0, 1)';
    });
  } else if (clickCounter >= 1) {
    // Handles piece placement.
    placementDiv = evt.target;
    placementIdx = squareEls.indexOf(placementDiv);
    if (selectedDiv === placementDiv) {
      // if player clicks on the same piece twice, everything 'reverts back to normal' from before the piece was first selected.
      selectedDiv.style.transform = 'scale(1)';
      selectedDiv.style.transition = 'all 0.05s ease-in';
      legalMoves.forEach(function(move) {
        squareEls[move].style.backgroundColor = '';
      });
      render();
    } else if (legalMoves.indexOf(placementIdx) !== -1) {
      // if the player clicks on any square that corresponds to the legalMoves array, that square is updated to represent the piece has been placed, and the orignial square is 'returned to normal'.
      board[placementIdx] = pieceValue;
      selectedDiv.style.transform = 'scale(1)';
      legalMoves.forEach(function(move) {
        squareEls[move].style.backgroundColor = '';
      });
      board[selectedIdx] = null;
      /* icebox
      check = inCheck(pieceValue, placementIdx)
      */
      winner = getWinner();
      turn *= -1;
      render();
    }
  }
}

// Each individual function assigns all possible moves based on the current position when first selected to an array named legalMoves. There is one function for every kind of piece on the board as well as for both black and white.
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
  left = 1;
  while (board[lDDiag] === null || board[lDDiag] < 0) {
    if (modal === 0) break;
    legalMoves.push(lDDiag);
    if (board[lDDiag] < 0 || (lDDiag % boardWidth) === 0) break;
    left++;
    down += boardWidth;
    lDDiag = pieceIdx + down - left;
  }
}

function whiteKnightMove(pieceIdx) {
  let up = pieceIdx - (boardWidth * 2);
  let down = pieceIdx + (boardWidth * 2);
  let left = pieceIdx - 2;
  let right = pieceIdx + 2;
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
}

function whiteQueenMove(pieceIdx) {
  // Queeny behaves like both of thes pieces combined.
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
}

function blackKnightMove(pieceIdx) {
  let up = pieceIdx - (boardWidth * 2);
  let down = pieceIdx + (boardWidth * 2);
  let left = pieceIdx - 2;
  let right = pieceIdx + 2;
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
}

function blackQueenMove(pieceIdx) {
    // Queeny behaves like both of thes pieces combined.
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
}
function getWinner() {
  // If either king is taken, winner is given a value corresponding to who is now the victor.
  if (board.indexOf(6) === -1) {
    return -6;
  } else if (board.indexOf(-6) === -1) {
    return 6;
  } else {
    return null;
  }
}
/*
function inCheck(pieceValue, pieceIdx) {
  // let div = document.getElementById(`sq${pieceIdx}`);
  console.log(placementIdx);
  legalMoves = [];
  if (pieceValue > 0) {
    if (pieceValue === 1) {
      whitePawnMove(placementIdx);
      console.log(legalMoves)
      legalMoves.forEach(function(idx) {
        if (board[idx] === -6) {
          return -1;
        } else {
          return null;
        }
      });
    } else if (pieceValue === 2) {
      whiteBishopMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === -6) {
          return -1;
        } else {
          return null;
        }
      });
    } else if (pieceValue === 3) {
      whiteKnightMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === -6) {
          return -1;
        } else {
          return null;
        }
      });
    } else if (pieceValue === 4) {
      whiteRookMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === -6) {
          return -1;
        } else {
          return null;
        }
      });
    } else if (pieceValue === 5) {
      whiteQueenMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === -6) {
          return -1;
          // kingIdx = idx;
        } else {
          // legalMoves.indexOf(kingIdx) === -1
          // kingIdx = undefined;
          return null;
        }
      });
    }
  } else if (pieceValue < 0) {
    if (pieceValue === -1) {
      blackPawnMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === 6) {
          return 1;
        } else {
          return null;
        }
      });
    } else if (pieceValue === -2) {
      blackBishopMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === 6) {
          return 1;
        } else {
          return null;
        }
      });
    } else if (pieceValue === -3) {
      blackKnightMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === 6) {
          return 1;
        } else {
          return null;
        }
      });
    } else if (pieceValue === -4) {
      blackRookMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === 6) {
          return 1;
        } else {
          return null;
        }
      });
    } else if (pieceValue === -5) {
      blackQueenMove(placementIdx);
      legalMoves.forEach(function(idx) {
        if (board[idx] === 6) {
          return 1;
          // kingIdx = idx;
        } else {
          return null;
          // legalMoves.indexOf(kingIdx) === -1
          // kingIdx = undefined;
        }
      });
    }
  }
}
*/
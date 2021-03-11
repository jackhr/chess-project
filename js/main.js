/*----- constants -----*/
const playerLookup = {
    bp1: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
      moves: 0
    },
    bp2: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
      moves: 0
    },
    bp3: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
      moves: 0
    },
    bp4: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
      moves: 0
    },
    bp5: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
      moves: 0
    },
    bp6: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
      moves: 0
    },
    bp7: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
      moves: 0
    },
    bp8: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-pawn.svg')",
      moves: 0
    },
    bb: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-bishop.svg')",
    },
    bn: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-knight.svg')",
    },
    br1: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-rook.svg')",
      moved: false
    },
    br2: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-rook.svg')",
      moved: false
    },
    bq: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-queen.svg')",
    },
    bk: {
      imgURL: "url('media/chess-piece-sprites/b-pieces/b-king.svg')",
      moved: false
    },
    wp1: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
      moves: 0
    },
    wp2: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
      moves: 0
    },
    wp3: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
      moves: 0
    },
    wp4: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
      moves: 0
    },
    wp5: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
      moves: 0
    },
    wp6: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
      moves: 0
    },
    wp7: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
      moves: 0
    },
    wp8: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-pawn.svg')",
      moves: 0
    },
    wb: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-bishop.svg')",
    },
    wn: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-knight.svg')",
    },
    wr1: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-rook.svg')",
      moved: false
    },
    wr2: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-rook.svg')",
      moved: false
    },
    wq: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-queen.svg')",
    },
    wk: {
      imgURL: "url('media/chess-piece-sprites/w-pieces/w-king.svg')",
      moved: false
    },
  em: {
    imgURL: "url('')",
  }
};
const changePlayer = {
  '1': 'rotate(0deg)',
  '-1': 'rotate(180deg)'
}

/*----- app's state (variables) -----*/
let board, winner, turn, piece, pieceIdx, boardWidth, clickCounter, selectedDiv, placementDiv, legalMoves, selectedIdx, placementIdx;

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
    'br2', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br1',
    'bp8', 'bp7', 'bp6', 'bp5', 'bp4', 'bp3', 'bp2', 'bp1',
    'em', 'em', 'em', 'em', 'em', 'em', 'em', 'em',
    'em', 'em', 'em', 'em', 'em', 'em', 'em', 'em',
    'em', 'em', 'em', 'em', 'em', 'em', 'em', 'em',
    'em', 'em', 'em', 'em', 'em', 'em', 'em', 'em',
    'wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8',
    'wr1', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr2'
  ];
  pieceIdx = null;
  winner = null;
  turn = 1;
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
  if (winner === "bk") {
    msgEl.textContent = "Black is the victor!";
  } else if (winner === "wk") {
    msgEl.textContent = "White is the victor!";
  } else {
    msgEl.textContent = "Who will win???";
  }
  msgEl.style.visibility = winner ? 'visible' : 'hidden';
  replayBtn.style.visibility = winner ? 'visible' : 'hidden';
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
    piece = board[selectedIdx];
    if ((piece[0] === 'w' && turn < 0) || (piece[0] === 'b' && turn > 0) || piece === 'em' || winner) return;
    // if the player clicks on anything but their own pieces, they are returned from the function and the click counter never increments allowing for another attempt at a better first click.
    if (piece[1] === 'p') pawnMove(selectedIdx);
    if (piece[1] === 'b') bishopMove(selectedIdx);
    if (piece[1] === 'n') knightMove(selectedIdx);
    if (piece[1] === 'r') rookMove(selectedIdx);
    if (piece[1] === 'q') queenMove(selectedIdx);
    if (piece[1] === 'k') kingMove(selectedIdx);
    canCastle();
    legalMoves.forEach(function(move) {
      squareEls[move].style.backgroundColor = 'rgba(255, 255, 0, 0.4)';
    });
    if (legalMoves.length < 1) {
      console.log('here it is');
      return;
    }
    clickCounter++;
    selectedDiv.style.zIndex = 1;
    if (piece[0] === 'b') {
      selectedDiv.style.transform = 'scale(1.35) rotate(180deg)';
    } else {
      selectedDiv.style.transform = 'scale(1.35)';
      selectedDiv.style.transition = 'all 0.05s ease-in';
    }
    // Depending on which piece has been selected, the functions return an array of indexes which represent legal moves to be highlighted green in the view.
  } else if (clickCounter >= 1) {
    // Handles piece placement.
    placementDiv = evt.target;
    placementIdx = squareEls.indexOf(placementDiv);
    if (selectedDiv === placementDiv) {
      // if player clicks on the same piece twice, everything 'reverts back to normal' from before the piece was first selected.
      selectedDiv.style.transform = 'scale(1)';
      selectedDiv.style.transition = 'all 0.05s ease-in';
      selectedDiv.style.zIndex = 0;
      legalMoves.forEach(function(move) {
        squareEls[move].style.backgroundColor = '';
      });
      render();
    } else if (legalMoves.indexOf(placementIdx) !== -1) {
      if (canCastle()) {
        goCastle();
      } else {
        if (piece === 'wk') playerLookup[piece].moved = true;
        if (piece === 'bk') playerLookup[piece].moved = true;
      }
      // if the player clicks on any square that corresponds to the legalMoves array, that square is updated to represent the piece has been placed, and the orignial square is 'returned to normal'.
      board[placementIdx] = piece;
      selectedDiv.style.transform = 'scale(1)';
      selectedDiv.style.zIndex = 0;
      legalMoves.forEach(function(move) {
        squareEls[move].style.backgroundColor = '';
      });
      board[selectedIdx] = 'em';
      playerLookup[piece].moves++;
      /* icebox
      check = inCheck(piece, placementIdx)
      */
      winner = getWinner();
      if (winner) {
        render();
        return;
      }
      turn *= -1;
      render();
    }
  }
}
function canCastle() {
  if (piece[0] === 'w') {
    if (playerLookup.wr1.moved === false && playerLookup[piece].moved === false && board[57] === 'em' && board[58] === 'em' && board[59] === 'em') {
      legalMoves.push(58);
    }
    if (playerLookup.wr2.moved === false && playerLookup[piece].moved === false && board[61] === 'em' && board[62] === 'em') {
      legalMoves.push(62);
    }
    return legalMoves.indexOf(58) !== -1 || legalMoves.indexOf(62) !== -1 ? true : null;
  } else if (piece[0] === 'b') {
    if (playerLookup.br1.moved === false && playerLookup[piece].moved === false && board[5] === 'em' && board[6] === 'em') {
      legalMoves.push(6);
    }
    if (playerLookup.br2.moved === false && playerLookup[piece].moved === false && board[1] === 'em' && board[2] === 'em' && board[3] === 'em') {
      legalMoves.push(2);
    }
    return legalMoves.indexOf(6) !== -1 || legalMoves.indexOf(2) !== -1 ? true : null;
  }
}
function goCastle() {
  if (piece === 'wk' && selectedIdx === 60 && placementIdx == 62) {
    board[placementIdx] = piece;
    legalMoves.forEach(function(move) {
      squareEls[move].style.backgroundColor = '';
    });
    board[selectedIdx] = 'em';
    board[selectedIdx + 1] = 'wr2';
    board[63] = 'em';
    playerLookup[piece].moved = true;
    playerLookup.wr2.moved = true;
  } else if(piece === 'wk' && selectedIdx === 60 && placementIdx == 58) {
    board[placementIdx] = piece;
    legalMoves.forEach(function(move) {
      squareEls[move].style.backgroundColor = '';
    });
    board[selectedIdx] = 'em';
    board[selectedIdx - 1] = 'wr1';
    board[56] = 'em';
    playerLookup[piece].moved = true;
    playerLookup.wr1.moved = true;
  } else if (piece === 'bk' && selectedIdx === 4 && placementIdx == 6) {
    board[placementIdx] = piece;
    legalMoves.forEach(function(move) {
      squareEls[move].style.backgroundColor = '';
    });
    board[selectedIdx] = 'em';
    board[selectedIdx + 1] = 'br1';
    board[7] = 'em';
    playerLookup[piece].moved = true;
    playerLookup.br1.moved = true;
  } else if (piece === 'bk' && selectedIdx === 4 && placementIdx == 2) {
    board[placementIdx] = piece;
    legalMoves.forEach(function(move) {
      squareEls[move].style.backgroundColor = '';
    });
    board[selectedIdx] = 'em';
    board[selectedIdx - 1] = 'br2';
    board[0] = 'em';
    playerLookup[piece].moved = true;
    playerLookup.br2.moved = true;
  }
}
// Each individual function assigns all possible moves based on the current position when first selected to an array named legalMoves.
function pawnMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let twoSquares = squareAbove - boardWidth;
  let modal = pieceIdx % boardWidth;
  if (piece[0] === 'w') {
    // code for white pawns
    if (pieceIdx < 8) return;
    if (board[squareAbove] === 'em') {
      legalMoves.push(squareAbove);
    };
    if (playerLookup[piece].moves === 0 && board[twoSquares] === 'em') {
      legalMoves.push(twoSquares);
    };
    if (modal === 7 || board[squareAbove + 1][0] === 'w') {
    } else if (board[squareAbove + 1] !== 'em') {
      legalMoves.push(squareAbove + 1);
    };
    if (modal === 0 || board[squareAbove - 1][0] === 'w') {
    } else if (board[squareAbove - 1] !== 'em') {
      legalMoves.push(squareAbove - 1);
    };
  } else if (piece[0] === 'b') {
    // code for black pawns
    squareAbove = pieceIdx + boardWidth;
    twoSquares = squareAbove + boardWidth;
    if (pieceIdx > 55) return;
    if (board[squareAbove] === 'em') {
      legalMoves.push(squareAbove);
    };
    if (playerLookup[piece].moves === 0 && board[twoSquares] === 'em') {
      legalMoves.push(twoSquares);
    };
    if (modal === 7 || board[squareAbove + 1][0] === 'b') {
    } else if (board[squareAbove + 1] !== 'em') {
      legalMoves.push(squareAbove + 1);
    };
    if (modal === 0 || board[squareAbove - 1][0] === 'b') {
    } else if (board[squareAbove - 1] !== 'em') {
      legalMoves.push(squareAbove - 1);
    };
  }
}
function bishopMove(pieceIdx) {
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
  if (piece[0] === 'w') {
    /*-------------------- WHITE BISHOP CODE --------------------*/
    if (board[rUDiag] !== undefined) {
      while (board[rUDiag] === undefined || board[rUDiag] === 'em' || board[rUDiag][0] === 'b') {
        if (modal === 7 || board[rUDiag] === undefined) break;
        legalMoves.push(rUDiag);
        if (board[rUDiag][0] === 'b' || (rUDiag % boardWidth) === 7) break;
        right++;
        up += boardWidth;
        rUDiag = pieceIdx - up + right;
      }
      up = boardWidth;
      right = 1;
    }
    if (board[rDDiag] !== undefined) {
      while (board[rDDiag] === undefined || board[rDDiag] === 'em' || board[rDDiag][0] === 'b') {
        if (modal === 7 || board[rDDiag] === undefined) break;
        legalMoves.push(rDDiag);
        if (board[rDDiag][0] === 'b' || (rDDiag % boardWidth) === 7) break;
        right++;
        down += boardWidth;
        rDDiag = pieceIdx + down + right;
      }
    }
    if (board[lUDiag] !== undefined) {
      down = boardWidth;
      right = 1;
      while (board[lUDiag] === undefined || board[lUDiag] === 'em' || board[lUDiag][0] === 'b') {
        if (modal === 0 || board[lUDiag] === undefined) break;
        legalMoves.push(lUDiag);
        if (board[lUDiag][0] === 'b' || (lUDiag % boardWidth) === 0) break;
        left++;
        up += boardWidth;
        lUDiag = pieceIdx - up - left;
      }
      left = 1;
    }
    if (board[lDDiag] !== undefined) {
      while (board[lDDiag] === undefined || board[lDDiag] === 'em' || board[lDDiag][0] === 'b') {
        if (modal === 0 || board[lDDiag] === undefined) break;
        legalMoves.push(lDDiag);
        if (board[lDDiag][0] === 'b' || (lDDiag % boardWidth) === 0) break;
        left++;
        down += boardWidth;
        lDDiag = pieceIdx + down - left;
      }
    }
  } else if (piece[0] === 'b') {
    /*-------------------- BLACK BISHOP CODE --------------------*/
    if (board[rUDiag] !== undefined) {
      // console.log(legalMoves);
      while (board[rUDiag] === undefined || board[rUDiag] === 'em' || board[rUDiag][0] === 'w') {
        console.log(legalMoves);
        if (modal === 7 || board[rUDiag] === undefined) break;
        legalMoves.push(rUDiag);
        if (board[rUDiag][0] === 'w' || (rUDiag % boardWidth) === 7) break;
        right++;
        up += boardWidth;
        rUDiag = pieceIdx - up + right;
      }
      up = boardWidth;
      right = 1;
    }
    if (board[rDDiag] !== undefined) {
      while (board[rDDiag] === undefined || board[rDDiag] === 'em' || board[rDDiag][0] === 'w') {
        if (modal === 7 || board[rDDiag] === undefined) break;
        legalMoves.push(rDDiag);
        if (board[rDDiag][0] === 'w' || (rDDiag % boardWidth) === 7) break;
        right++;
        down += boardWidth;
        rDDiag = pieceIdx + down + right;
      }
      down = boardWidth;
      right = 1;
    }
    if (board[lUDiag] !== undefined) {
      while (board[lUDiag] === undefined || board[lUDiag] === 'em' || board[lUDiag][0] === 'w') {
        if (modal === 0 || board[lUDiag] === undefined) break;
        legalMoves.push(lUDiag);
        if (board[lUDiag][0] === 'w' || (lUDiag % boardWidth) === 0) break;
        left++;
        up += boardWidth;
        lUDiag = pieceIdx - up - left;
      }
      left = 1;
    }
    if (board[lDDiag] !== undefined) {
      while (board[lDDiag] === undefined || board[lDDiag] === 'em' || board[lDDiag][0] === 'w') {
        if (modal === 0 || board[lDDiag] === undefined) break;
        legalMoves.push(lDDiag);
        if (board[lDDiag][0] === 'w' || (lDDiag % boardWidth) === 0) break;
        left++;
        down += boardWidth;
        lDDiag = pieceIdx + down - left;
      }
    }
  }
  // console.log(legalMoves);
}
function knightMove(pieceIdx) {

  let up = pieceIdx - (boardWidth * 2);
  let down = pieceIdx + (boardWidth * 2);
  let left = pieceIdx - 2;
  let right = pieceIdx + 2;
  let modal = pieceIdx % boardWidth;
  if (piece[0] === 'w') {
    // If the piece is white, then run conditional code
    if (pieceIdx < 16) {
      // if the selected piece is on the the 7th or 8th rank, then do not push any index above the board (negative numbers)
    } else {
      if (modal === 0) {
        // If the piece is on the other ranks but on the a file, then do not run sequential code
      } else if (board[up - 1][0] === 'b' || board[up - 1] === 'em') {
        // otherwise if the placement is em and is an opponent, then push the index which is two squares up and one to the left.
        legalMoves.push(up - 1);
        }
      if (modal === 7) {
        // If the piece is on the other ranks but on the h file, then do not run sequential code
      } else if (board[up + 1][0] === 'b' || board[up + 1] === 'em') {
        // otherwise if the placement is em and is an opponent, then push the index which is two squares up and one to the right.
          legalMoves.push(up + 1);
      }
    }
    if (modal > 5 || board[right - boardWidth] === undefined || board[right + boardWidth] === undefined) {
      // if the piece is the g or h file, or the placement is undefined, then only run sequential code
      if (pieceIdx > 55 && modal < 6 && board[right - boardWidth][0] !== 'w') {
        legalMoves.push(right - boardWidth);
      } else if (pieceIdx < 8 && modal < 6 && board[right + boardWidth][0] !== 'w') {
        legalMoves.push(right + boardWidth);
      }
    } else {
      if (board[right - boardWidth][0] === 'b' || board[right - boardWidth] === 'em') {
        // if placement is an opponent or em, then push the index
        legalMoves.push(right - boardWidth);
      }
      if (board[right + boardWidth][0] === 'b' || board[right + boardWidth] === 'em') {
        // if placement is an opponent or em, then push the index
        legalMoves.push(right + boardWidth);
      }
    }
    if (pieceIdx > 47) {
      // if the selected piece is on the the 1st or 2nd rank, then do not push any index below the board (indexes beyond 63) 
    } else {
      if (modal === 7) {
        // if the selected piece is on the h file, then do not run sequential code
      } else if (board[down + 1][0] === 'b' || board[down + 1] === 'em') {
        // if the placement is an opponent or em, then push the index
          legalMoves.push(down + 1);
      }
      if (modal === 0) {
        // if the selected piece is on the a file, then do not run sequential code
      } else if (board[down - 1][0] === 'b' || board[down - 1] === 'em') {
        // if the placement is an opponent or em, then push the index
          legalMoves.push(down - 1);
      }
    }
    if (modal < 2 || board[left + boardWidth] === undefined || board[left - boardWidth] === undefined) {
      // if the piece is the a or b file, or the placement is undefined, then only run sequential code
      if (pieceIdx > 55 && modal > 1 && board[left - boardWidth][0] !== 'w') {
        legalMoves.push(left - boardWidth);
      } else if (pieceIdx < 8 && modal > 1 && board[left + boardWidth][0] !== 'w') {
        legalMoves.push(left + boardWidth);
      }
    } else {
      if (board[left + boardWidth][0] === 'b' || board[left + boardWidth] === 'em') {
        // if placement is an opponent or em, then push the index
        legalMoves.push(left + boardWidth);
      }
      if (board[left - boardWidth][0] === 'b' || board[left - boardWidth] === 'em') {
        // if placement is an opponent or em, then push the index
        legalMoves.push(left - boardWidth);
      }
    }
  } else if (piece[0] === 'b') {
    // If the piece is black, then run conditional code
    if (pieceIdx < 16) {
      // if the selected piece is on the the 7th or 8th rank, then do not push any index above the board (negative numbers)
    } else {
      if (modal === 0) {
        // If the piece is on the other ranks but on the a file, then do not run sequential code
      } else if (board[up - 1][0] === 'w' || board[up - 1] === 'em') {
        // otherwise if the placement is em and is an opponent, then push the index which is two squares up and one to the left.
        legalMoves.push(up - 1);
        }
      if (modal === 7) {
        // If the piece is on the other ranks but on the h file, then do not run sequential code
      } else if (board[up + 1][0] === 'w' || board[up + 1] === 'em') {
        // otherwise if the placement is em and is an opponent, then push the index which is two squares up and one to the right.
          legalMoves.push(up + 1);
      }
    }
    if (modal > 5 || board[right - boardWidth] === undefined || board[right + boardWidth] === undefined) {
      // if the piece is the g or h file, or the placement is undefined, then only run sequential code
      if (pieceIdx > 55 && modal < 6 && board[right - boardWidth][0] !== 'b') {
        legalMoves.push(right - boardWidth);
      } else if (pieceIdx < 8 && modal < 6 && board[right + boardWidth][0] !== 'b') {
        legalMoves.push(right + boardWidth);
      }
    } else {
      if (board[right - boardWidth][0] === 'w' || board[right - boardWidth] === 'em') {
        // if placement is an opponent or em, then push the index
        legalMoves.push(right - boardWidth);
      }
      if (board[right + boardWidth][0] === 'w' || board[right + boardWidth] === 'em') {
        // if placement is an opponent or em, then push the index
        legalMoves.push(right + boardWidth);
      }
    }
    if (pieceIdx > 47) {
      // if the selected piece is on the the 1st or 2nd rank, then do not push any index below the board (indexes beyond 63) 
    } else {
      if (modal === 7) {
        // if the selected piece is on the h file, then do not run sequential code
      } else if (board[down + 1][0] === 'w' || board[down + 1] === 'em') {
        // if the placement is an opponent or em, then push the index
          legalMoves.push(down + 1);
      }
      if (modal === 0) {
        // if the selected piece is on the a file, then do not run sequential code
      } else if (board[down - 1][0] === 'w' || board[down - 1] === 'em') {
        // if the placement is an opponent or em, then push the index
          legalMoves.push(down - 1);
      }
    }
    if (modal < 2 || board[left + boardWidth] === undefined || board[left - boardWidth] === undefined) {
      // if the piece is the a or b file, or the placement is undefined, then only run sequential code
      if (pieceIdx > 55 && modal > 1 && board[left - boardWidth][0] !== 'b') {
        legalMoves.push(left - boardWidth);
      } else if (pieceIdx < 8 && modal > 1 && board[left + boardWidth][0] !== 'b') {
        legalMoves.push(left + boardWidth);
      }
    } else {
      if (board[left + boardWidth][0] === 'w' || board[left + boardWidth] === 'em') {
        // if placement is an opponent or em, then push the index
        legalMoves.push(left + boardWidth);
      }
      if (board[left - boardWidth][0] === 'w' || board[left - boardWidth] === 'em') {
        // if placement is an opponent or em, then push the index
        legalMoves.push(left - boardWidth);
      }
    }

  }
}
function rookMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let squareBelow = pieceIdx + boardWidth;
  let modal = pieceIdx % boardWidth;
  let right = 1;
  let left = 1;
  if (piece[0] === 'w') {
    while (board[squareAbove] === undefined || board[squareAbove] === 'em' || board[squareAbove][0] === 'b') {
      if (board[squareAbove] === undefined) break;
      legalMoves.push(squareAbove);
      if (board[squareAbove][0] === 'b') break;
      squareAbove -= boardWidth;
    }
    while (board[pieceIdx + right] === undefined || board[pieceIdx + right] === 'em' || board[pieceIdx + right][0] === 'b') {
      if (modal === 7 || board[pieceIdx + right] === undefined) break;
      legalMoves.push(pieceIdx + right);
      if ((pieceIdx + right) % boardWidth === 7 || board[pieceIdx + right][0] === 'b') break;
      right++;
    }
    while (board[squareBelow] === undefined || board[squareBelow] === 'em' || board[squareBelow][0] === 'b') {
      if (modal === 7 || board[squareBelow] === undefined) break;
      legalMoves.push(squareBelow);
      if (board[squareBelow][0] === 'b') break;
      squareBelow += boardWidth;
    }
    while (board[pieceIdx - left] === undefined || board[pieceIdx - left] === 'em' || board[pieceIdx - left][0] === 'b') {
      if (modal === 0 || board[pieceIdx - left] === undefined) break;
      legalMoves.push(pieceIdx - left);
      if ((pieceIdx - left) % boardWidth === 0 || board[pieceIdx - left][0] === 'b') break;
      left++;
    }
  } else if (piece[0] === 'b') {
    while (board[squareAbove] === undefined || board[squareAbove] === 'em' || board[squareAbove][0] === 'w') {
      if (board[squareAbove] === undefined) break;
      legalMoves.push(squareAbove);
      if (board[squareAbove][0] === 'w') break;
      squareAbove -= boardWidth;
    }
    while (board[pieceIdx + right] === undefined || board[pieceIdx + right] === 'em' || board[pieceIdx + right][0] === 'w') {
      if (modal === 7 || board[pieceIdx + right] === undefined) break;
      legalMoves.push(pieceIdx + right);
      if ((pieceIdx + right) % boardWidth === 7 || board[pieceIdx + right][0] === 'w') break;
      right++;
    }
    while (board[squareBelow] === undefined || board[squareBelow] === 'em' || board[squareBelow][0] === 'w') {
      if (board[squareBelow] === undefined) break;
      legalMoves.push(squareBelow);
      if (board[squareBelow][0] === 'w') break;
      squareBelow += boardWidth;
    }
    while (board[pieceIdx - left] === undefined || board[pieceIdx - left] === 'em' || board[pieceIdx - left][0] === 'w') {
      if (modal === 0 || board[pieceIdx - right] === undefined) break;
      legalMoves.push(pieceIdx - left);
      if ((pieceIdx - left) % boardWidth === 0 || board[pieceIdx - left][0] === 'w') break;
      left++;
    }
  }
}
function queenMove(pieceIdx) {
  // Queeny behaves like both of thes pieces combined.
  bishopMove(pieceIdx);
  rookMove(pieceIdx);
}
function kingMove(pieceIdx) {
  let squareAbove = pieceIdx - boardWidth;
  let squareBelow = pieceIdx + boardWidth;
  let modal = pieceIdx % boardWidth;
  if (piece[0] === 'w') {
    if (pieceIdx < 8 || board[squareAbove] === undefined) {
    } else if (board[squareAbove] === 'em' || board[squareAbove][0] === 'b') {
        legalMoves.push(squareAbove);
      }
    if (modal === 7) { 
    } else {
      if (board[squareAbove + 1] === undefined) {
      } else if (board[squareAbove + 1] === 'em' || board[squareAbove + 1][0] === 'b') {
        legalMoves.push(squareAbove + 1);
      }
      if(board[pieceIdx + 1] === undefined) {
        // Do nothing
      } else if (board[pieceIdx + 1] === 'em' || board[pieceIdx + 1][0] === 'b') {
        legalMoves.push(pieceIdx + 1);
      }
      if (board[squareBelow + 1] === undefined) {
        // Do nothing
      } else if (board[squareBelow + 1] === 'em' || board[squareBelow + 1][0] === 'b') {
        legalMoves.push(squareBelow + 1);
      }
    }
    if (pieceIdx > 55 || board[squareBelow] === undefined) {
    } else if (board[squareBelow] === 'em' || board[squareBelow][0] === 'b') {
      legalMoves.push(squareBelow);
    }
    if (modal === 0) {
    } else {
      if (board[squareBelow - 1] === undefined) {
      } else if (board[squareBelow - 1] === 'em' || board[squareBelow - 1][0] === 'b') {
        legalMoves.push(squareBelow - 1);
      }
      if (board[pieceIdx - 1] === undefined) {
      } else if (board[pieceIdx - 1] === 'em' || board[pieceIdx - 1][0] === 'b') {
        legalMoves.push(pieceIdx - 1);
      }
      if (board[squareAbove - 1] === undefined) {
      } else if (board[squareAbove - 1] === 'em' || board[squareAbove - 1][0] === 'b') {
        legalMoves.push(squareAbove - 1);
      }
    }
  } else if (piece[0] === 'b') {
    if (pieceIdx < 8 || board[squareAbove] === undefined) {
    } else if (board[squareAbove] === 'em' || board[squareAbove][0] === 'w') {
        legalMoves.push(squareAbove);
      }
    if (modal === 7) {
      // Do nothing
    } else {
      if (board[squareAbove + 1] === undefined) {
        // Do nothing
      } else if (board[squareAbove + 1] === 'em' || board[squareAbove + 1][0] === 'w') {
        legalMoves.push(squareAbove + 1);
      }
      if(board[pieceIdx + 1] === undefined) {
        // Do nothing
      } else if (board[pieceIdx + 1] === 'em' || board[pieceIdx + 1][0] === 'w') {
        legalMoves.push(pieceIdx + 1);
      }
      if (board[squareBelow + 1] === undefined) {
        // Do nothing
      } else if (board[squareBelow + 1] === 'em' || board[squareBelow + 1][0] === 'w') {
        legalMoves.push(squareBelow + 1);
      }
    }
    if (pieceIdx > 55 || board[squareBelow] === undefined) {
    } else if (board[squareBelow] === 'em' || board[squareBelow][0] === 'w') {
      legalMoves.push(squareBelow);
    }
    if (modal === 0) {
    } else {
      if (board[squareBelow - 1] === undefined) {
      } else if (board[squareBelow - 1] === 'em' || board[squareBelow - 1][0] === 'w') {
        legalMoves.push(squareBelow - 1);
      }
      if (board[pieceIdx - 1] === undefined) {
      } else if (board[pieceIdx - 1] === 'em' || board[pieceIdx - 1][0] === 'w') {
        legalMoves.push(pieceIdx - 1);
      }
      if (board[squareAbove - 1] === undefined) {
      } else if (board[squareAbove - 1] === 'em' || board[squareAbove - 1][0] === 'w') {
        legalMoves.push(squareAbove - 1);
      }
    }
  }
}
function getWinner() {
  // If either king is taken, winner is given a value corresponding to who is now the victor.
  if (board.indexOf('wk') === -1) {
    return 'bk';
  } else if (board.indexOf('bk') === -1) {
    return 'wk';
  } else {
    return null;
  }
}
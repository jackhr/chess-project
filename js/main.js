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
  empty: {
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
    'br2', 'bn', 'empty', 'empty', 'bk', 'empty', 'bn', 'br1',
    'bp8', 'bp7', 'bp6', 'bp5', 'bp4', 'bp3', 'bp2', 'bp1',
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
    'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty',
    'wp1', 'wp2', 'wp3', 'wp4', 'wp5', 'wp6', 'wp7', 'wp8',
    'wr1', 'empty', 'empty', 'empty', 'wk', 'empty', 'empty', 'wr2'
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

  /*  icebox in-check messages
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
  } else if (winner === "bk") {
    blackWins.style.backgroundImage = playerLookup[winner]['imgURL'];
    blackWins.style.backgroundSize = 'cover';
    msgEl.textContent = "Black wins!";
  } else if (winner === "wk") {
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
    piece = board[selectedIdx];
    if ((piece[0] === 'w' && turn < 0) || (piece[0] === 'b' && turn > 0) || piece === 'empty' || winner) return;
    // if the player clicks on anything but their own pieces, they are returned from the function and the click counter never increments allowing for another attempt at a better first click.
    clickCounter++;
    if (piece[0] === 'b') {
      selectedDiv.style.transform = 'scale(1.35) rotate(180deg)';
    } else {
      selectedDiv.style.transform = 'scale(1.35)';
      selectedDiv.style.transition = 'all 0.05s ease-in';
    }
    // Depending on which piece has been selected, the functions return an array of indexes which represent legal moves to be highlighted green in the view.
    if (piece[1] === 'p') pawnMove(selectedIdx);
    if (piece[1] === 'b') bishopMove(selectedIdx);
    if (piece[1] === 'n') knightMove(selectedIdx);
    if (piece[1] === 'r') rookMove(selectedIdx);
    if (piece[1] === 'q') queenMove(selectedIdx);
    if (piece[1] === 'k') kingMove(selectedIdx);
    canCastle();
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

      // if (canCastle() && piece === 'wk' && selectedIdx === 60 && placementIdx == 62) {
      //   board[placementIdx] = piece;
      //   legalMoves.forEach(function(move) {
      //     squareEls[move].style.backgroundColor = '';
      //   });
      //   board[selectedIdx] = 'empty';
      //   board[selectedIdx + 1] = 'wr2';
      //   board[63] = 'empty';
      //   playerLookup[piece].moved = true;
      //   playerLookup.wr2.moved = true;
      //   winner = getWinner();
      //   turn *= -1;
      //   render()
      // } 
      console.log(piece, selectedIdx, placementIdx)


      // if the player clicks on any square that corresponds to the legalMoves array, that square is updated to represent the piece has been placed, and the orignial square is 'returned to normal'.
      board[placementIdx] = piece;
      selectedDiv.style.transform = 'scale(1)';
      legalMoves.forEach(function(move) {
        squareEls[move].style.backgroundColor = '';
      });
      board[selectedIdx] = 'empty';
      playerLookup[piece].moves++;
      /* icebox
      check = inCheck(piece, placementIdx)
      */
      winner = getWinner();
      turn *= -1;
      render();
    }
  }
}

function canCastle() {
  if (piece[0] === 'w') {
    if (playerLookup.wr1.moved === false && playerLookup[piece].moved === false && board[57] === 'empty' && board[58] === 'empty' && board[59] === 'empty') {
      legalMoves.push(58);
    }
    if (playerLookup.wr2.moved === false && playerLookup[piece].moved === false && board[61] === 'empty' && board[62] === 'empty') {
      legalMoves.push(62);
    }
  } else if (piece[0] === 'b') {
    if (playerLookup.br1.moved === false && playerLookup[piece].moved === false && board[5] === 'empty' && board[6] === 'empty') {
      legalMoves.push(6);
    }
    if (playerLookup.br2.moved === false && playerLookup[piece].moved === false && board[1] === 'empty' && board[2] === 'empty' && board[3] === 'empty') {
      legalMoves.push(2);
    }
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
    if (board[squareAbove] === 'empty') {
      legalMoves.push(squareAbove);
    };
    if (playerLookup[piece].moves === 0 && board[twoSquares] === 'empty') {
      legalMoves.push(twoSquares);
    };
    if (modal === 7 || board[squareAbove + 1][0] === 'w') {
    } else if (board[squareAbove + 1] !== 'empty') {
      legalMoves.push(squareAbove + 1);
    };
    if (modal === 0 || board[squareAbove - 1][0] === 'w') {
    } else if (board[squareAbove - 1] !== 'empty') {
      legalMoves.push(squareAbove - 1);
    };
  } else if (piece[0] === 'b') {
    // code for black pawns
    squareAbove = pieceIdx + boardWidth;
    twoSquares = squareAbove + boardWidth;
    if (pieceIdx > 55) return;
    if (board[squareAbove] === 'empty') {
      legalMoves.push(squareAbove);
    };
    if (playerLookup[piece].moves === 0 && board[twoSquares] === 'empty') {
      legalMoves.push(twoSquares);
    };
    if (modal === 7 || board[squareAbove + 1][0] === 'b') {
    } else if (board[squareAbove + 1] !== 'empty') {
      legalMoves.push(squareAbove + 1);
    };
    if (modal === 0 || board[squareAbove - 1][0] === 'b') {
    } else if (board[squareAbove - 1] !== 'empty') {
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
      while (board[rUDiag] === undefined || board[rUDiag] === 'empty' || board[rUDiag][0] === 'b') {
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
      while (board[rDDiag] === undefined || board[rDDiag] === 'empty' || board[rDDiag][0] === 'b') {
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
      while (board[lUDiag] === undefined || board[lUDiag] === 'empty' || board[lUDiag][0] === 'b') {
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
      while (board[lDDiag] === undefined || board[lDDiag] === 'empty' || board[lDDiag][0] === 'b') {
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
      while (board[rUDiag] === undefined || board[rUDiag] === 'empty' || board[rUDiag][0] === 'w') {
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
      while (board[rDDiag] === undefined || board[rDDiag] === 'empty' || board[rDDiag][0] === 'w') {
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
      while (board[lUDiag] === undefined || board[lUDiag] === 'empty' || board[lUDiag][0] === 'w') {
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
      while (board[lDDiag] === undefined || board[lDDiag] === 'empty' || board[lDDiag][0] === 'w') {
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
      } else if (board[up - 1][0] === 'b' || board[up - 1] === 'empty') {
        // otherwise if the placement is empty and is an opponent, then push the index which is two squares up and one to the left.
        legalMoves.push(up - 1);
        }
      if (modal === 7) {
        // If the piece is on the other ranks but on the h file, then do not run sequential code
      } else if (board[up + 1][0] === 'b' || board[up + 1] === 'empty') {
        // otherwise if the placement is empty and is an opponent, then push the index which is two squares up and one to the right.
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
      if (board[right - boardWidth][0] === 'b' || board[right - boardWidth] === 'empty') {
        // if placement is an opponent or empty, then push the index
        legalMoves.push(right - boardWidth);
      }
      if (board[right + boardWidth][0] === 'b' || board[right + boardWidth] === 'empty') {
        // if placement is an opponent or empty, then push the index
        legalMoves.push(right + boardWidth);
      }
    }
    if (pieceIdx > 47) {
      // if the selected piece is on the the 1st or 2nd rank, then do not push any index below the board (indexes beyond 63) 
    } else {
      if (modal === 7) {
        // if the selected piece is on the h file, then do not run sequential code
      } else if (board[down + 1][0] === 'b' || board[down + 1] === 'empty') {
        // if the placement is an opponent or empty, then push the index
          legalMoves.push(down + 1);
      }
      if (modal === 0) {
        // if the selected piece is on the a file, then do not run sequential code
      } else if (board[down - 1][0] === 'b' || board[down - 1] === 'empty') {
        // if the placement is an opponent or empty, then push the index
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
      if (board[left + boardWidth][0] === 'b' || board[left + boardWidth] === 'empty') {
        // if placement is an opponent or empty, then push the index
        legalMoves.push(left + boardWidth);
      }
      if (board[left - boardWidth][0] === 'b' || board[left - boardWidth] === 'empty') {
        // if placement is an opponent or empty, then push the index
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
      } else if (board[up - 1][0] === 'w' || board[up - 1] === 'empty') {
        // otherwise if the placement is empty and is an opponent, then push the index which is two squares up and one to the left.
        legalMoves.push(up - 1);
        }
      if (modal === 7) {
        // If the piece is on the other ranks but on the h file, then do not run sequential code
      } else if (board[up + 1][0] === 'w' || board[up + 1] === 'empty') {
        // otherwise if the placement is empty and is an opponent, then push the index which is two squares up and one to the right.
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
      if (board[right - boardWidth][0] === 'w' || board[right - boardWidth] === 'empty') {
        // if placement is an opponent or empty, then push the index
        legalMoves.push(right - boardWidth);
      }
      if (board[right + boardWidth][0] === 'w' || board[right + boardWidth] === 'empty') {
        // if placement is an opponent or empty, then push the index
        legalMoves.push(right + boardWidth);
      }
    }
    if (pieceIdx > 47) {
      // if the selected piece is on the the 1st or 2nd rank, then do not push any index below the board (indexes beyond 63) 
    } else {
      if (modal === 7) {
        // if the selected piece is on the h file, then do not run sequential code
      } else if (board[down + 1][0] === 'w' || board[down + 1] === 'empty') {
        // if the placement is an opponent or empty, then push the index
          legalMoves.push(down + 1);
      }
      if (modal === 0) {
        // if the selected piece is on the a file, then do not run sequential code
      } else if (board[down - 1][0] === 'w' || board[down - 1] === 'empty') {
        // if the placement is an opponent or empty, then push the index
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
      if (board[left + boardWidth][0] === 'w' || board[left + boardWidth] === 'empty') {
        // if placement is an opponent or empty, then push the index
        legalMoves.push(left + boardWidth);
      }
      if (board[left - boardWidth][0] === 'w' || board[left - boardWidth] === 'empty') {
        // if placement is an opponent or empty, then push the index
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
    while (board[squareAbove] === undefined || board[squareAbove] === 'empty' || board[squareAbove][0] === 'b') {
      if (board[squareAbove] === undefined) break;
      legalMoves.push(squareAbove);
      if (board[squareAbove][0] === 'b') break;
      squareAbove -= boardWidth;
    }
    while (board[pieceIdx + right] === undefined || board[pieceIdx + right] === 'empty' || board[pieceIdx + right][0] === 'b') {
      if (modal === 7 || board[pieceIdx + right] === undefined) break;
      legalMoves.push(pieceIdx + right);
      if ((pieceIdx + right) % boardWidth === 7 || board[pieceIdx + right][0] === 'b') break;
      right++;
    }
    while (board[squareBelow] === undefined || board[squareBelow] === 'empty' || board[squareBelow][0] === 'b') {
      if (modal === 7 || board[squareBelow] === undefined) break;
      legalMoves.push(squareBelow);
      if (board[squareBelow][0] === 'b') break;
      squareBelow += boardWidth;
    }
    while (board[pieceIdx - left] === undefined || board[pieceIdx - left] === 'empty' || board[pieceIdx - left][0] === 'b') {
      if (modal === 0 || board[pieceIdx - left] === undefined) break;
      legalMoves.push(pieceIdx - left);
      if ((pieceIdx - left) % boardWidth === 0 || board[pieceIdx - left][0] === 'b') break;
      left++;
    }
  } else if (piece[0] === 'b') {
    while (board[squareAbove] === undefined || board[squareAbove] === 'empty' || board[squareAbove][0] === 'w') {
      if (board[squareAbove] === undefined) break;
      legalMoves.push(squareAbove);
      if (board[squareAbove][0] === 'w') break;
      squareAbove -= boardWidth;
    }
    while (board[pieceIdx + right] === undefined || board[pieceIdx + right] === 'empty' || board[pieceIdx + right][0] === 'w') {
      if (modal === 7 || board[pieceIdx + right] === undefined) break;
      legalMoves.push(pieceIdx + right);
      if ((pieceIdx + right) % boardWidth === 7 || board[pieceIdx + right][0] === 'w') break;
      right++;
    }
    while (board[squareBelow] === undefined || board[squareBelow] === 'empty' || board[squareBelow][0] === 'w') {
      if (board[squareBelow] === undefined) break;
      legalMoves.push(squareBelow);
      if (board[squareBelow][0] === 'w') break;
      squareBelow += boardWidth;
    }
    while (board[pieceIdx - left] === undefined || board[pieceIdx - left] === 'empty' || board[pieceIdx - left][0] === 'w') {
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
    } else if (board[squareAbove] === 'empty' || board[squareAbove][0] === 'b') {
        legalMoves.push(squareAbove);
      }
    if (modal === 7) { 
    } else {
      if (board[squareAbove + 1] === undefined) {
      } else if (board[squareAbove + 1] === 'empty' || board[squareAbove + 1][0] === 'b') {
        legalMoves.push(squareAbove + 1);
      }
      if(board[pieceIdx + 1] === undefined) {
        // Do nothing
      } else if (board[pieceIdx + 1] === 'empty' || board[pieceIdx + 1][0] === 'b') {
        legalMoves.push(pieceIdx + 1);
      }
      if (board[squareBelow + 1] === undefined) {
        // Do nothing
      } else if (board[squareBelow + 1] === 'empty' || board[squareBelow + 1][0] === 'b') {
        legalMoves.push(squareBelow + 1);
      }
    }
    if (pieceIdx > 55 || board[squareBelow] === undefined) {
    } else if (board[squareBelow] === 'empty' || board[squareBelow][0] === 'b') {
      legalMoves.push(squareBelow);
    }
    if (modal === 0) {
    } else {
      if (board[squareBelow - 1] === undefined) {
      } else if (board[squareBelow - 1] === 'empty' || board[squareBelow - 1][0] === 'b') {
        legalMoves.push(squareBelow - 1);
      }
      if (board[pieceIdx - 1] === undefined) {
      } else if (board[pieceIdx - 1] === 'empty' || board[pieceIdx - 1][0] === 'b') {
        legalMoves.push(pieceIdx - 1);
      }
      if (board[squareAbove - 1] === undefined) {
      } else if (board[squareAbove - 1] === 'empty' || board[squareAbove - 1][0] === 'b') {
        legalMoves.push(squareAbove - 1);
      }
    }
  } else if (piece[0] === 'b') {
    if (pieceIdx < 8 || board[squareAbove] === undefined) {
    } else if (board[squareAbove] === 'empty' || board[squareAbove][0] === 'w') {
        legalMoves.push(squareAbove);
      }
    if (modal === 7) {
      // Do nothing
    } else {
      if (board[squareAbove + 1] === undefined) {
        // Do nothing
      } else if (board[squareAbove + 1] === 'empty' || board[squareAbove + 1][0] === 'w') {
        legalMoves.push(squareAbove + 1);
      }
      if(board[pieceIdx + 1] === undefined) {
        // Do nothing
      } else if (board[pieceIdx + 1] === 'empty' || board[pieceIdx + 1][0] === 'w') {
        legalMoves.push(pieceIdx + 1);
      }
      if (board[squareBelow + 1] === undefined) {
        // Do nothing
      } else if (board[squareBelow + 1] === 'empty' || board[squareBelow + 1][0] === 'w') {
        legalMoves.push(squareBelow + 1);
      }
    }
    if (pieceIdx > 55 || board[squareBelow] === undefined) {
    } else if (board[squareBelow] === 'empty' || board[squareBelow][0] === 'w') {
      legalMoves.push(squareBelow);
    }
    if (modal === 0) {
    } else {
      if (board[squareBelow - 1] === undefined) {
      } else if (board[squareBelow - 1] === 'empty' || board[squareBelow - 1][0] === 'w') {
        legalMoves.push(squareBelow - 1);
      }
      if (board[pieceIdx - 1] === undefined) {
      } else if (board[pieceIdx - 1] === 'empty' || board[pieceIdx - 1][0] === 'w') {
        legalMoves.push(pieceIdx - 1);
      }
      if (board[squareAbove - 1] === undefined) {
      } else if (board[squareAbove - 1] === 'empty' || board[squareAbove - 1][0] === 'w') {
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
/*
function inCheck(piece, pieceIdx) {
  // let div = document.getElementById(`sq${pieceIdx}`);
  console.log(placementIdx);
  legalMoves = [];
  if (piece[1] === 'p') {
    pawnMove(placementIdx);
    console.log(legalMoves)
    legalMoves.forEach(function(idx) {
      if (board[idx][1] === 'k') {
        return -1;
      } else {
        return null;
      }
    });
  } else if (piece[1] === 'b') {
    bishopMove(placementIdx);
    legalMoves.forEach(function(idx) {
      if (board[idx][1] === 'k') {
        return -1;
      } else {
        return null;
      }
    });
  } else if (piece[1] === 'n') {
    knightMove(placementIdx);
    legalMoves.forEach(function(idx) {
      if (board[idx][1] === 'k') {
        return -1;
      } else {
        return null;
      }
    });
  } else if (piece[1] === 'r') {
    rookMove(placementIdx);
    legalMoves.forEach(function(idx) {
      if (board[idx][1] === 'k') {
        return -1;
      } else {
        return null;
      }
    });
  } else if (piece[1] === 'q') {
    queenMove(placementIdx);
    legalMoves.forEach(function(idx) {
      if (board[idx][1] === 'k') {
        return -1;
        // kingIdx = idx;
      } else {
        // legalMoves.indexOf(kingIdx) === -1
        // kingIdx = undefined;
        return null;
      }
    });
  }
}
*/
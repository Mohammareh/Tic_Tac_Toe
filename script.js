// IIFE immediatly invoked function expresion
const gameBoard = (() => {
  const _board = new Array(9);

  const modifyBoard = (cell, mark) => {
    _board[cell] = mark;
  };

  returnBoard = () => {
    return _board;
  };

  return { returnBoard, modifyBoard };
})();

// Factory for player
function players(name, marker) {
  return { name, marker };
}

const gameController = (function () {
  const xPlayer = players("Player1", "X");
  const yPlayer = players("Player2", "O");

  // random turn between X and O
  let turn = Math.random() < 0.5 ? "X" : "O";

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  // Add's an event listener to every box
  const clickBoard = document.querySelectorAll(".play-ground");
  for (let i = 0; i < clickBoard.length; i++) {
    clickBoard[i].addEventListener("click", () => {
      if (clickBoard[i].textContent === "") {
        clickBoard[i].textContent = turn;
        gameBoard.modifyBoard(i, turn);
        turn === "X" ? (turn = "O") : (turn = "X");
        console.log(gameBoard.returnBoard());
      }

      // Checks for wins
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
          gameBoard.returnBoard()[a] &&
          gameBoard.returnBoard()[a] === gameBoard.returnBoard()[b] &&
          gameBoard.returnBoard()[a] === gameBoard.returnBoard()[c]
        ) {
          console.log("win");
        }
      }
    });
  }
})();

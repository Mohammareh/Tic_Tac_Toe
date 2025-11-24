// IIFE immediatly invoked function expresion
const gameBoard = (() => {
  const _board = new Array(9);

  const modifyBoard = (cell, mark) => {
    _board[cell] = mark;
  };

  returnBoard = () => _board;

  return { returnBoard, modifyBoard };
})();

// Factory for player
function players(name, marker) {
  points = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  return { name, marker, points };
}

const gameController = (() => {
  const xPlayer = players("Player1", "X");
  const oPlayer = players("Player2", "O");

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

  let winnings = false;
  let showAgainBtn = false;

  function boxesF(i, cellElement) {
    if (cellElement.textContent === "") {
      let puttingMark = turn === "X" ? "X" : "O";
      cellElement.textContent = puttingMark;
      gameBoard.modifyBoard(i, turn);
      turn === "X" ? (turn = "O") : (turn = "X");
    }
    // Checks for wins
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        gameBoard.returnBoard()[a] &&
        gameBoard.returnBoard()[a] === gameBoard.returnBoard()[b] &&
        gameBoard.returnBoard()[a] === gameBoard.returnBoard()[c]
      ) {
        showAgainBtn = true;
        if (gameBoard.returnBoard()[a] === "X") {
          winnings = "X wins";
          xPlayer.points.wins++;
          oPlayer.points.losses++;
        } else if (gameBoard.returnBoard()[a] === "O") {
          winnings = "O wins";
          oPlayer.points.wins++;
          xPlayer.points.losses++;
        }
        return;
      }
    }
    if (!winnings && gameBoard.returnBoard().filter(Boolean).length === 9) {
      winnings = "tie";
      oPlayer.points.ties++;
      xPlayer.points.ties++;
    }
  }

  function xWins(xElement, oElement, winnerText) {
    xElement[0].textContent = `Wins: ${xPlayer.points.wins}`;
    oElement[1].textContent = `Losses: ${oPlayer.points.losses}`;
    winnerText.textContent = "X Wins!";
  }

  function oWins(xElement, oElement, winnerText) {
    oElement[0].textContent = `Wins: ${oPlayer.points.wins}`;
    xElement[1].textContent = `Losses: ${xPlayer.points.losses}`;
    winnerText.textContent = "O Wins!";
  }

  function tiee(xElement, oElement, winnerText) {
    oElement[2].textContent = `Ties: ${oPlayer.points.ties}`;
    xElement[2].textContent = `Ties: ${xPlayer.points.ties}`;
    winnerText.textContent = "Tie!";
  }

  getWinnings = () => winnings;

  resetWinnings = () => (winnings = "");

  getBoxFunction = () => boxesF;

  return {
    getBoxFunction,
    getWinnings,
    xWins,
    oWins,
    tiee,
    resetWinnings,
  };
})();

// doooooooooooooooooooooooooooooooooooom Items
const domItems = (() => {
  const clickBoard = document.querySelectorAll(".play-ground");
  const firstH3 = document.getElementById("first-player-h3");
  const playerXWLT = [
    document.getElementById("px-w"),
    document.getElementById("px-l"),
    document.getElementById("px-t"),
  ];
  const secondH3 = document.getElementById("second-player-h3");
  const playerOWLT = [
    document.getElementById("po-w"),
    document.getElementById("po-l"),
    document.getElementById("po-t"),
  ];
  const againBtn = document.getElementById("play-again");
  const winnerText = document.getElementById("winner-text");
  const fpn = document.getElementById("first-player-name");
  const spn = document.getElementById("second-player-name");
  const playBtn = document.getElementById("play-button");
  const formC = document.getElementById("take-name-form-container");

  playBtn.addEventListener("click", () => {
    if (!fpn.value && spn.value) {
      firstH3.textContent = "Player X";
      secondH3.textContent = spn.value;
    } else if (!spn.value && fpn.value) {
      secondH3.textContent = "Player O";
      firstH3.textContent = fpn.value;
    } else if (spn.value && fpn.value) {
      firstH3.textContent = fpn.value;
      secondH3.textContent = spn.value;
    }

    formC.style.display = "none";
  });

  const boxesF = gameController.getBoxFunction();

  function getBoxClick(index, element) {
    return function () {
      boxesF(index, element);
      if (gameController.getWinnings() === "X wins") {
        listeners.forEach((item) => {
          item.element.removeEventListener("click", item.handler);
        });
        againBtn.style.visibility = "visible";
        gameController.xWins(playerXWLT, playerOWLT, winnerText);
      } else if (gameController.getWinnings() === "O wins") {
        listeners.forEach((item) => {
          item.element.removeEventListener("click", item.handler);
        });
        againBtn.style.visibility = "visible";
        gameController.oWins(playerXWLT, playerOWLT, winnerText);
      } else if (gameController.getWinnings() === "tie") {
        listeners.forEach((item) => {
          item.element.removeEventListener("click", item.handler);
        });
        againBtn.style.visibility = "visible";
        gameController.tiee(playerXWLT, playerOWLT, winnerText);
      }
    };
  }

  const listeners = [];

  // Add's an event listener to every box
  for (let i = 0; i < clickBoard.length; i++) {
    const handler = getBoxClick(i, clickBoard[i]);
    listeners.push({ element: clickBoard[i], handler: handler });
    clickBoard[i].addEventListener("click", handler);
  }

  againBtn.addEventListener("click", () => {
    // _board[cell] = mark;
    for (let i = 0; i < 9; i++) {
      gameBoard.returnBoard()[i] = undefined;
      clickBoard[i].textContent = "";
    }

    for (let i = 0; i < clickBoard.length; i++) {
      const handler = getBoxClick(i, clickBoard[i]);
      listeners.push({ element: clickBoard[i], handler: handler });
      clickBoard[i].addEventListener("click", handler);
    }

    gameController.resetWinnings();
    againBtn.style.visibility = "hidden";

    winnerText.textContent = "";
  });
})();

// '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 6L18 18M18 6L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>' X mark

//'<svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>o</title> <path d="M24.742 7.268c-2.164-2.201-5.174-3.565-8.502-3.565-0.079 0-0.158 0.001-0.237 0.002l0.012-0c-0.072-0.002-0.156-0.002-0.241-0.002-3.333 0-6.347 1.364-8.515 3.564l-0.001 0.001c-2.201 2.164-3.565 5.173-3.565 8.501 0 0.079 0.001 0.158 0.002 0.237l-0-0.012c-0.001 0.066-0.002 0.144-0.002 0.223 0 3.329 1.363 6.339 3.562 8.503l0.002 0.002h0.001c2.17 2.2 5.184 3.563 8.516 3.563 0.085 0 0.169-0.001 0.254-0.003l-0.013 0c0.038 0 0.083 0.001 0.128 0.001 6.717 0 12.162-5.445 12.162-12.162 0-0.045-0-0.089-0.001-0.133l0 0.007c0.001-0.066 0.002-0.145 0.002-0.223 0-3.328-1.364-6.338-3.563-8.501l-0.002-0.002zM16.016 25.752c-0.066 0.002-0.144 0.003-0.222 0.003-2.626 0-5-1.081-6.7-2.821l-0.002-0.002c-1.751-1.699-2.838-4.074-2.838-6.703 0-0.083 0.001-0.165 0.003-0.247l-0 0.012c-0.002-0.070-0.003-0.153-0.003-0.236 0-2.628 1.087-5.002 2.836-6.698l0.002-0.002c1.703-1.744 4.078-2.826 6.705-2.826 0.077 0 0.154 0.001 0.23 0.003l-0.011-0c0.068-0.002 0.147-0.003 0.227-0.003 2.619 0 4.985 1.081 6.677 2.822l0.002 0.002c1.744 1.7 2.825 4.072 2.825 6.697 0 0.085-0.001 0.169-0.003 0.254l0-0.012c0.002 0.072 0.003 0.156 0.003 0.241 0 2.625-1.082 4.997-2.823 6.695l-0.002 0.002c-1.693 1.742-4.059 2.823-6.677 2.823-0.081 0-0.161-0.001-0.241-0.003l0.012 0z"></path> </g></svg>' O mark

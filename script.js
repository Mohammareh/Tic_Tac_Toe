const playBox = document.querySelectorAll("div");

// The board where X and O are placed in
const Gameboard = ((board) => {
  this.board = [];

  function play() {
    mark = GameFlow.getMarker();
  }
  const changeBoard = () => {
    board[cell] = mark;
  };

  return { changeBoard, play };
})();

// Players
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

// Game Brain !!!
const GameFlow = ((cell) => {
  const boy = new Player("Sigma boy", "X");
  const man = new Player("Aura Man", "Y");

  let turn;
  turn = Math.random() <= 0.5 ? "X" : "Y";

  for (let i = 0; i < playBox.length; i++) {
    playBox[i].addEventListener("click", () => {
      if (turn === "Y" && playBox[i].style.backgroundColor === "") {
        playBox[i].style.backgroundColor = "green";
        turn = "X";
        cell = i;
        Gameboard.play();
        console.log(board);
      } else if (turn === "X" && playBox[i].style.backgroundColor === "") {
        playBox[i].style.backgroundColor = "blue  ";
        turn = "Y";
        cell = i;
        Gameboard.play();
        console.log(board);
      }
    });
  }

  const getTurn = () => {
    return turn;
  };

  const getCell = () => {
    return cell;
  };

  const getMarker = () => {
    return Player.marker;
  };

  return { getCell, getTurn, getMarker };

  console.log(turn);
})();

const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
infoDisplay.textContent = "Circle goes first";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
}
createBoard();

function addGo(e) {
  console.log("clicked", e.target);
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.textContent = "it is now " + go + "'s go ";
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function disableBoard() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => {
    square.removeEventListener("click", addGo);
  });
}

function hasClass(element, className) {
  if (!element) return false;
  return element.className.split(" ").includes(className);
}

function checkScore() {
  const AllSquares = document.querySelectorAll(".square");
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

  let winnerDeclared = false;

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      hasClass(AllSquares[cell].firstChild, "circle")
    );
    const crossWins = array.every((cell) =>
      hasClass(AllSquares[cell].firstChild, "cross")
    );

    if (circleWins) {
      infoDisplay.textContent = "Circle Wins!";
      disableBoard();
      winnerDeclared = true;
    } else if (crossWins) {
      infoDisplay.textContent = "Cross Wins!";
      disableBoard();
      winnerDeclared = true;
    }
  });

  if (!winnerDeclared) {
    const isDraw = [...AllSquares].every(
      (square) => square.firstChild !== null
    );
    if (isDraw) {
      infoDisplay.textContent = "No Winner Try Again !";
    }
  }
}

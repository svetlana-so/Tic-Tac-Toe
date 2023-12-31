import { checkForWin } from "./game.js";
const canvas = document.querySelector("#confetti");
const twoPlayers = document.getElementById("two-players");
const onePlayer = document.getElementById("one-player");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetBtn");
const statusText = document.getElementById("statusText");

let currentPlayer = "X";
const board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let gameRunning = false;
let twoPlayersMode = false;

onePlayer.addEventListener("click", () => {
  enableGame(true);
  twoPlayersMode = false;
  if (currentPlayer === "O") {
    setTimeout(makeComputerMove, 500);
  }
});

twoPlayers.addEventListener("click", () => {
  enableGame(false);
  twoPlayersMode = true;
});

//reset btn
resetButton.addEventListener("click", restartGame);

//add click event listener to cells
cells.forEach((cell) => {
  cell.addEventListener("click", cellClick);
});

function enableGame(isOnePlayer) {
  gameRunning = true;
  onePlayer.disabled = true;
  twoPlayers.disabled = true;
  resetButton.disabled = false;
  statusText.textContent = isOnePlayer
    ? `It's ${currentPlayer}'s turn`
    : "Make a move!";
}
function restartGame() {
  onePlayer.disabled = false;
  twoPlayers.disabled = false;
  resetButton.disabled = true;
  //set each element of aray board to an empty str
  board.fill("");
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  gameRunning = false;
  statusText.textContent = "Choose Game Mode";
}

function makeComputerMove() {
  const emptyCells = board
    .map((cell, index) => (cell === "" ? index : -1))
    .filter((index) => index !== -1);
  if (emptyCells.length > 0) {
    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    if (checkForWin(board, currentPlayer)) {
      gameRunning = false;
      return; //stop further move
    }
    currentPlayer = "X";
    statusText.textContent = `It's ${currentPlayer}'s turn`;
  }
}
//handle the cell click
function cellClick(event) {
  if (!gameRunning) {
    return; //clicking is dissable
  }
  const clickedCell = event.target;
  const cellIndex = clickedCell.getAttribute("data-index");
  //if cell is empty the player can make a move
  if (board[cellIndex] === "") {
    board[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    if (checkForWin(board, currentPlayer)) {
      gameRunning = false;
      return; //stop further move
    }
    //this line toggles the current playes between x and o
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `It's ${currentPlayer}'s turn`;
    if (currentPlayer === "O" && !twoPlayersMode) {
      setTimeout(makeComputerMove, 500);
    }
  }
}

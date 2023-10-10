import { winningCombinations } from "./var.js";

export function checkForWin(board, currentPlayer) {
  let roundWon = false;
  const statusText = document.getElementById("statusText");
  const jsConfetti = new JSConfetti();
  for (let i = 0; i < winningCombinations.length; i++) {
    const condition = winningCombinations[i];
    const cellA = board[condition[0]];
    const cellB = board[condition[1]];
    const cellC = board[condition[2]];
    const cellD = board[condition[3]];

    if (cellA === "" || cellB === "" || cellC === "" || cellD === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC && cellC === cellD) {
      roundWon = true;
      break;
    }
  }
  if (!roundWon && !board.includes("")) {
    statusText.textContent = "It's a draw! Play again?";
    return true;
  }
  if (roundWon) {
    jsConfetti.addConfetti();
    statusText.textContent = `${currentPlayer} wins! Play again?`;
    return true;
  }
  return false;
}

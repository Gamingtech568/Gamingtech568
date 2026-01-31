// Simple Tic-Tac-Toe with Minimax AI (unbeatable)
// Keeps code dependency-free and easy to read.

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const newGameBtn = document.getElementById('newGame');
const playerMarkSelect = document.getElementById('playerMark');

let board = Array(9).fill(null);
let human = 'X', ai = 'O';
let gameOver = false;

function createBoard() {
  boardEl.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', onCellClick);
    boardEl.appendChild(cell);
  }
  render();
}

function onCellClick(e) {
  const i = Number(e.currentTarget.dataset.index);
  if (gameOver || board[i]) return;
  makeMove(i, human);
  if (!gameOver) {
    setTimeout(() => {
      const move = bestMove();
      if (move !== null) makeMove(move, ai);
    }, 250);
  }
}

function makeMove(i, mark) {
  if (board[i] || gameOver) return;
  board[i] = mark;
  render();
  const winner = checkWinner(board);
  if (winner) {
    gameOver = true;
    if (winner === 'draw') {
      statusEl.textContent = "It's a draw!";
    } else {
      statusEl.textContent = (winner === human) ? "You win! 🎉" : "Computer wins.";
    }
  }
}

function render() {
  const cells = boardEl.children;
  for (let i = 0; i < 9; i++) {
    cells[i].textContent = board[i] || '';
  }
}

function checkWinner(b) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b1,c] of lines) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  }
  if (b.every(Boolean)) return 'draw';
  return null;
}

// Minimax

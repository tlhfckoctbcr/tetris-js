import Board from "./models/Board";
import Tetrinomino from "./models/Tetrinomino";

const tetrisEl = document.getElementById("tetris");
const board = new Board();

tetrisEl.append(board.canvas);

const tetrinomino = new Tetrinomino(board.context);
board.tetrinominos.push(tetrinomino);

const player = {
  pos: { x: 1, y: 1 },
  matrix: tetrinomino.matrix
};

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

function playerDrop(): void {
  player.pos.y++;
  // if (board.checkCollision(player)) {
  //   console.log("TEST");
  // }
  dropCounter = 0;
}

function update(time = 0) {
  const timeDelta = time - lastTime;
  lastTime = time;

  dropCounter += timeDelta;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  board.advanceFrame(player);
  requestAnimationFrame(update);
}

document.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 37:
      player.pos.x--;
      break;
    case 39:
      player.pos.x++;
      break;
    case 40:
      playerDrop();
      break;
  }
});

update();

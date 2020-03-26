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
  if (board.checkCollision(player)) {
    player.pos.y--;
    board.mergePlayerPosition(player);
    
  }
  dropCounter = 0;
}

function update(time = 0): void {
  const timeDelta = time - lastTime;
  lastTime = time;

  dropCounter += timeDelta;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  board.advanceFrame(player);
  requestAnimationFrame(update);
}

function move(offset: number): void {
  player.pos.x += offset;
  if (board.checkCollision(player)) {
    player.pos.x -= offset;
  }
}

document.addEventListener("keydown", ({ keyCode }): void => {
  switch (keyCode) {
    case 37:
      move(-1);
      break;
    case 39:
      move(+1);
      break;
    case 40:
      playerDrop();
      break;
  }
});

update();

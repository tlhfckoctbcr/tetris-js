import TetrisBoard from "./models/TetrisBoard";
import Tetrinomino from "./models/Tetrinomino";

const tetrisEl = document.getElementById("tetris");
const tetrisBoard = new TetrisBoard();

tetrisEl.append(tetrisBoard.canvas);

const tetrinomino = new Tetrinomino(tetrisBoard.context);
tetrisBoard.tetris.push(tetrinomino);

const player = {
  pos: { x: 1, y: 1 },
  matrix: tetrinomino.matrix
};

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

function playerDrop(): void {
  player.pos.y++;
  if (tetrisBoard.checkCollision(player)) {
    console.log("TEST");
  }
  dropCounter = 0;
}

function update(time = 0) {
  const timeDelta = time - lastTime;
  lastTime = time;

  dropCounter += timeDelta;
  if (dropCounter > dropInterval) {
    playerDrop();
    tetrisBoard.mergePlayerMatrix(player);
  }

  tetrisBoard.drawFrame(player);
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

import Board from "./models/Board";
import Ghost from "./models/Ghost";
import Player from "./models/Player";
import Display from "./models/Display";

const tetrisEl = document.getElementById("tetris");
const cacheEl = document.getElementById("cache");
const nextEl = document.getElementById("next");

const board = new Board();
const cache = new Display();
const next = new Display();
const ghost = new Ghost(board);
const player = new Player(board, ghost, next, cache);

document.addEventListener("keydown", ({ keyCode }): void => {
  switch (keyCode) {
    case 78:
      player.start();
      break;
    case 16:
      player.cacheTetrinomino();
      break;
    case 37:
      player.move(-1);
      break;
    case 39:
      player.move(+1);
      break;
    case 32:
      player.slam();
      break;
    case 40:
      player.drop();
      break;
    case 90:
      player.rotate();
      break;
    case 38:
    case 88:
      player.rotate(1);
      break;
  }
});

tetrisEl.append(board.canvas);
cacheEl.append(cache.canvas);
nextEl.append(next.canvas);

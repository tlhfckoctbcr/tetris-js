import Board from "./models/Board";
import Player from "./models/Player";

const tetrisEl = document.getElementById("tetris");

const board = new Board();
const player = new Player(board);

document.addEventListener("keydown", ({ keyCode }): void => {
  switch (keyCode) {
    case 37:
      player.move(-1);
      break;
    case 39:
      player.move(+1);
      break;
    case 32:
      player.place();
      break;
    case 40:
      player.drop();
      break;
    case 90:
      player.rotate();
      break;
    case 88:
      player.rotate(1);
      break;
  }
});

tetrisEl.append(board.canvas);

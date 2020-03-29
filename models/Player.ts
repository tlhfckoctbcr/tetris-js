import Tetrinomino from "./Tetrinomino";
import Board from "./Board";
import Ghost from "./Ghost";

export default class Player {
  board: Board;
  ghost: Ghost;

  counter = 0;
  interval = 1000;
  previousTime = 0;
  pos = { x: 0, y: 0 };
  matrix = [];

  constructor(board: Board, ghost: Ghost) {
    this.board = board;
    this.ghost = ghost;
    this.update = this.update.bind(this);

    this.update();
    this.reset();
  }

  private reset(): void {
    const tetrinomino = new Tetrinomino();

    this.matrix = tetrinomino.matrix;
    this.pos.y = 0;
    this.pos.x = (this.board.matrix[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);

    this.ghost.setMatrix(this.matrix);
    this.ghost.setPosition(this.pos);

    if (this.board.checkCollision(this.matrix, this.pos)) {
    }

    this.counter = 0;
  }

  private update(time = 0): void {
    const timeDelta = time - this.previousTime;
    this.previousTime = time;
    this.counter += timeDelta;

    if (this.counter > this.interval) {
      this.drop();
    }

    this.board.advanceFrame(this.matrix, this.pos);
    requestAnimationFrame(this.update);
  }

  private place(): void {
    this.board.mergePosition(this.matrix, this.pos);
    this.board.clearLines();
    this.reset();
  }

  move(offset: number): void {
    this.pos.x += offset;
    if (this.board.checkCollision(this.matrix, this.pos)) {
      this.pos.x -= offset;
    }

    this.ghost.setPosition(this.pos);
  }

  drop(): void {
    this.pos.y++;
    if (this.board.checkCollision(this.matrix, this.pos)) {
      this.pos.y--;
      this.place();
    }
    this.counter = 0;
    this.ghost.setPosition(this.pos);
  }

  slam(): void {
    for (let y = 0; y < this.board.matrix.length; y++) {
      this.pos.y++;
      if (this.board.checkCollision(this.matrix, this.pos)) {
        this.pos.y--;
        this.place();
        break;
      }
    }
  }

  rotate(direction = 0): void {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < y; x++) {
        [this.matrix[x][y], this.matrix[y][x]] = [this.matrix[y][x], this.matrix[x][y]];
      }
    }
    if (direction === 1) {
      this.matrix.forEach(row => row.reverse());
    } else {
      this.matrix.reverse();
    }
    // Ensure the tetrinomino doesn't get stuck in the wall
    if (this.board.checkCollision(this.matrix, this.pos)) {
      if (this.pos.x < 0) {
        this.pos.x = 0;
      } else if (this.pos.x + this.matrix.length > 12) {
        this.pos.x = 12 - this.matrix.length;
      } else if (this.pos.y + this.matrix.length > 20) {
        this.pos.y = 20 - this.matrix.length;
      }
    }

    this.ghost.setMatrix(this.matrix);
    this.ghost.setPosition(this.pos);
  }
}

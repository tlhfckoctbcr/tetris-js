import Tetrinomino from "./Tetrinomino";
import Board from "./Board";

export default class Player {
  board: Board;

  counter = 0;
  interval = 1000;
  previousTime = 0;
  pos = { x: 1, y: 1 };
  matrix = [];

  constructor(board: Board) {
    const tetrinomino = new Tetrinomino();

    this.board = board;
    this.matrix = tetrinomino.matrix;
    this.update = this.update.bind(this);

    this.update();
  }

  private reset(): void {
    const tetrinomino = new Tetrinomino();

    this.matrix = tetrinomino.matrix;
    this.pos.y = 0;
    this.pos.x = (this.board.matrix[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);

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

  move(offset: number): void {
    this.pos.x += offset;
    if (this.board.checkCollision(this.matrix, this.pos)) {
      this.pos.x -= offset;
    }
  }

  drop(): void {
    this.pos.y++;
    if (this.board.checkCollision(this.matrix, this.pos)) {
      this.pos.y--;
      this.board.mergePlayerPosition(this.matrix, this.pos);
      this.board.clearLines();
      this.reset();
    }
    this.counter = 0;
  }

  place(): void {
    for (let y = 0; y < this.board.matrix.length; y++) {
      this.pos.y++;
      if (this.board.checkCollision(this.matrix, this.pos)) {
        this.pos.y--;
        this.board.mergePlayerPosition(this.matrix, this.pos);
        this.board.clearLines();
        this.reset();
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
  }
}

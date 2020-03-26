import Tetrinomino from "./Tetrinomino";

export default class Board {
  tetrinominos: Tetrinomino[] = [];
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  
  width = 240;
  height = 400;
  board = [];

  constructor() {
    this.createElement();
    this.createContext();
    this.createMatrix(12, 20);
  }

  private createElement(): void {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    this.canvas = canvas;
  }

  private createContext(): void {
    this.context = this.canvas.getContext("2d");
    this.context.scale(20, 20);
  }

  private createMatrix(w: number, h: number): void {
    while (h--) {
      this.board.push(new Array(w).fill(0));
    }
  }

  private drawBoard(matrix, offset): void {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (!!value) {
          this.context.fillStyle = "red";
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  checkCollision(player): boolean {
    const { matrix: m, pos: o } = player;

    for (let y = 0; y < m.length; y++) {
      for (let x = 0; x < m[y].length; x++) {
        if (!!m[y][x] && (
          this.board[y + o.y] && 
          this.board[y + o.y][x + o.x]) !== 0
        ) return true;
      }
    }
    return false;
  }

  advanceFrame(player): void {
    this.context.fillStyle = "#333";
    this.context.fillRect(0, 0, this.width, this.height);

    this.drawBoard(this.board, { x: 0, y: 0 });
    this.drawBoard(player.matrix, player.pos);
  }
}

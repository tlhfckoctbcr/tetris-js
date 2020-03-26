import Tetrinomino from "./Tetrinomino";

export default class TetrisBoard {
  tetris: Tetri[] = [];
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  matrix = [];

  width = 240;
  height = 400;

  constructor() {
    this.createElement();
    this.createContext();
    this.createMatrix(12, 20);
  }

  createMatrix(w: number, h: number): void {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }

    this.matrix = matrix;
  }

  checkCollision(player): boolean {
    const { matrix, pos } = player;

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (!!matrix[y][x] && (
          this.matrix[y + pos.y] && !!this.matrix[y + pos.y][x + pos.x]
        )) return true;
      }
    }
    return false;
  }

  mergePlayerMatrix(player): void {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (!!value) {
          this.matrix[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
    console.table(this.matrix);
  }

  drawFrame(player): void {
    this.drawContext();
    this.tetris.forEach((tetrinomino: Tetrinomino) => {
      tetrinomino.draw(this.context, player.pos);
    });
  }

  drawContext(): void {
    this.context.fillStyle = "#333";
    this.context.fillRect(0, 0, this.width, this.height);
  }

  createContext(): void {
    this.context = this.canvas.getContext("2d");
    this.context.scale(20, 20);
    this.drawContext();
  }

  createElement(): void {
    const canvas = document.createElement("canvas");

    canvas.width = this.width;
    canvas.height = this.height;

    this.canvas = canvas;
  }
}

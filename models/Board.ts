export default class Board {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  
  width = 240;
  height = 400;
  matrix = [];

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
      // @ts-ignore
      const array = new Array(w).fill(0);
      this.matrix.push(array);
    }
  }

  private drawBoard(matrix, position): void {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (!!value) {
          this.context.fillStyle = "red";
          this.context.fillRect(x + position.x, y + position.y, 1, 1);
        }
      });
    });
  }

  checkCollision(playerMatrix, playerPosition): boolean {
    for (let y = 0; y < playerMatrix.length; y++) {
      for (let x = 0; x < playerMatrix[y].length; x++) {
        if (!!playerMatrix[y][x] && (
          this.matrix[y + playerPosition.y] && 
          this.matrix[y + playerPosition.y][x + playerPosition.x]) !== 0
        ) return true;
      }
    }
    return false;
  }

  mergePlayerPosition(playerMatrix, playerPosition): void {
    playerMatrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (!!value) this.matrix[y + playerPosition.y][x + playerPosition.x] = value;
      });
    });
  }

  clearLines(): void {
    clear:
    for (let y = this.matrix.length -1; y > 0; --y) {
      for (let x = 0; x < this.matrix[y].length; ++x) {
        if (this.matrix[y][x] === 0) {
          continue clear;
        }
      }

      const row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      y++;
    }
  }

  advanceFrame(playerMatrix, playerPosition): void {
    this.context.fillStyle = "#333";
    this.context.fillRect(0, 0, this.width, this.height);

    this.drawBoard(this.matrix, { x: 0, y: 0 });
    this.drawBoard(playerMatrix, playerPosition);
  }
}

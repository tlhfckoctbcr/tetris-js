class TetrisBoard {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(width = 240, height = 400) {
    this.width = width;
    this.height = height;

    this.createElement();
    this.createContext();
  }

  createContext(): void {
    const context = this.canvas.getContext("2d");

    context.scale(20, 20);
    context.fillStyle = "#333";
    context.fillRect(0, 0, this.width, this.height);
    this.context = context;
  }

  createElement(): void {
    const canvas = document.createElement("canvas");

    canvas.width = this.width;
    canvas.height = this.height;
    this.canvas = canvas;
  }
}

class Tetri {
  matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
  ];

  constructor(context: CanvasRenderingContext2D) {
    this.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        console.log(value);
        if (!!value) {
          context.fillStyle = "red";
          context.fillRect(x, y, 1, 1);
        }
      });
    });
  }
}

const tetrisEl = document.getElementById("tetris");
const tetrisBoard = new TetrisBoard();

tetrisEl.append(tetrisBoard.canvas);

const tetrisPiece = new TetrisPiece(tetrisBoard.context);

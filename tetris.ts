class TetrisCanvas {
  width: number;
  height: number;

  constructor(width = 240, height = 400) {
    this.width = width;
    this.height = height;
  }

  createElement(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    return canvas;
  }
}

const tetrisEl = document.getElementById("tetris");
const tetrisCanvas = new TetrisCanvas().createElement();

tetrisEl.append(tetrisCanvas);


export default class Tetrinomino {
  matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
  ];

  constructor(context: CanvasRenderingContext2D) {
    this.draw(context, { x: 0, y: 0 });
  }

  draw(context: CanvasRenderingContext2D, offset: { x: number; y: number; }): void {
    this.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (!!value) {
          context.fillStyle = "red";
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }
}

const colors = {
  "orange": {
    "0": "#FFB76B",
    "49": "#FFA73D",
    "50": "#FF7C00",
    "100": "#FF7C00"
  }
}

export default class Cell {
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D, color: string) {
    this.context = context;
    this.createCell(color);
  }

  private createCell(color: string): void {
    
  }
}
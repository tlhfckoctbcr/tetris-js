import Tetrinomino from "./Tetrinomino";
import Cell, { CellColors } from "./Cell";

export default class Display {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    width = 80;
    height = 80;
    matrix = [];

    constructor() {
        this.createElement();
        this.createContext();
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

    private createCell(x: number, y: number, color: string): void {
        const xValue = x;
        const yValue = y;
        new Cell(this.context, color, xValue, yValue);
    }

    private drawNextPiece(): void {
        this.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (!!value) this.createCell(x, y, CellColors[value]);
            });
        });
    }

    update(tetrinomino: Tetrinomino): void {
        if (tetrinomino) {
            this.matrix = tetrinomino.matrix;
            this.context.clearRect(0, 0, this.width, this.height);
            this.drawNextPiece();
        }
    }
}

import Board from "./Board";

export default class Ghost {
    board: Board;

    pos = { x: 0, y: 0 };
    matrix = [];

    constructor(board: Board) {
        this.board = board;
    }

    private findTrail(): void {
        for (let y = 0; y < this.board.matrix.length; y++) {
            this.pos.y++;
            if (this.board.checkCollision(this.matrix, this.pos)) {
                this.pos.y--;
                break;
            }
        }
        this.board.mergeGhostPosition(this.matrix, this.pos);
    }

    setMatrix(matrix): void {
        // Clone the matrix from the current tetrinomino
        this.matrix = matrix.map(arr => ([...arr]));

        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (this.matrix[y][x]) this.matrix[y][x] = 8;
            }
        }
    }

    setPosition(pos): void {
        this.pos = {...pos};
        this.findTrail();
    }
}

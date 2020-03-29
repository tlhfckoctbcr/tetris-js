enum TetrinominoTypes {
  I = 1,
  J,
  L,
  O,
  S,
  T,
  Z
}

export default class Tetrinomino {
  matrix = [];
  type = "";

  constructor(type?) {
    if (!type) this.getRandomType();
    else this.type = type;

    this.matrix = this.create();
  }

  getRandomType(): void {
    const value = Math.floor(Math.random() * 7) + 1;
    this.type = TetrinominoTypes[value];
  }

  create() {
    switch (this.type) {
      case "I":
        return [
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0]
        ];
      case "J":
        return [
          [0,2,0],
          [0,2,0],
          [2,2,0]
        ];
      case "L":
        return [
          [0,3,0],
          [0,3,0],
          [0,3,3]
        ];
      case "O":
        return [
          [4,4],
          [4,4]
        ];
      case "S":
        return [
          [0,5,5],
          [5,5,0],
          [0,0,0]
        ];
      case "T":
        return [
          [0,6,0],
          [6,6,6],
          [0,0,0]
        ];
      case "Z":
        return [
          [7,7,0],
          [0,7,7],
          [0,0,0]
        ];
    }
  }
}

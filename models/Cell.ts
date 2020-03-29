const colors = {
  "red": {
    "0": "#f43c30",
    "49": "#ff6960",
    "50": "#eb3c35",
    "71": "#f2080a",
    "100": "#e81e20"
  },
  "orange": {
    "0": "#f4812f",
    "49": "#ffa751",
    "50": "#f78134",
    "71": "#f27b0b",
    "100": "#e8881d"
  },
  "yellow": {
    "0": "#ffcf32",
    "49": "#ffe85f",
    "50": "#f7ce39",
    "71": "#f2d20e",
    "100": "#e8d320"
  },
  "green": {
    "0": "#53f028",
    "49": "#7ad666",
    "50": "#4dc432",
    "71": "#2cd60b",
    "100": "#3fd61f"
  },
  "blue": {
    "0": "#1faaf4",
    "49": "#55ccff",
    "50": "#39b3f7",
    "71": "#189ae9",
    "100": "#1f94e8"
  },
  "indigo": {
    "0": "#5d3cf4",
    "49": "#9477ff",
    "50": "#583ef7",
    "71": "#3a1ff2",
    "100": "#3a24e8"
  },
  "violet": {
    "0": "#dd25f4",
    "49": "#ed6cff",
    "50": "#ed42f7",
    "71": "#e40ff2",
    "100": "#da25e8"
  }
};

export default class Cell {
  constructor(context: CanvasRenderingContext2D, color: string, x: number, y: number) {
    const gradient = context.createLinearGradient(x, y, x + 1, y + 1);
    gradient.addColorStop(0, colors[color]["0"]);
    gradient.addColorStop(.49, colors[color]["49"]);
    gradient.addColorStop(.5, colors[color]["50"]);
    gradient.addColorStop(.71, colors[color]["71"]);
    gradient.addColorStop(1, colors[color]["100"]);

    context.fillStyle = gradient;
    context.fillRect(x, y, 1, 1);
  }
}

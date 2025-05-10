import { Cell } from "./cell.js";
import { Point, Tuple } from "./atoms.js";

export class Maze {
  constructor({ offsetX = 0, offsetY = 0, numCols, numRows, cellWidth, cellHeight = cellWidth }) {
    this._offsetX = offsetX;
    this._offsetY = offsetY;
    this._numCols = numCols;
    this._numRows = numRows;
    this._cellWidth = cellWidth;
    this._cellHeight = cellHeight;

    this._cellsMatrix = new Array(numCols);
  }

  init() {
    for (let i = 0; i < this._numCols; i++) {
      this._cellsMatrix[i] = new Array(this._numRows);

      for (let j = 0; j < this._numRows; j++) {
        this._cellsMatrix[i][j] = new Cell(
          Point(this._offsetX + this._cellWidth * i, this._offsetY + this._cellHeight * j),
          this._cellWidth,
          this._cellHeight
        );
      }
    }

    this._cellsMatrix[0][0].hasWallTop = false;
    this._cellsMatrix.at(-1).at(-1).hasWallBottom = false;

    this._generate(0, 0);
    this._resetCellsVisitedState();
  }

  draw(ctx) {
    if (!ctx) {
      throw new Exception("Maze: context for drawing wasn't provided");
    }

    for (let col of this._cellsMatrix) {
      for (let cell of col) {
        cell.draw(ctx);
      }
    }
  }

  solve() {
    throw new Error("Not implemented");
  }

  _generate(i, j) {
    let cell = this._cellsMatrix[i][j];

    cell.isVisited = true;

    while (true) {
      let neighbors = [];

      if (i > 0 && !this._cellsMatrix[i - 1][j].isVisited) {
        neighbors.push(Tuple(i - 1, j));
      }

      if (i < this._numCols - 1 && !this._cellsMatrix[i + 1][j].isVisited) {
        neighbors.push(Tuple(i + 1, j));
      }

      if (j > 0 && !this._cellsMatrix[i][j - 1].isVisited) {
        neighbors.push(Tuple(i, j - 1));
      }

      if (j < this._numRows - 1 && !this._cellsMatrix[i][j + 1].isVisited) {
        neighbors.push(Tuple(i, j + 1));
      }

      if (neighbors.length == 0) return;

      let selectedNeighbor = randomChoice(neighbors);

      if (selectedNeighbor[0] < i) {
        cell.hasWallLeft = false;
        this._cellsMatrix[selectedNeighbor[0]][selectedNeighbor[1]].hasWallRight = false;
      } else if (selectedNeighbor[0] > i) {
        cell.hasWallRight = false;
        this._cellsMatrix[selectedNeighbor[0]][selectedNeighbor[1]].hasWallLeft = false;
      } else if (selectedNeighbor[1] < j) {
        cell.hasWallTop = false;
        this._cellsMatrix[selectedNeighbor[0]][selectedNeighbor[1]].hasWallBottom = false;
      } else if (selectedNeighbor[1] > j) {
        cell.hasWallBottom = false;
        this._cellsMatrix[selectedNeighbor[0]][selectedNeighbor[1]].hasWallTop = false;
      }

      this._generate(selectedNeighbor[0], selectedNeighbor[1]);
    }
  }

  _resetCellsVisitedState() {
    for (let col of this._cellsMatrix) {
      for (let cell of col) {
        cell.visited = false;
      }
    }
  }

  _solve() {
    throw new Error("Not implemented");
  }
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

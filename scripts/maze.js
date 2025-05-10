import { Cell } from "./cell.js";
import { Point } from "./atoms.js";

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
          Point(this._offsetX + this._cellWidth * j, this._offsetY + this._cellHeight * i),
          this._cellWidth,
          this._cellHeight
        );
      }
    }

    this._cellsMatrix[0][0].hasWallTop = false;
    this._cellsMatrix.at(-1).at(-1).hasWallBottom = false;

    // this._generate(0, 0);
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

  _generate() {
    throw new Error("Not implemented");
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

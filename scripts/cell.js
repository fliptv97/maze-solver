import { drawLine } from "./canvas.js";
import { Point } from "./atoms.js";

export class Cell {
  static connect_cells(ctx, src, dst, undo = false) {
    drawLine(ctx, src.centerPoint, dst.centerPoint, undo ? "gray" : "red", 3);
  }

  constructor(origin, width, height = width) {
    this._origin = origin;
    this._width = width;
    this._height = height;

    this.hasWallLeft = true;
    this.hasWallTop = true;
    this.hasWallRight = true;
    this.hasWallBottom = true;
  }

  get centerPoint() {
    let centerX = this._origin.x + this._width / 2;
    let centerY = this._origin.y + this._height / 2;
    let centerPoint = Point(centerX, centerY);

    return centerPoint;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    let topLeftPoint = this._origin;
    let topRightPoint = Point(this._origin.x + this._width, this._origin.y);
    let bottomRightPoint = Point(this._origin.x + this._width, this._origin.y + this._height);
    let bottomLeftPoint = Point(this._origin.x, this._origin.y + this._height);

    drawLine(ctx, bottomLeftPoint, topLeftPoint, this.hasWallLeft ? "black" : "white");
    drawLine(ctx, topLeftPoint, topRightPoint, this.hasWallTop ? "black" : "white");
    drawLine(ctx, topRightPoint, bottomRightPoint, this.hasWallRight ? "black" : "white");
    drawLine(ctx, bottomRightPoint, bottomLeftPoint, this.hasWallBottom ? "black" : "white");
  }
}

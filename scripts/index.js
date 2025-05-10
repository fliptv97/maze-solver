import { setupCanvas } from "./canvas.js";
import { Maze } from "./maze.js";

document.addEventListener("DOMContentLoaded", () => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  let $canvas = document.createElement("canvas");
  let ctx = setupCanvas($canvas, width, height);

  // TODO: Colors should be taken from user theme
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  document.body.appendChild($canvas);

  // TODO: Almost all of this params should be calculated dynamically
  let maze = new Maze({ ctx, numCols: 40, numRows: 16, cellWidth: 40, offsetX: 50, offsetY: 50 });

  maze.init();
  maze.draw(ctx);

  let solved = maze.solve();

  if (!solved) {
    window.alert("Maze can't be solved!");
  }
});

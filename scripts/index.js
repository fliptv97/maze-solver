import { setupCanvas } from "./canvas.js";

document.addEventListener("DOMContentLoaded", () => {
  let width = window.innerWidth;
  let height = window.innerHeight;

  let $canvas = document.createElement("canvas");
  let ctx = setupCanvas($canvas, width, height);

  ctx.fillStyle = "#ddd";
  ctx.fillRect(0, 0, width, height);

  document.body.appendChild($canvas);
});

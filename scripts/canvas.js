/**
 * @param {HTMLCanvasElement} canvas
 * @param {number} width
 * @param {number} height
 */
export function setupCanvas(canvas, width, height) {
  let dpr = window.devicePixelRatio ?? 1;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);

  const ctx = canvas.getContext("2d");

  if (dpr !== 1) {
    ctx.scale(dpr, dpr);
  }

  return ctx;
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Point} point1
 * @param {Point} point2
 * @param {string} [strokeStyle="black"]
 * @param {number} [lineWidth=1]
 */
export function drawLine(ctx, point1, point2, strokeStyle = "black", lineWidth = 1) {
  ctx.beginPath();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth
  ctx.moveTo(point1.x, point1.y);
  ctx.lineTo(point2.x, point2.y);
  ctx.stroke();
}

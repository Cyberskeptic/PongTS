export function drawSquare(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

export function drawCircle(ctx, x, y, r, color) {
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle);
    // 2 * Math.PI is a full circle in radians / 360 degrees
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color
    ctx.fill();
}

export function clear(canvas, ctx, color) {
    drawSquare(ctx, 0, 0, canvas.width, canvas.height, color);
}
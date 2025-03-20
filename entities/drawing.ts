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

function measureTextSize(ctx, text) {
    const metrics = ctx.measureText(text);
    const width = metrics.width; // Exact width
    const height = Math.abs(metrics.actualBoundingBoxAscent) + Math.abs(metrics.actualBoundingBoxDescent) || parseInt(ctx.font); // Estimate height
    return { width, height };
} // you're welcome :)

export function drawText(ctx, text, color, fontSize, position) {
    ctx.font = `${fontSize}px Arial`; // You can change Arial to your preferred font
    ctx.fillStyle = color;
    const size = measureTextSize(ctx, text);
    const x = position.x - size.width / 2;
    const y = position.y + size.height / 2;
    ctx.fillText(text, x, y);
}
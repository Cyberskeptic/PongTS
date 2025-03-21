import { Vec2 } from "../utils";
import { drawSquare } from "./drawing";
import { Entity } from "./Entity";
import { GameData } from "./GameData";
import { StarField } from "./StarField";


export class Arena implements Entity {
    data: GameData;
    field: StarField;

    constructor(data: GameData) {
        this.data = data;

        const layers = 6
        const starCount: [number, number] = [180, 20]
        const size: [number, number] = [0.8, 2]
        const dx: [number, number] = [0.1, 1]
        const dy: [number, number] = [0.1, 1]

        this.field = new StarField(
            this.data,
            layers,
            size,
            starCount,
            dx,
            dy,
        )
    }

    update() {
        this.field.update()
    }

    draw() {
        const ctx = this.data.ctx;
        const { width, height } = ctx.canvas;
        const { verticalMargin, horizontalMargin } = this.data;

        // Create an off-screen canvas to draw the Arena
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        const offCtx = offscreenCanvas.getContext("2d")!;

        // Draw a full-screen white background (this is the Arena)
        offCtx.fillStyle = 'white';
        offCtx.fillRect(0, 0, width, height);

        // Draw procedural patterns on off-screen canvas
        this.drawArenaDecorations(offCtx, width, height);

        // Cut out the play area using a composite operation
        offCtx.globalCompositeOperation = 'destination-out';
        offCtx.fillRect(
            0,
            verticalMargin,
            width - horizontalMargin,
            height - verticalMargin * 2
        );

        // Reset composite mode
        offCtx.globalCompositeOperation = 'source-over';

        // Draw the off-screen canvas onto the main canvas
        ctx.drawImage(offscreenCanvas, 0, 0);
    }

    // Example function to draw patterns on the Arena
    drawArenaDecorations(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.field.draw(ctx)
        // draw random black dots all over the canvas
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            drawSquare(ctx, x, y, 1, 1, 'black');
        }
    }

}
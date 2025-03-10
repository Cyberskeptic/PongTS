import { drawSquare } from "./drawing"
import { Entity } from "./Entity"

export class Square implements Entity {
    // propName: PropType
    ctx: CanvasRenderingContext2D // because I added this line
    x: number
    y: number
    size: number
    color: string

    constructor(
        ctx: CanvasRenderingContext2D, 
        x: number, y: number, 
        size: number, 
        color: string
    ) {
        this.ctx = ctx // the error went away
        this.x = x
        this.y = y
        this.size = size
        this.color = color
    }

    wiggle() {
        const dx = (Math.random() * 2 - 1) * 10;
        const dy = (Math.random() * 2 - 1) * 10;

        this.x += dx;
        this.y += dy;
    }

    constrain() {
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x + this.size > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.size
        }
        if (this.y < 0) {
            this.y = 0
        }
        if (this.y + this.size > this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.size
        }
    }

    update() {
        this.wiggle()
        this.constrain()
    }

    draw() {
        drawSquare(this.ctx, this.x, this.y, this.size, this.size, this.color)
    }
}
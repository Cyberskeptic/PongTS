import { Entity } from "./Entity"
import { drawCircle } from "./drawing"

export class Star implements Entity{
    ctx: CanvasRenderingContext2D
    x: number
    y: number
    dx: number
    dy: number
    radius: number
    color: string
    
    constructor(
        ctx: CanvasRenderingContext2D, 
        x: number, y: number, 
        dx: number, dy: number, 
        radius: number, 
        color: string
    ) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.color = color
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    warp() {
        const width = this.ctx.canvas.width
        const height = this.ctx.canvas.height
        
        const negativeMargin = -this.radius*2
        const positiveHorizontalMargin = width + this.radius*2
        const positiveVerticalMargin = height + this.radius*2


        if (this.x < negativeMargin) {
            this.x = positiveHorizontalMargin
        }
        else if (this.x > positiveHorizontalMargin) {
            this.x = negativeMargin
        }


        if (this.y < negativeMargin) {
            this.y = positiveVerticalMargin
        }
        else if (this.y > positiveVerticalMargin) {
            this.y = negativeMargin
        }
    }
    
    update() {
        this.move()
        this.warp()
    }

    draw () {
        drawCircle(this.ctx, this.x, this.y, this.radius, this.color)
    }

}

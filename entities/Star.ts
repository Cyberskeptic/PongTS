import { Entity } from "./Entity"
import { GameData } from "./GameData"
import { drawCircle } from "./drawing"

export class Star implements Entity{
    data: GameData
    x: number
    y: number
    dx: number
    dy: number
    radius: number
    color: string
    
    constructor(
        data: GameData,
        x: number, y: number, 
        dx: number, dy: number, 
        radius: number, 
        color: string,

    ) {
        this.data = data
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
        const width = this.data.ctx.canvas.width;
        const height = this.data.ctx.canvas.height;
       
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
        drawCircle(this.data.ctx, this.x, this.y, this.radius, this.color)
    }

}

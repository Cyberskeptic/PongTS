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
        const width = this.data.arena.size.x;
        const halfWidth = width / 2
        const originalHalfWidth = this.data.arena.originalSize.x / 2

        if (this.x < originalHalfWidth - halfWidth - this.radius * 2) {
            this.x = originalHalfWidth + halfWidth + this.radius * 2
        }
        else if (this.x > originalHalfWidth + halfWidth + this.radius * 2) {
            this.x = originalHalfWidth - halfWidth - this.radius * 2
        }

        const height = this.data.arena.size.y;
        const halfHeight = height / 2
        const originalHalfHeight = this.data.arena.originalSize.y / 2

        const top = originalHalfHeight - halfHeight - this.radius * 2
        const bottom = originalHalfHeight + halfHeight + this.radius * 2

        if (this.y < top) {
            this.y = bottom
        }
        else if (this.y > bottom) {
            this.y = top
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

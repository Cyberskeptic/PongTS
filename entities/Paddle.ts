import { drawSquare } from "./drawing";
import { Entity } from "./Entity";
import { Vec2 } from "../utils";

export type PaddleState = 'none' | 'up' | 'down'

export class Paddle implements Entity {
    ctx: CanvasRenderingContext2D
    position: Vec2
    state: PaddleState
    size: Vec2
    color: string
    speed: number

    constructor(
        ctx: CanvasRenderingContext2D,
        position: Vec2,
        speed: number,
        size: Vec2,
        color: string,
    ) {
        this.ctx = ctx
        this.position = position
        this.state = 'none'
        this.size = size
        this.color = color
        this.speed = speed
    }

    move(){
        if (this.state === 'none') {
            return
        }
        if (this.state === 'up') {
            this.position.y -=this.speed
        }
        if (this.state === 'down') {
            this.position.y += this.speed
        }
    }

    walls() {
        const half = this.size.y / 2
        if (this.position.y < half)  {
            this.position.y = half
        }

        if (this.position.y > this.ctx.canvas.height - half) {
            this.position.y = this.ctx.canvas.height - half
        }
    }

    update() {
        this.move()
        this.walls()
    }

    draw(){
        const x = this.position.x - this.size.x / 2 // find the top-left corner
        const y = this.position.y - this.size.y / 2
        drawSquare(this.ctx, x, y, this.size.x, this.size.y, this.color)
    }
}
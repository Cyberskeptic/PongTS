import { Entity } from "./Entity"
import { drawCircle } from "./drawing"
import { Vec2 } from "../utils"
import { GameData } from "./GameData"


export class Ball implements Entity {
    // <--- here we say what fields the object has
    data: GameData
    position: Vec2
    velocity: Vec2
    radius: number
    color: string

    constructor( // <-- values come in during construction as parameters
        data: GameData,
        position: Vec2, // <-- whoever does `new Ball` must provide us with a Vec2 for position
        velocity: Vec2, // <-- whoever does `new Ball` must provide us with a Vec2 for velocity
        radius: number,
        color: string,
    ){
        // <--- here we move the parameters into the fields
        this.data = data
        this.position =  position 
        this.velocity = velocity
        this.radius = radius
        this.color = color
    }

    move(){
        this.position.add(this.velocity)
    }

    bounceX() {
        this.velocity.x *= -1
    }

    bounceY() {
        this.velocity.y *= -1
    }

    walls(){
        const width = this.data.ctx.canvas.width;
        const height = this.data.ctx.canvas.height;

        const leftEdge = this.radius
        const rightEdge = width - this.data.horizontalMargin - this.radius
        const topEdge = this.radius + this.data.verticalMargin
        const bottomEdge = height - this.data.verticalMargin - this.radius

        const offLeftEdge = this.position.x < leftEdge
        const offRightEdge = this.position.x > rightEdge

        if (offLeftEdge) {
            this.bounceX()
            this.position.x = leftEdge
        }

        if (offRightEdge) {
            this.data.bump()
            this.bounceX()
            this.position.x = rightEdge - this.data.bumpAmount
        }

        const offTopEdge = this.position.y < topEdge
        const offBottomEdge = this.position.y > bottomEdge

        if (offTopEdge) {
            this.bounceY()
            this.position.y = topEdge
        }

        if (offBottomEdge) {
            this.bounceY()
            this.position.y = bottomEdge
        }
    }

    update() {
        this.move()
        this.walls()
    }

    draw () {
        const x = this.position.x
        const y = this.position.y
        drawCircle(this.data.ctx, x, y, this.radius, this.color)
    }

}


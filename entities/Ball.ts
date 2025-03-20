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
        const height = this.data.arena.size.x;
        const width = this.data.arena.size.y;

        const offLeftEdge = this.position.x < this.radius
        const offRightEdge = this.position.x > width - this.radius

        if (offLeftEdge) {
            this.bounceX()
            this.position.x = this.radius // get back on screen
        }

        if (offRightEdge) {
            this.bounceX()
            this.position.x = width - this.radius // get back on screen
        }

        const offTopEdge = this.position.y < this.radius
        const offBottomEdge = this.position.y > height - this.radius

        if (offTopEdge) {
            this.bounceY()
            this.position.y = this.radius
        }

        if (offBottomEdge) {
            this.bounceY()
            this.position.y = height - this.radius
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


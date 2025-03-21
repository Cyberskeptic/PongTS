import { Entity } from "./Entity"
import { drawCircle } from "./drawing"
import { Vec2 } from "../utils"
import { GameData } from "./GameData"
import { Paddle } from "./Paddle"


export class Ball implements Entity {
    // <--- here we say what fields the object has
    data: GameData
    paddle: Paddle
    position: Vec2
    velocity: Vec2
    radius: number
    color: string

    constructor( // <-- values come in during construction as parameters
        data: GameData,
        paddle: Paddle,
        position: Vec2, // <-- whoever does `new Ball` must provide us with a Vec2 for position
        velocity: Vec2, // <-- whoever does `new Ball` must provide us with a Vec2 for velocity
        radius: number,
        color: string,
    ){
        // <--- here we move the parameters into the fields
        this.data = data
        this.paddle = paddle
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

    clampToPaddle(paddle: Paddle){
        const halfWidth = paddle.size.x / 2
        const halfHeight = paddle.size.y / 2
        const paddleLeft = paddle.position.x - halfWidth
        const paddleRight = paddle.position.x + halfWidth
        const paddleTop = paddle.position.y - halfHeight
        const paddleBottom = paddle.position.y + halfHeight

        let clampedX = this.position.x
        let clampedY = this.position.y

        let verticalNormal = 0
        let horizontalNormal = 0

        if (this.position.x < paddleLeft) {
            clampedX = paddleLeft
            horizontalNormal = -1
        }

        if (this.position.x > paddleRight) {
            clampedX = paddleRight
            horizontalNormal = 1
        }

        if (this.position.y < paddleTop) {
            clampedY = paddleTop
            verticalNormal = -1
        }

        if (this.position.y > paddleBottom) {
            clampedY = paddleBottom
            verticalNormal = 1
        }

        return { clamped: [clampedX, clampedY], normal: [horizontalNormal, verticalNormal] }
    }

    isColliding(clamped: Vec2){
        const d2 = this.position.distanceSquared(clamped)
        const r2 = this.radius * this.radius
        return d2 < r2
    }

    handlePaddleCollision(paddle: Paddle) {
        const { clamped, normal } = this.clampToPaddle(paddle)

        const [clampedX, clampedY] = clamped
        const [normalX, normalY] = normal

        if (!this.isColliding(new Vec2(clampedX, clampedY))) {
            return
        }

        if (normalY !== 0) {
            this.bounceY()
        }

        if (normalX ! == 0) {
            this.bounceX()
        }
    }

    update() {
        this.move()
        this.handlePaddleCollision(this.paddle)
        this.walls()
    }

    draw () {
        const x = this.position.x
        const y = this.position.y
        drawCircle(this.data.ctx, x, y, this.radius, this.color)
    }

}


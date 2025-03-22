import {  between, getContext, randomColor, Vec2} from "./utils"
import { drawSquare, drawCircle, clear } from "./entities/drawing"
import { Square } from "./entities/Square"
import { Star } from "./entities/Star"
import { Entity } from "./entities/Entity"
import { StarLayer } from "./entities/StarLayer"
import { StarField } from "./entities/StarField"
import { Ball } from "./entities/Ball"
import { Paddle } from "./entities/Paddle"
import { Input } from "./entities/Input"
import { GameData } from "./entities/GameData"
import { Arena } from "./entities/Arena"
import { Scoreboard } from "./entities/scoreboard"


class App {
    data: GameData
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    field: StarField | null = null
    paddle: Paddle | null = null

    constructor(ctx: CanvasRenderingContext2D) {
        this.canvas = ctx.canvas
        this.ctx = ctx
        this.data = new GameData(ctx, 10, ctx.canvas.height * .25)
        this.field = null
    }

    boot() {
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

        const ballPosition = new Vec2(this.canvas.width / 2, this.canvas.height / 2)
        const ballVelocity = new Vec2(Math.random() * 3 + 4, 4)

        const paddleSize = new Vec2(5, 70)
        const paddlePosition = new Vec2(30, this.canvas.height / 2)
        this.paddle = new Paddle(this.data, paddlePosition, 5, paddleSize, "white")

        this.data.addEntity(new Arena(this.data))
        this.data.addEntity(this.field)
        this.data.addEntity(this.paddle)
        this.data.addEntity(new Ball(this.data, this.paddle, ballPosition, ballVelocity, 5, "white"))
        this.data.addEntity(new Scoreboard(this.data, 20, "red"))

        this.tick()
    }

    draw() {
        clear(this.canvas, this.ctx, "black")
        this.data.entities.forEach(entity => entity.draw())
    }

    update() {
        if (this.paddle) {
            if (this.data.input.isKeyDown("w")) {
                this.paddle.state = "up"
            } else if (this.data.input.isKeyDown("s")) {
                this.paddle.state = "down"
            } else {
                this.paddle.state = "none"
            }
        }
        this.data.entities.forEach(entity => entity.update())
    }

    tick() {
        this.update()
        this.draw()
        requestAnimationFrame(() => this.tick())
    }
}

export function boot() {
    const [canvas, ctx] = getContext("canvas", "2d");
    const app = new App(ctx)
    app.boot()
}
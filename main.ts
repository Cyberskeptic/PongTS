import { between, getContext, randomColor } from "./utils"
import { drawSquare, drawCircle, clear } from "./entities/drawing"
import { Square } from "./entities/Square"
import { Star } from "./entities/Star"
import { Entity } from "./entities/Entity"
import { StarLayer } from "./entities/StarLayer"
import { StarField } from "./entities/StarField"


class App {
    entities: Entity[]
    canvas: HTMLCanvasElement | null
    ctx: CanvasRenderingContext2D | null
    field: StarField | null = null
    
    constructor() {
        this.entities = []
        this.canvas = null
        this.ctx = null
        this.field = null    
    }

    boot() {
        const [canvas, ctx] = getContext("canvas", "2d");
        this.canvas = canvas
        this.ctx = ctx

        const layers = 6
        const starCount: [number, number] = [180, 20]
        const size: [number, number] = [0.1, 2]
        const dx: [number, number] = [0.1, 1]
        const dy: [number, number] = [0.1, 1]
        const colors: string[] = []
        for (let i = 0; i < layers; i++) {
            colors.push(randomColor())
        }

        this.field = new StarField(
            this.ctx,
            layers,
            size,
            starCount,
            dx,
            dy,
            colors,
        )

        this.entities = [
            this.field,
            new Square(ctx, 100, 100, 50, "red"),
            new Square(ctx, 200, 200, 50, "green"),
            new Square(ctx, 300, 300, 50, "blue"),
        ]

        this.tick()    
    }

    draw() {
        clear(this.canvas, this.ctx, "black")
        this.entities.forEach(entity => entity.draw())
    }
    
    update() {
        this.entities.forEach(entity => entity.update())
    }
    
    tick() {
        this.update()
        this.draw()
        requestAnimationFrame(() => this.tick())
    }    
}

export function boot() {
    const app = new App()
    app.boot()
}
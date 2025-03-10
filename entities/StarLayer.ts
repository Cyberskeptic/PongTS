import { Star } from "./Star";
import { Entity } from "./Entity";
import { between, getContext } from "../utils";

export class StarLayer implements Entity {
    entities: Entity[];
    canvas: HTMLCanvasElement 
    ctx: CanvasRenderingContext2D
    numStars: number
    color: string
    velocity: [number, number]
    size: number


    constructor(ctx, numStars, color, velocity, size) { // <--- add parameters here
        this.entities = [];
        this.ctx = ctx;
        this.canvas = ctx.canvas


        this.numStars = numStars;
        this.color = color;
        this.velocity = velocity;
        this.size = size;


        this.createStars();
    }



    createStars() {
        this.canvas
        this.ctx
        console.log(`creating ${this.numStars} stars`)
        for (let i = 0; i < this.numStars; i++) {

            const [dx, dy] = this.velocity; // this is called destructuring

            this.entities.push(
                new Star(
                    this.ctx,
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height,
                    dx,
                    dy,
                    this.size,
                    this.color
                )
            );
        }
    }

    draw() {
        for (const star of this.entities) {
            star.draw();
        }
    }

    update() {
        for (const star of this.entities) {
            star.update();
        }
    }
}
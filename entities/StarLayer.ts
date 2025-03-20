import { Star } from "./Star";
import { Entity } from "./Entity";
import { between, getContext, randomColor, Vec2 } from "../utils";
import { GameData } from "./GameData";

export class StarLayer implements Entity {
    data: GameData
    entities: Entity[];
    numStars: number
    // color: string
    velocity: [number, number]
    size: number


    constructor(
        data: GameData, 
        numStars: number, 
        velocity: [number, number], 
        size: number,
    ) {
        this.entities = [];
        this.data = data;
        this.numStars = numStars;
        this.velocity = velocity;
        this.size = size;
        this.createStars();
    }

    createStars() {
        this.data
        console.log(`creating ${this.numStars} stars`)
        for (let i = 0; i < this.numStars; i++) {

            const [dx, dy] = this.velocity; // this is called destructuring
            const color = randomColor();
            this.entities.push(
                new Star(
                    this.data,
                    Math.random() * this.data.arena.size.x,
                    Math.random() * this.data.arena.size.y,
                    dx,
                    dy,
                    this.size,
                    color
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